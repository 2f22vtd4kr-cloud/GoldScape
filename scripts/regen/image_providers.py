#!/usr/bin/env python3
"""
Multi-provider image generation for GoldScape property scenes.

Backends (pick one via env):
  GEMINI_API_KEY / AI_INTEGRATIONS_GEMINI_*  — Google (paid tier required for API image gen)
  OPENAI_API_KEY                            — gpt-image-1 / dall-e-3
  HF_TOKEN                                  — Hugging Face Inference Providers (FLUX etc.)

Free Gemini keys work only in AI Studio web UI, not via REST (quota limit 0).

Usage:
  python scripts/regen/image_providers.py --provider auto --prompt "..." --out out.jpg
  python scripts/regen/image_providers.py --list
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path


def _post_json(url: str, body: dict, headers: dict | None = None, timeout: int = 115) -> dict:
    h = {"Content-Type": "application/json", **(headers or {})}
    req = urllib.request.Request(
        url, data=json.dumps(body).encode("utf-8"), headers=h, method="POST"
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def generate_openai(prompt: str, ref_path: Path | None = None) -> bytes:
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("OPENAI_API_KEY not set")
    # Prefer gpt-image-1 if available; fall back to dall-e-3
    url = "https://api.openai.com/v1/images/generations"
    body = {
        "model": os.environ.get("OPENAI_IMAGE_MODEL", "dall-e-3"),
        "prompt": prompt[:4000],
        "n": 1,
        "size": "1792x1024",
        "response_format": "b64_json",
        "quality": "hd",
    }
    data = _post_json(url, body, headers={"Authorization": f"Bearer {key}"})
    b64 = data["data"][0]["b64_json"]
    return base64.b64decode(b64)


def generate_hf(prompt: str, ref_path: Path | None = None) -> bytes:
    key = os.environ.get("HF_TOKEN")
    if not key:
        raise RuntimeError("HF_TOKEN not set")
    model = os.environ.get("HF_IMAGE_MODEL", "black-forest-labs/FLUX.1-schnell")
    # Inference Providers text-to-image
    url = f"https://router.huggingface.co/hf-inference/models/{model}"
    body = {"inputs": prompt, "parameters": {"width": 1024, "height": 576}}
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Accept": "image/png",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=115) as resp:
        return resp.read()


def generate_gemini(prompt: str, ref_path: Path | None = None) -> bytes:
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("AI_INTEGRATIONS_GEMINI_API_KEY")
    if not key:
        raise RuntimeError("GEMINI_API_KEY not set")
    model = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-2.5-flash-image")
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}"
        f":generateContent?key={key}"
    )
    parts: list[dict] = []
    if ref_path and ref_path.exists():
        raw = ref_path.read_bytes()
        mime = "image/jpeg" if ref_path.suffix.lower() in {".jpg", ".jpeg"} else "image/png"
        parts.append(
            {
                "inlineData": {
                    "mimeType": mime,
                    "data": base64.b64encode(raw).decode("ascii"),
                }
            }
        )
        parts.append(
            {
                "text": (
                    "Image 1 is the MASTER REFERENCE of the exact same real property. "
                    "Preserve geometry, materials, roof, site, landmark. Only change what the SCENE requires.\n\n"
                )
            }
        )
    parts.append({"text": prompt})
    body = {
        "contents": [{"role": "user", "parts": parts}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]},
    }
    try:
        data = _post_json(url, body)
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        if e.code == 429 and "limit: 0" in err:
            raise RuntimeError(
                "Gemini image quota is 0 for this key (free tier does not allow "
                "programmatic image generation). Enable billing in Google AI Studio, "
                "or use OPENAI_API_KEY / HF_TOKEN instead."
            ) from e
        raise RuntimeError(f"Gemini HTTP {e.code}: {err[:400]}") from e

    for p in data.get("candidates", [{}])[0].get("content", {}).get("parts", []):
        if "inlineData" in p:
            return base64.b64decode(p["inlineData"]["data"])
    raise RuntimeError("Gemini response contained no image part")


PROVIDERS = {
    "gemini": generate_gemini,
    "openai": generate_openai,
    "hf": generate_hf,
}


def available_providers() -> list[str]:
    out = []
    if os.environ.get("GEMINI_API_KEY") or os.environ.get("AI_INTEGRATIONS_GEMINI_API_KEY"):
        out.append("gemini")
    if os.environ.get("OPENAI_API_KEY"):
        out.append("openai")
    if os.environ.get("HF_TOKEN"):
        out.append("hf")
    return out


def generate(prompt: str, provider: str = "auto", ref_path: Path | None = None) -> bytes:
    if provider == "auto":
        avail = available_providers()
        if not avail:
            raise RuntimeError(
                "No image provider keys found. Set one of:\n"
                "  OPENAI_API_KEY  (recommended paid path)\n"
                "  HF_TOKEN        (Hugging Face Inference Providers)\n"
                "  GEMINI_API_KEY  (requires paid/billing — free keys only work in AI Studio UI)"
            )
        # Prefer openai > hf > gemini (gemini free often quota 0 for images)
        for pref in ("openai", "hf", "gemini"):
            if pref in avail:
                provider = pref
                break
    if provider not in PROVIDERS:
        raise RuntimeError(f"Unknown provider: {provider}")
    print(f"Using provider: {provider}", file=sys.stderr)
    return PROVIDERS[provider](prompt, ref_path)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", default="")
    ap.add_argument("--out", default="")
    ap.add_argument("--provider", default="auto")
    ap.add_argument("--ref", default="")
    ap.add_argument("--list", action="store_true")
    args = ap.parse_args()

    if args.list:
        print("Available (keys present):", ", ".join(available_providers()) or "none")
        return 0

    if not args.prompt or not args.out:
        ap.error("--prompt and --out required unless --list")

    ref = Path(args.ref) if args.ref else None
    data = generate(args.prompt, args.provider, ref)
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(data)
    print(f"Wrote {out} ({len(data)} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
