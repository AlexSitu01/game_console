<script lang="ts">
  import Cpu from 'phosphor-svelte/lib/Cpu';
  import ArrowsOutSimple from 'phosphor-svelte/lib/ArrowsOutSimple';
  import FloppyDisk from 'phosphor-svelte/lib/FloppyDisk';
  import GlobeHemisphereWest from 'phosphor-svelte/lib/GlobeHemisphereWest';
  import Photo from './Photo.svelte';
  import { reveal } from '../actions/reveal';
</script>

<section id="features" class="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
  <div class="max-w-3xl">
    <h2 use:reveal class="text-4xl leading-[1.04] font-semibold tracking-[-0.04em] md:text-6xl">
      The original hardware, rebuilt in silicon.
    </h2>
    <p use:reveal={100} class="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
      No emulation layer and no guesswork. Halden One behaves like the console your cartridges were made for.
    </p>
  </div>

  <!-- 5 items, 5 cells: 7+5 / (7)+5 / 5+7. Collapses to one column below md. -->
  <div class="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:auto-rows-[minmax(16rem,auto)] md:grid-cols-12">
    <article use:reveal class="bezel md:col-span-7 md:row-span-2">
      <div class="bezel-core flex h-full min-h-[26rem] flex-col justify-end">
        <Photo photo="cartridges" sizes="(min-width: 768px) 58vw, 100vw" />
        <div
          class="absolute inset-0"
          style="background:linear-gradient(to top, rgb(var(--scrim) / .92) 8%, rgb(var(--scrim) / .35) 55%, transparent)"
        ></div>
        <div class="relative max-w-md p-7 text-[#f1f1ef] md:p-9">
          <Cpu size={28} weight="light" aria-hidden="true" />
          <h3 class="mt-5 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">Hardware, not emulation</h3>
          <p class="mt-3 leading-relaxed text-[#d4d5d8]">
            An FPGA recreates the original chips, so timing, sound and odd little quirks behave exactly as they always
            did.
          </p>
        </div>
      </div>
    </article>

    <article use:reveal={80} class="bezel md:col-span-5">
      <div
        class="bezel-core flex h-full flex-col justify-between p-7 md:p-9"
        style="background:color-mix(in oklab, var(--accent) 14%, var(--surface))"
      >
        <p class="font-mono text-sm text-muted">Input lag</p>
        <div>
          <p class="text-6xl font-semibold tracking-[-0.05em] text-accent md:text-7xl">
            &lt;1<span class="ml-2 text-2xl tracking-tight text-ink md:text-3xl">frame</span>
          </p>
          <p class="mt-3 max-w-[34ch] leading-relaxed text-muted">
            From button press to pixel on screen at 60 Hz. Your timing still counts.
          </p>
        </div>
      </div>
    </article>

    <article use:reveal={160} class="bezel md:col-span-5">
      <div class="bezel-core flex h-full flex-col justify-between gap-10 p-7 md:p-9">
        <ArrowsOutSimple size={28} weight="light" aria-hidden="true" class="text-accent" />
        <div>
          <h3 class="text-xl font-semibold tracking-[-0.02em]">Sharp 4K output</h3>
          <p class="mt-2 max-w-[38ch] leading-relaxed text-muted">
            Integer scaling keeps every pixel square on a modern TV. No blur, no shimmer.
          </p>
        </div>
      </div>
    </article>

    <article use:reveal class="bezel md:col-span-5">
      <div class="bezel-core flex h-full flex-col justify-between gap-10 bg-surface-2 p-7 md:p-9">
        <FloppyDisk size={28} weight="light" aria-hidden="true" class="text-accent" />
        <div>
          <h3 class="text-xl font-semibold tracking-[-0.02em]">Save anywhere</h3>
          <p class="mt-2 max-w-[38ch] leading-relaxed text-muted">
            Pause mid-level and pick it up next week, even on cartridges that never had a battery.
          </p>
        </div>
      </div>
    </article>

    <article use:reveal={80} class="bezel md:col-span-7">
      <div class="bezel-core flex h-full min-h-[18rem] flex-col justify-end">
        <Photo photo="crtRack" sizes="(min-width: 768px) 58vw, 100vw" />
        <div
          class="absolute inset-0"
          style="background:linear-gradient(to right, rgb(var(--scrim) / .9) 10%, rgb(var(--scrim) / .25) 70%, transparent)"
        ></div>
        <div class="relative max-w-sm p-7 text-[#f1f1ef] md:p-9">
          <GlobeHemisphereWest size={28} weight="light" aria-hidden="true" />
          <h3 class="mt-5 text-xl font-semibold tracking-[-0.02em]">Region free</h3>
          <p class="mt-2 leading-relaxed text-[#d4d5d8]">
            Play cartridges from any region. No adapters, no mods.
          </p>
        </div>
      </div>
    </article>
  </div>
</section>
