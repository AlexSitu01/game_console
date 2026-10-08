<script lang="ts">
  import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
  import Photo from './Photo.svelte';
</script>

<section id="top" class="relative">
  <div
    class="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-10 px-4 pt-28 pb-16 md:px-8 lg:grid-cols-12 lg:gap-12 lg:pt-24 lg:pb-12"
  >
    <div class="lg:col-span-6">
      <p class="eyebrow hero-in">Shipping spring 2027</p>

      <h1
        class="hero-in mt-6 text-5xl leading-[0.98] font-semibold tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-[5.25rem]"
        style="--d:90ms"
      >
        Old cartridges.<br />
        <span class="text-accent">New screens.</span>
      </h1>

      <p class="hero-in mt-6 max-w-[42ch] text-lg leading-relaxed text-muted" style="--d:180ms">
        Halden One plays your original 8- and 16-bit cartridges in hardware and sends them to any modern TV,
        lag-free.
      </p>

      <div class="hero-in mt-9 flex flex-wrap items-center gap-3" style="--d:270ms">
        <a href="#editions" class="btn-primary group">
          Pre-order
          <span class="btn-orb"><ArrowUpRight size={16} weight="bold" aria-hidden="true" /></span>
        </a>
        <a href="#specs" class="btn-ghost">See specs</a>
      </div>
    </div>

    <div class="hero-media lg:col-span-6">
      <div class="bezel">
        <div class="bezel-core aspect-[4/3] max-h-[78dvh] w-full lg:aspect-[5/4]">
          <Photo photo="hero" eager sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>
    </div>
  </div>
</section>
