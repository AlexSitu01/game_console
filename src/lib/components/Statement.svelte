<script lang="ts">
  import Photo from './Photo.svelte';
  import { reveal } from '../actions/reveal';
</script>

<section class="px-4 py-8 md:px-8">
  <div class="bezel mx-auto max-w-[1400px]">
    <div class="bezel-core flex min-h-[78dvh] items-end">
      <div class="zoom absolute inset-0">
        <Photo photo="livingRoom" sizes="100vw" />
      </div>
      <div
        class="absolute inset-0"
        style="background:linear-gradient(to top, rgb(var(--scrim) / .92), rgb(var(--scrim) / .45) 45%, rgb(var(--scrim) / .1))"
      ></div>
      <div class="relative max-w-2xl p-7 text-[#f1f1ef] md:p-14">
        <h2 use:reveal class="text-4xl leading-[1.04] font-semibold tracking-[-0.04em] md:text-6xl">
          Made for the shelf you already have.
        </h2>
        <p use:reveal={100} class="mt-5 max-w-[46ch] text-lg leading-relaxed text-[#d4d5d8]">
          About the size of a paperback, completely silent, and just as happy next to a flat screen as an old tube TV.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  /* The photo settles as it scrolls through the viewport. CSS-only, no scroll listeners. */
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .zoom {
        animation: settle linear both;
        animation-timeline: view();
        animation-range: entry 0% exit 60%;
      }
    }
  }

  @keyframes settle {
    from {
      transform: scale(1.14);
    }
    to {
      transform: scale(1);
    }
  }
</style>
