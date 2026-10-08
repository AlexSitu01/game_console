<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Plus from 'phosphor-svelte/lib/Plus';
  import { headlineSpecs, fullSpecs } from '../data';
  import { reveal } from '../actions/reveal';

  let expanded = $state(false);
</script>

<section id="specs" class="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
  <h2 use:reveal class="max-w-2xl text-4xl leading-[1.04] font-semibold tracking-[-0.04em] md:text-6xl">
    Small box. Serious numbers.
  </h2>

  <dl class="mt-14 grid grid-cols-2 gap-y-12 md:mt-20 lg:grid-cols-4 lg:divide-x lg:divide-line">
    {#each headlineSpecs as spec, i (spec.label)}
      <div use:reveal={i * 80} class="pr-6 lg:px-8 lg:first:pl-0">
        <dt class="sr-only">{spec.label}</dt>
        <dd>
          <p class="text-6xl font-semibold tracking-[-0.06em] md:text-7xl xl:text-8xl">
            {spec.value}{#if spec.unit}<span class="ml-2 text-2xl tracking-[-0.02em] text-muted">{spec.unit}</span>{/if}
          </p>
          <p class="mt-3 max-w-[22ch] leading-snug text-muted" aria-hidden="true">{spec.label}</p>
        </dd>
      </div>
    {/each}
  </dl>

  <div class="mt-16 border-t border-line pt-8">
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls="full-specs"
      onclick={() => (expanded = !expanded)}
      class="group flex items-center gap-3 rounded-full py-2 pr-4 text-lg font-medium"
    >
      <span
        class="grid h-9 w-9 place-items-center rounded-full ring-1 ring-line transition-transform duration-500 ease-spring group-active:scale-95"
        class:rotate-45={expanded}
      >
        <Plus size={16} weight="bold" aria-hidden="true" />
      </span>
      {expanded ? 'Hide full specifications' : 'Full specifications'}
    </button>

    {#if expanded}
      <div id="full-specs" transition:slide={{ duration: 600, easing: cubicOut }}>
        <div class="grid grid-cols-1 gap-12 pt-12 md:grid-cols-3 md:gap-10">
          {#each fullSpecs as cluster (cluster.group)}
            <div>
              <h3 class="font-mono text-sm text-accent">{cluster.group}</h3>
              <dl class="mt-5 grid gap-5">
                {#each cluster.items as [label, value] (label)}
                  <div>
                    <dt class="text-sm text-muted">{label}</dt>
                    <dd class="mt-0.5 font-medium">{value}</dd>
                  </div>
                {/each}
              </dl>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
