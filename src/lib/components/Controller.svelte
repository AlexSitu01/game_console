<script lang="ts">
  import WifiHigh from 'phosphor-svelte/lib/WifiHigh';
  import Joystick from 'phosphor-svelte/lib/Joystick';
  import BatteryHigh from 'phosphor-svelte/lib/BatteryHigh';
  import Photo from './Photo.svelte';
  import { reveal } from '../actions/reveal';

  const details = [
    {
      icon: WifiHigh,
      title: 'Wireless or wired',
      body: 'Pairs over its own 2.4 GHz receiver, or plugs in with USB-C when you want a cable.',
    },
    {
      icon: Joystick,
      title: 'A D-pad that rolls',
      body: 'A pivoting cross with a firm centre, tuned so diagonals land when you mean them.',
    },
    {
      icon: BatteryHigh,
      title: 'Weeks between charges',
      body: 'Around 40 hours of play per charge, topped up on the dock or any USB-C cable.',
    },
  ];
</script>

<section id="controller" class="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
  <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
    <div use:reveal class="lg:col-span-7">
      <div class="bezel">
        <div class="bezel-core aspect-[4/3] lg:aspect-[6/5]">
          <Photo photo="controller" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
      </div>
    </div>

    <div class="lg:col-span-5">
      <p use:reveal class="eyebrow">The controller</p>
      <h2 use:reveal={80} class="mt-6 text-4xl leading-[1.04] font-semibold tracking-[-0.04em] md:text-5xl">
        Built for thumbs that remember.
      </h2>
      <p use:reveal={140} class="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
        The classic layout you know, with modern internals and a weight that sits right in two hands.
      </p>

      <ul class="mt-10 grid gap-7 border-t border-line pt-10">
        {#each details as d, i (d.title)}
          {@const Icon = d.icon}
          <li use:reveal={200 + i * 80} class="grid grid-cols-[2.75rem_1fr] gap-4">
            <span class="grid h-11 w-11 place-items-center rounded-full bg-accent/12 text-accent">
              <Icon size={20} weight="regular" aria-hidden="true" />
            </span>
            <div>
              <h3 class="font-semibold tracking-[-0.01em]">{d.title}</h3>
              <p class="mt-1 leading-relaxed text-muted">{d.body}</p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
