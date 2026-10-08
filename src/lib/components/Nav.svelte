<script lang="ts">
  import { fade } from 'svelte/transition';
  import Logo from './Logo.svelte';
  import { navLinks } from '../data';

  let open = $state(false);

  $effect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  });

  const menuLinks = [...navLinks, { href: '#editions', label: 'Pre-order' }];
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<header class="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:pt-5">
  <nav
    aria-label="Primary"
    class="nav-glass mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full pr-2 pl-5"
  >
    <a href="#top" class="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
      <Logo />
      Halden
    </a>

    <ul class="hidden items-center gap-0.5 text-sm text-muted lg:flex">
      {#each navLinks as link (link.href)}
        <li>
          <a
            href={link.href}
            class="rounded-full px-3.5 py-2 transition-colors duration-300 ease-spring hover:bg-ink/5 hover:text-ink"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="flex items-center gap-1.5">
      <a href="#editions" class="btn-primary btn-compact hidden sm:inline-flex">Pre-order</a>
      <button
        type="button"
        class="burger relative grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 ease-spring hover:bg-ink/5 lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onclick={() => (open = !open)}
      >
        <span class="line" class:open data-pos="top"></span>
        <span class="line" class:open data-pos="bottom"></span>
      </button>
    </div>
  </nav>
</header>

{#if open}
  <div
    id="mobile-menu"
    class="fixed inset-0 z-30 bg-bg/80 backdrop-blur-2xl lg:hidden"
    transition:fade={{ duration: 280 }}
  >
    <ul class="flex h-full flex-col justify-center gap-1 px-8">
      {#each menuLinks as link, i (link.href)}
        <li class="menu-item overflow-hidden" style="--i:{i}">
          <a
            href={link.href}
            onclick={() => (open = false)}
            class="block py-2 text-4xl font-medium tracking-[-0.03em] {link.href === '#editions'
              ? 'text-accent'
              : 'text-ink'}"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .line {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 18px;
    height: 1.5px;
    border-radius: 2px;
    background: var(--ink);
    transition: transform 500ms var(--ease-spring);
  }
  .line[data-pos='top'] {
    transform: translate(-50%, -4px);
  }
  .line[data-pos='bottom'] {
    transform: translate(-50%, 3px);
  }
  .line.open[data-pos='top'] {
    transform: translate(-50%, 0) rotate(45deg);
  }
  .line.open[data-pos='bottom'] {
    transform: translate(-50%, 0) rotate(-45deg);
  }

  @media (prefers-reduced-motion: no-preference) {
    .menu-item a {
      animation: rise 700ms var(--ease-spring) both;
      animation-delay: calc(var(--i) * 55ms + 80ms);
    }
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translate3d(0, 3rem, 0);
    }
  }
</style>
