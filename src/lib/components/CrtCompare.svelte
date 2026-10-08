<script lang="ts">
  import { onMount } from 'svelte';

  type Mode = 'scanlines' | 'crt' | 'arcade';
  let { mode, split = $bindable(50) }: { mode: Mode; split?: number } = $props();

  let dataUrl = $state<string | null>(null);

  // 160 x 90 pixel-art scene drawn procedurally: dithered dusk sky, striped sun,
  // two mountain ranges, pine silhouettes and a lake with sun reflections.
  const W = 160;
  const H = 90;
  const HORIZON = 62;

  const bayer = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ].map((row) => row.map((v) => (v + 0.5) / 16));

  const sky = ['#0d1b2a', '#13293d', '#1f3f55', '#3d5a66', '#b0603a', '#f08a4b', '#ffbf69'];

  function hex(c: string): [number, number, number] {
    return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
  }

  function rng(seed: number) {
    return () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }

  function draw(): string {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    const img = ctx.createImageData(W, H);
    const px = (x: number, y: number, c: string) => {
      if (x < 0 || y < 0 || x >= W || y >= H) return;
      const [r, g, b] = hex(c);
      const i = (y * W + x) * 4;
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    };

    // Sky with ordered dithering between bands.
    for (let y = 0; y < HORIZON; y++) {
      const pos = (y / (HORIZON - 1)) * (sky.length - 1);
      const base = Math.min(Math.floor(pos), sky.length - 2);
      const frac = pos - base;
      for (let x = 0; x < W; x++) {
        px(x, y, frac > bayer[y % 4][x % 4] ? sky[base + 1] : sky[base]);
      }
    }

    // Stars.
    const rand = rng(7);
    for (let i = 0; i < 46; i++) {
      const x = Math.floor(rand() * W);
      const y = Math.floor(rand() * 26);
      px(x, y, rand() > 0.75 ? '#ffe6c2' : '#7f98a8');
    }

    // Sun with horizontal cut stripes on its lower half.
    const sx = 84;
    const sy = 46;
    const sr = 15;
    for (let y = sy - sr; y <= sy + sr; y++) {
      for (let x = sx - sr; x <= sx + sr; x++) {
        const d = Math.hypot(x - sx, y - sy);
        if (d > sr) continue;
        const dy = y - sy;
        if (dy > 1 && dy % 4 < Math.min(3, 1 + dy / 6)) continue;
        px(x, y, d > sr - 1.5 ? '#ffb35c' : y < sy - 4 ? '#ffe39a' : '#ffd27a');
      }
    }

    // Mountain ranges via layered sines.
    const ridge = (x: number, a: number, b: number, c: number, base: number) =>
      Math.round(base - (Math.sin(x * a) * 6 + Math.sin(x * b + 1.7) * 4 + Math.sin(x * c + 0.6) * 2.5));

    for (let x = 0; x < W; x++) {
      const far = ridge(x, 0.045, 0.11, 0.23, 44);
      for (let y = far; y < HORIZON; y++) px(x, y, y === far ? '#3a5262' : '#24384a');
      const near = ridge(x + 40, 0.03, 0.08, 0.19, 56);
      for (let y = near; y < HORIZON; y++) px(x, y, y === near ? '#1a2a38' : '#121e29');
    }

    // Pine silhouettes along the near ridge.
    const trees = [6, 14, 19, 31, 46, 52, 116, 124, 131, 139, 150, 156];
    for (const tx of trees) {
      const top = ridge(tx + 40, 0.03, 0.08, 0.19, 56) - 9 - (tx % 3) * 2;
      for (let y = top; y < HORIZON; y++) {
        const half = Math.floor((y - top) / 2.4);
        for (let x = tx - half; x <= tx + half; x++) px(x, y, '#0b141c');
      }
    }

    // Lake with dithered depth and sun reflections.
    for (let y = HORIZON; y < H; y++) {
      const t = (y - HORIZON) / (H - HORIZON);
      for (let x = 0; x < W; x++) {
        px(x, y, t * 1.4 > bayer[y % 4][x % 4] + 0.25 ? '#0a131b' : '#132433');
      }
      if (y % 2 === 0) {
        const width = Math.max(2, Math.round(sr * (1 - t) * 1.1));
        const wobble = Math.round(Math.sin(y * 1.3) * 2);
        for (let x = sx - width + wobble; x <= sx + width + wobble; x++) {
          if ((x + y) % 5 !== 0) px(x, y, t < 0.35 ? '#ffbf69' : '#c46a3a');
        }
      }
    }

    // Shoreline.
    for (let x = 0; x < W; x++) px(x, HORIZON, '#2f4656');

    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL('image/png');
  }

  onMount(() => {
    dataUrl = draw();
  });
</script>

<div class="relative aspect-video w-full overflow-hidden bg-[#0a131b]">
  {#if dataUrl}
    <img src={dataUrl} alt="" class="pixel absolute inset-0 h-full w-full" />

    <div class="screen absolute inset-0 {mode}" style="clip-path: inset(0 0 0 {split}%)">
      <img src={dataUrl} alt="" class="pixel h-full w-full" />
    </div>

    <div class="pointer-events-none absolute inset-y-0 w-px bg-white/70" style="left:{split}%">
      <span
        class="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f1f1ef] shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)]"
      >
        <span class="flex gap-1"><span class="h-3 w-px bg-[#111113]"></span><span class="h-3 w-px bg-[#111113]"></span></span>
      </span>
    </div>

    <input
      type="range"
      min="0"
      max="100"
      step="0.5"
      bind:value={split}
      aria-label="Drag to compare sharp pixels with the selected display mode"
      class="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
    />
  {:else}
    <div class="skeleton absolute inset-0" aria-hidden="true"></div>
  {/if}
</div>

<style>
  .pixel {
    image-rendering: pixelated;
    object-fit: cover;
  }

  .screen::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* One dark band per source pixel row (90 rows). */
  .scanlines img {
    filter: brightness(1.08) saturate(1.05);
  }
  .scanlines::after {
    background: linear-gradient(to bottom, transparent 45%, rgb(0 0 0 / 0.5) 100%);
    background-size: 100% calc(100% / 90);
  }

  .crt img {
    filter: blur(0.9px) saturate(1.2) brightness(1.12) contrast(1.06);
  }
  .crt::after {
    background:
      radial-gradient(ellipse at center, transparent 55%, rgb(0 0 0 / 0.55) 100%),
      linear-gradient(to bottom, transparent 50%, rgb(0 0 0 / 0.32) 100%),
      repeating-linear-gradient(
        90deg,
        rgb(255 60 60 / 0.09) 0 1px,
        rgb(60 255 120 / 0.09) 1px 2px,
        rgb(80 120 255 / 0.09) 2px 3px
      );
    background-size:
      100% 100%,
      100% calc(100% / 90),
      auto;
  }

  .arcade img {
    filter: blur(0.5px) saturate(1.45) brightness(1.2) contrast(1.12);
  }
  .arcade::after {
    background:
      radial-gradient(ellipse at center, transparent 62%, rgb(0 0 0 / 0.45) 100%),
      linear-gradient(to bottom, transparent 35%, rgb(0 0 0 / 0.7) 100%);
    background-size:
      100% 100%,
      100% calc(100% / 90);
  }
</style>
