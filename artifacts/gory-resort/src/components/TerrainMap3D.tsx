/**
 * TerrainMap3D — photorealistic 3D terrain block rendered with Three.js.
 * Styled after "3D Map Generator – Atlas" renders: extruded rectangular slab,
 * satellite-style vertex-colour surface, dramatic oblique lighting.
 */
import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

export type TerrainPreset =
  | 'uae' | 'turkey' | 'cyprus' | 'georgia'
  | 'thailand' | 'portugal' | 'serbia';

interface TerrainConfig {
  seed:        number;
  scale:       number;   // noise frequency — higher = more detailed
  heightScale: number;   // max terrain height (scene units)
  flatBias:    number;   // 0 = wild mountains, 1 = perfectly flat
  colorAt:     (h: number) => [number, number, number]; // RGB 0..1
}

// ─── Per-country terrain presets ─────────────────────────────────────────────
const PRESETS: Record<TerrainPreset, TerrainConfig> = {
  uae: {
    seed: 1337, scale: 2.2, heightScale: 0.22, flatBias: 0.72,
    colorAt: h => {
      if (h < 0.12) return [0.80, 0.67, 0.40]; // pale sand
      if (h < 0.30) return [0.73, 0.58, 0.30]; // golden dunes
      if (h < 0.58) return [0.63, 0.48, 0.22]; // deeper dune shadow
      return                  [0.52, 0.38, 0.14]; // rocky ridge
    },
  },
  turkey: {
    seed: 2468, scale: 3.8, heightScale: 0.60, flatBias: 0.08,
    colorAt: h => {
      if (h < 0.07) return [0.28, 0.58, 0.24]; // coastal plain
      if (h < 0.22) return [0.22, 0.48, 0.17]; // green hills
      if (h < 0.48) return [0.48, 0.40, 0.22]; // rocky mid
      if (h < 0.72) return [0.60, 0.54, 0.42]; // grey rock
      return                  [0.90, 0.90, 0.88]; // snow
    },
  },
  cyprus: {
    seed: 3579, scale: 3.1, heightScale: 0.46, flatBias: 0.15,
    colorAt: h => {
      if (h < 0.08) return [0.36, 0.60, 0.28]; // Mediterranean coastal
      if (h < 0.24) return [0.28, 0.50, 0.20]; // olive slopes
      if (h < 0.50) return [0.50, 0.44, 0.28]; // dry rocky
      if (h < 0.74) return [0.64, 0.58, 0.44]; // high rocky
      return                  [0.80, 0.77, 0.70]; // limestone peak
    },
  },
  georgia: {
    seed: 5911, scale: 4.2, heightScale: 0.95, flatBias: 0.0,
    colorAt: h => {
      if (h < 0.10) return [0.14, 0.40, 0.10]; // deep forest valley
      if (h < 0.30) return [0.18, 0.34, 0.13]; // forested mid slopes
      if (h < 0.54) return [0.32, 0.28, 0.16]; // subalpine
      if (h < 0.74) return [0.52, 0.48, 0.44]; // rocky alpine
      return                  [0.94, 0.94, 0.92]; // Caucasus snow
    },
  },
  thailand: {
    seed: 7123, scale: 3.3, heightScale: 0.52, flatBias: 0.18,
    colorAt: h => {
      if (h < 0.06) return [0.18, 0.55, 0.35]; // lush tropical low
      if (h < 0.22) return [0.14, 0.45, 0.22]; // rainforest
      if (h < 0.48) return [0.18, 0.36, 0.16]; // dense canopy
      if (h < 0.70) return [0.38, 0.34, 0.20]; // rocky interior
      return                  [0.60, 0.57, 0.50]; // limestone karst top
    },
  },
  portugal: {
    seed: 8246, scale: 2.9, heightScale: 0.40, flatBias: 0.28,
    colorAt: h => {
      if (h < 0.09) return [0.40, 0.60, 0.27]; // Atlantic green
      if (h < 0.28) return [0.32, 0.50, 0.19]; // rolling hills
      if (h < 0.55) return [0.48, 0.42, 0.24]; // scrubland
      if (h < 0.78) return [0.62, 0.56, 0.42]; // Serra da Estrela
      return                  [0.82, 0.80, 0.74]; // granite peak
    },
  },
  serbia: {
    seed: 9357, scale: 3.5, heightScale: 0.48, flatBias: 0.22,
    colorAt: h => {
      if (h < 0.10) return [0.33, 0.54, 0.20]; // Pannonian plain
      if (h < 0.30) return [0.27, 0.46, 0.16]; // Šumadija hills
      if (h < 0.55) return [0.42, 0.38, 0.22]; // rocky slopes
      if (h < 0.76) return [0.58, 0.53, 0.42]; // Kopaonik high
      return                  [0.80, 0.78, 0.70]; // peak
    },
  },
};

