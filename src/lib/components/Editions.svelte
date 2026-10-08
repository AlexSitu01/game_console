<script lang="ts">
  import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
  import Check from 'phosphor-svelte/lib/Check';
  import { editions, finishes, type Edition, type Finish } from '../data';
  import { reveal } from '../actions/reveal';

  let editionId = $state<Edition['id']>('standard');
  let finishId = $state<Finish['id']>('graphite');

  const edition = $derived(editions.find((e) => e.id === editionId) ?? editions[0]);
  const finish = $derived(finishes.find((f) => f.id === finishId) ?? finishes[0]);
  const checkoutHref = $derived(`/checkout?edition=${editionId}&finish=${finishId}`);

  const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
</script>

<section id="editions" class="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
  <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-7">
      <p use:reveal class="eyebrow">Pre-order</p>
      <h2 use:reveal={80} class="mt-6 text-4xl leading-[1.04] font-semibold tracking-[-0.04em] md:text-6xl">
        Pick your edition.
      </h2>
      <p use:reveal={140} class="mt-5 max-w-[50ch] text-lg leading-relaxed text-muted">
        Reserve now and pay nothing until your console ships.
      </p>

      <fieldset use:reveal={180} class="mt-12">
        <legend class="font-mono text-sm text-muted">Edition</legend>
        <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {#each editions as e (e.id)}
            <label
              class="relative cursor-pointer rounded-[2rem] p-6 ring-1 transition-all duration-500 ease-spring active:scale-[0.99] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent {editionId ===
              e.id
                ? 'bg-surface ring-2 ring-accent'
                : 'ring-line hover:bg-surface/60'}"
            >
              <input type="radio" name="edition" value={e.id} bind:group={editionId} class="sr-only" />
              <span class="flex items-baseline justify-between gap-4">
                <span class="text-xl font-semibold tracking-[-0.02em]">{e.name}</span>
                <span class="font-mono text-lg">{usd.format(e.price)}</span>
              </span>
              <span class="mt-2 block text-muted">{e.blurb}</span>
            </label>
          {/each}
        </div>
      </fieldset>

      <fieldset use:reveal={220} class="mt-10">
        <legend class="font-mono text-sm text-muted">Finish</legend>
        <div class="mt-4 flex flex-wrap gap-3">
          {#each finishes as f (f.id)}
            <label
              class="flex h-12 cursor-pointer items-center gap-3 rounded-full pr-5 pl-2 ring-1 transition-all duration-500 ease-spring active:scale-[0.98] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent {finishId ===
              f.id
                ? 'bg-surface ring-2 ring-accent'
                : 'ring-line hover:bg-surface/60'}"
            >
              <input type="radio" name="finish" value={f.id} bind:group={finishId} class="sr-only" />
              <span class="h-8 w-8 rounded-full ring-1 ring-line" style="background:{f.swatch}"></span>
              {f.name}
            </label>
          {/each}
        </div>
      </fieldset>
    </div>

    <aside use:reveal={160} class="lg:col-span-5" aria-live="polite">
      <div class="bezel lg:sticky lg:top-28">
        <div class="bezel-core p-7 md:p-9">
          <p class="text-sm text-muted">Your Halden One</p>
          <p class="mt-1 text-2xl font-semibold tracking-[-0.02em]">{edition.name} in {finish.name}</p>

          <ul class="mt-8 grid gap-3">
            {#each edition.contents as item (item)}
              <li class="flex items-start gap-3">
                <Check size={18} weight="bold" class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            {/each}
          </ul>

          <div class="mt-10 flex items-end justify-between border-t border-line pt-6">
            <span class="text-muted">Total due when it ships</span>
            <span class="text-4xl font-semibold tracking-[-0.04em]">{usd.format(edition.price)}</span>
          </div>

          <a href={checkoutHref} class="btn-primary group mt-8 w-full justify-between">
            Pre-order
            <span class="btn-orb"><ArrowUpRight size={16} weight="bold" aria-hidden="true" /></span>
          </a>
          <p class="mt-4 text-center text-sm text-muted">Ships spring 2027. Cancel any time for a full refund.</p>
        </div>
      </div>
    </aside>
  </div>
</section>
