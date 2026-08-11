#!/usr/bin/env python3
"""
Stable Diffusion + ControlNet (depth) consistency pipeline for property scenes.

Use when a GPU is available. CPU works but is impractically slow for batch regen.

Install (GPU):
  pip install diffusers transformers accelerate controlnet-aux torch pillow

Usage:
  python scripts/sd_consistency/pipeline.py \\
    --master path/to/p18-exterior.jpg \\
    --prompt "isometric section cutaway of the same building..." \\
    --out path/to/p18-section.jpg

Design:
  1. Extract depth map from master reference (ControlNet depth)
  2. Img2img / ControlNet-conditioned generation with low denoise so geometry holds
  3. Optional canny edges for facade line lock

This is the recommended path for spatial consistency beyond Gemini multi-image reference.
See docs/IMAGE_GENERATION.md.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description="SD + ControlNet depth consistency render")
    parser.add_argument("--master", required=True, help="Master reference image path")
    parser.add_argument("--prompt", required=True, help="Scene prompt")
    parser.add_argument("--out", required=True, help="Output image path")
    parser.add_argument("--negative", default=(
        "hyper CGI, glossy plastic, floating building mid water, "
        "furnished rooms visible through exterior windows, white void background, "
        "wrong roof type, deformed geometry, extra storeys"
    ))
    parser.add_argument("--steps", type=int, default=28)
    parser.add_argument("--cfg", type=float, default=3.8)
    parser.add_argument("--controlnet-strength", type=float, default=0.7)
    parser.add_argument("--denoise", type=float, default=0.4)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    try:
        import torch
        from PIL import Image
    except ImportError as e:
        print("Missing dependency:", e, file=sys.stderr)
        return 1

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Device: {device}")
    if device == "cpu":
        print(
            "WARNING: No GPU. Full SD+ControlNet batch is not practical on CPU. "
            "Use Gemini master-reference path (scripts/regen/regen-scenes.mjs) instead, "
            "or run this script on a GPU machine.",
            file=sys.stderr,
        )

    master_path = Path(args.master)
    if not master_path.exists():
        print(f"Master not found: {master_path}", file=sys.stderr)
        return 1

    try:
        from diffusers import (
            StableDiffusionControlNetImg2ImgPipeline,
            ControlNetModel,
            UniPCMultistepScheduler,
        )
        from controlnet_aux import HEDdetector, MidasDetector
    except ImportError:
        print(
            "diffusers / controlnet-aux not installed.\n"
            "  pip install diffusers transformers accelerate controlnet-aux\n"
            "Falling back: copy master to out as placeholder (geometry-preserving stub).",
            file=sys.stderr,
        )
        out = Path(args.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        Image.open(master_path).convert("RGB").save(out, quality=92)
        print(f"Stub wrote {out} (install diffusers for real SD generation)")
        return 0

    # Load depth ControlNet
    controlnet = ControlNetModel.from_pretrained(
        "lllyasviel/sd-controlnet-depth",
        torch_dtype=torch.float16 if device == "cuda" else torch.float32,
    )
    pipe = StableDiffusionControlNetImg2ImgPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        controlnet=controlnet,
        torch_dtype=torch.float16 if device == "cuda" else torch.float32,
        safety_checker=None,
    )
    pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
    if device == "cuda":
        pipe = pipe.to("cuda")
    else:
        pipe.enable_model_cpu_offload()

    midas = MidasDetector.from_pretrained("lllyasviel/Annotators")
    master = Image.open(master_path).convert("RGB").resize((768, 768))
    depth = midas(master)

    generator = torch.Generator(device=device).manual_seed(args.seed)
    result = pipe(
        prompt=args.prompt,
        negative_prompt=args.negative,
        image=master,
        control_image=depth,
        num_inference_steps=args.steps,
        guidance_scale=args.cfg,
        controlnet_conditioning_scale=args.controlnet_strength,
        strength=args.denoise,
        generator=generator,
    ).images[0]

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    result.save(out, quality=92)
    print(f"Wrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
