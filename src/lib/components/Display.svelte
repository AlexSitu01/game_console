<script lang="ts">
  import CrtCompare from './CrtCompare.svelte';
  import { reveal } from '../actions/reveal';

  type Mode = 'scanlines' | 'crt' | 'arcade';
  const modes: { id: Mode; label: string }[] = [
    { id: 'scanlines', label: 'Scanlines' },
    { id: 'crt', label: 'Living-room CRT' },
    { id: 'arcade', label: 'Arcade monitor' },
  ];

  let mode = $state<Mode>('crt');
  let split = $state(50);
  const active = $derived(modes.find((m) => m.id === mode)?.label ?? '');
</script>

<section id="display" class="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
  <div class="mx-auto max-w-3xl text-center">
    <h2 use:reveal class="text-4xl leading-[1.04] font-semibold tracking-[-0.04em] md:text-6xl">
      Choose how the pixels look.
    </h2>
    <p use:reveal={100} class="mx-auto mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">
      Razor-sharp squares or the soft glow of the TV you grew up with. Drag across the screen to compare.
    </p>
  </div>

  <div use:reveal={120} class="mx-auto mt-14 max-w-6xl md:mt-16">
    <div class="bezel">
      <div class="bezel-core">
        <CrtCompare {mode} bind:split />
      </div>
    </div>

    <div class="mt-5 flex flex-col items-center justify-between gap-5 px-2 md:flex-row">
      <p class="flex w-full justify-between font-mono text-xs text-muted md:w-auto md:gap-8">
        <span>Left: Sharp</span>
        <span>Right: {active}</span>
      </p>

      <div role="radiogroup" aria-label="Display mode" class="flex flex-wrap justify-center gap-1 rounded-full p-1 ring-1 ring-line">
        {#each modes as m (m.id)}
          <button
            type="button"
            role="radio"
            aria-checked={mode === m.id}
            onclick={() => (mode = m.id)}
            class="h-9 rounded-full px-4 text-sm transition-all duration-500 ease-spring active:scale-[0.98] {mode === m.id
              ? 'bg-ink text-bg'
              : 'text-muted hover:text-ink'}"
          >
            {m.label}
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>
