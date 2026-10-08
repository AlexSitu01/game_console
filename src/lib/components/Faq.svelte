<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Plus from 'phosphor-svelte/lib/Plus';
  import { faqs } from '../data';
  import { reveal } from '../actions/reveal';

  let openIndex = $state<number | null>(0);
</script>

<section id="faq" class="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
    <h2
      use:reveal
      class="text-4xl leading-[1.04] font-semibold tracking-[-0.04em] md:text-5xl lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
    >
      Questions, answered.
    </h2>

    <div class="lg:col-span-8">
      {#each faqs as item, i (item.q)}
        {@const isOpen = openIndex === i}
        <div use:reveal={i * 60} class="border-b border-line first:border-t">
          <h3>
            <button
              type="button"
              id="faq-q-{i}"
              aria-expanded={isOpen}
              aria-controls="faq-a-{i}"
              onclick={() => (openIndex = isOpen ? null : i)}
              class="group flex w-full items-center justify-between gap-6 rounded-none py-6 text-left text-lg font-medium md:text-xl"
            >
              {item.q}
              <span
                class="grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-line transition-transform duration-500 ease-spring"
                class:rotate-45={isOpen}
                class:text-accent={isOpen}
              >
                <Plus size={16} weight="bold" aria-hidden="true" />
              </span>
            </button>
          </h3>
          {#if isOpen}
            <div
              id="faq-a-{i}"
              role="region"
              aria-labelledby="faq-q-{i}"
              transition:slide={{ duration: 500, easing: cubicOut }}
            >
              <p class="max-w-[62ch] pb-7 leading-relaxed text-muted">{item.a}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