// ─── Value noise helpers ──────────────────────────────────────────────────────
function rand(x: number, y: number, seed: number): number {
  const v = Math.sin(x * 127.1 + y * 311.7 + seed * 74.3) * 43758.5453;
  return v - Math.floor(v);
}

function valueNoise(x: number, y: number, seed: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix,        fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = rand(ix,     iy,     seed);
  const b = rand(ix + 1, iy,     seed);
  const c = rand(ix,     iy + 1, seed);
  const d = rand(ix + 1, iy + 1, seed);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number, seed: number, octaves = 6): number {
  let v = 0, amp = 0.5, freq = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    v   += amp * valueNoise(x * freq, y * freq, seed + i * 13.1);
    max += amp;
    amp  *= 0.52;
    freq *= 1.98;
  }
  return v / max;
}

// ─── Main component ───────────────────────────────────────────────────────────
interface TerrainMap3DProps {
  preset?:    TerrainPreset;
  className?: string;
  /** Canvas height in CSS px (default 480) */
  canvasHeight?: number;
  /** Optional location label drawn top-left */
  label?: string;
}

function TerrainMap3DInner({
  preset      = 'uae',
  className   = '',
  canvasHeight = 480,
  label,
}: TerrainMap3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const failedRef = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || failedRef.current) return;

    const cfg = PRESETS[preset];
    const W = mount.clientWidth || 800;
    const H = canvasHeight;

    // ── Renderer ─────────────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      // WebGL unavailable (headless env or unsupported device) — show fallback
      failedRef.current = true;
      mount.dataset.fallback = 'true';
      return;
    }
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0a0a0a, 1);
    mount.appendChild(renderer.domElement);

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.032);

    // ── Camera ───────────────────────────────────────────────────────────────
    const aspect = W / H;
    const frustum = 7;
    const camera = new THREE.OrthographicCamera(
      -frustum * aspect, frustum * aspect, frustum, -frustum, 0.01, 100,
    );
    // Isometric-like angle: look from upper-left, tilted like the reference image
    camera.position.set(-9, 13, 9);
    camera.lookAt(0, cfg.heightScale * 0.4, 0);

    // ── Lights ───────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xc8c8d0, 1.1);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff8e8, 3.2);
    sun.position.set(-5, 8, 3);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far  = 50;
    sun.shadow.camera.left = sun.shadow.camera.bottom = -8;
    sun.shadow.camera.right = sun.shadow.camera.top   =  8;
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    // Subtle rim/fill light from opposite side
    const fill = new THREE.DirectionalLight(0x8899cc, 0.6);
    fill.position.set(4, 3, -4);
    scene.add(fill);

    // ── Terrain geometry ─────────────────────────────────────────────────────
    const SEG   = 110; // grid resolution
    const SIZE  = 10;  // world units
    const HALF  = SIZE / 2;

    const geo = new THREE.BufferGeometry();
    const vertCount = (SEG + 1) * (SEG + 1);

    const positions = new Float32Array(vertCount * 3);
    const normals   = new Float32Array(vertCount * 3);
    const colors    = new Float32Array(vertCount * 3);

    // Build height field
    const heights = new Float32Array(vertCount);
    for (let iy = 0; iy <= SEG; iy++) {
      for (let ix = 0; ix <= SEG; ix++) {
        const idx = iy * (SEG + 1) + ix;
        const nx  = (ix / SEG) * cfg.scale;
        const ny  = (iy / SEG) * cfg.scale;
        let   h   = fbm(nx, ny, cfg.seed);

        // Apply flatness bias — pull towards a middle plateau, then re-normalise
        h = h * (1 - cfg.flatBias) + 0.5 * cfg.flatBias;

        heights[idx] = h * cfg.heightScale;
      }
    }

    // Fill positions + vertex colours
    for (let iy = 0; iy <= SEG; iy++) {
      for (let ix = 0; ix <= SEG; ix++) {
        const idx = iy * (SEG + 1) + ix;
        const x   = (ix / SEG) * SIZE - HALF;
        const z   = (iy / SEG) * SIZE - HALF;
        const y   = heights[idx];

        positions[idx * 3]     = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        // Normalised height for colouring (0..1 in range of heightScale)
        const hNorm = y / cfg.heightScale;
        const [r, g, b] = cfg.colorAt(hNorm);
        colors[idx * 3]     = r;
        colors[idx * 3 + 1] = g;
        colors[idx * 3 + 2] = b;
      }
    }

    // Indices (two triangles per quad)
    const indices: number[] = [];
    for (let iy = 0; iy < SEG; iy++) {
      for (let ix = 0; ix < SEG; ix++) {
        const a = iy       * (SEG + 1) + ix;
        const b = iy       * (SEG + 1) + ix + 1;
        const c = (iy + 1) * (SEG + 1) + ix;
        const d = (iy + 1) * (SEG + 1) + ix + 1;
        indices.push(a, c, b,  b, c, d);
      }
    }

    geo.setIndex(indices);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshLambertMaterial({
      vertexColors: true,
      side:         THREE.FrontSide,
    });

    const terrain = new THREE.Mesh(geo, mat);
    terrain.castShadow    = true;
    terrain.receiveShadow = true;
    scene.add(terrain);

    // ── Extruded block sides ─────────────────────────────────────────────────
    const DEPTH      = 0.65;   // block thickness
    const BOTTOM     = -DEPTH; // y level of the bottom face
    const sideMat    = new THREE.MeshLambertMaterial({ color: 0x111114 });
    const rimMat     = new THREE.MeshLambertMaterial({ color: 0x1a1a22 });

    // Helper: build a side wall between terrain edge and the bottom
    const addWall = (
      ax: number, az: number,
      bx: number, bz: number,
      hA: number, hB: number,
      inward: [number, number],
    ) => {
      const wGeo = new THREE.BufferGeometry();
      const p = new Float32Array([
        ax, hA,     az,
        bx, hB,     bz,
        ax, BOTTOM, az,
        bx, BOTTOM, bz,
      ]);
      const i = [0, 2, 1,  1, 2, 3];
      wGeo.setAttribute('position', new THREE.BufferAttribute(p, 3));
      wGeo.setIndex(i);
      wGeo.computeVertexNormals();
      const wall = new THREE.Mesh(wGeo, inward[0] < 0 ? rimMat : sideMat);
      wall.receiveShadow = true;
      scene.add(wall);
    };

    // Front (Z = +HALF) and back (Z = -HALF)
    for (let ix = 0; ix < SEG; ix++) {
      const x0 = (ix / SEG)       * SIZE - HALF;
      const x1 = ((ix + 1) / SEG) * SIZE - HALF;
      // Front
      const hF0 = heights[SEG * (SEG + 1) + ix];
      const hF1 = heights[SEG * (SEG + 1) + ix + 1];
      addWall(x0, HALF, x1, HALF, hF0, hF1, [0, 1]);
      // Back
      const hB0 = heights[ix];
      const hB1 = heights[ix + 1];
      addWall(x0, -HALF, x1, -HALF, hB0, hB1, [0, -1]);
    }
    // Left (X = -HALF) and right (X = +HALF)
    for (let iy = 0; iy < SEG; iy++) {
      const z0 = (iy / SEG)       * SIZE - HALF;
      const z1 = ((iy + 1) / SEG) * SIZE - HALF;
      // Left
      const hL0 = heights[iy       * (SEG + 1)];
      const hL1 = heights[(iy + 1) * (SEG + 1)];
      addWall(-HALF, z0, -HALF, z1, hL0, hL1, [-1, 0]);
      // Right
      const hR0 = heights[iy       * (SEG + 1) + SEG];
      const hR1 = heights[(iy + 1) * (SEG + 1) + SEG];
      addWall(HALF, z0, HALF, z1, hR0, hR1, [1, 0]);
    }

    // Bottom face
    const bottomGeo  = new THREE.PlaneGeometry(SIZE, SIZE);
    const bottomMesh = new THREE.Mesh(bottomGeo, new THREE.MeshLambertMaterial({ color: 0x0a0a0d }));
    bottomMesh.rotation.x = -Math.PI / 2;
    bottomMesh.position.y = BOTTOM;
    bottomMesh.receiveShadow = true;
    scene.add(bottomMesh);

    // ── Drop shadow plane (just below block) ─────────────────────────────────
    const shadowTex = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 256;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0,   'rgba(0,0,0,0.55)');
      grad.addColorStop(0.6, 'rgba(0,0,0,0.22)');
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    })();

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(SIZE * 2, SIZE * 2),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y  = BOTTOM - 0.01;
    scene.add(shadowPlane);

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const a = w / H;
      (camera as THREE.OrthographicCamera).left   = -frustum * a;
      (camera as THREE.OrthographicCamera).right  =  frustum * a;
      camera.updateProjectionMatrix();
      renderer.setSize(w, H);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Render loop ───────────────────────────────────────────────────────────
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      shadowTex.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [preset, canvasHeight]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: canvasHeight }}
    >
      {label && (
        <div className="absolute top-5 left-7 z-10 pointer-events-none">
          <p className="font-oxanium text-white/80 text-base font-semibold leading-tight drop-shadow-lg">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

export const TerrainMap3D = memo(TerrainMap3DInner);
