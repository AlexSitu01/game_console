<script lang="ts">
  import ImageBroken from 'phosphor-svelte/lib/ImageBroken';
  import { photos, unsplash, type PhotoKey } from '../data';

  type Props = {
    photo: PhotoKey;
    sizes?: string;
    eager?: boolean;
    class?: string;
  };

  let { photo, sizes = '100vw', eager = false, class: className = '' }: Props = $props();

  const widths = [640, 960, 1400, 2000];
  let status = $state<'loading' | 'loaded' | 'error'>('loading');

  const src = $derived(photos[photo]);
  const srcset = $derived(widths.map((w) => `${unsplash(src.id, w)} ${w}w`).join(', '));

  // Cached images can finish before the load listener attaches.
  function checkComplete(node: HTMLImageElement) {
    if (node.complete && node.naturalWidth > 0) status = 'loaded';
  }
</script>

<div class="absolute inset-0 {status === 'loading' ? 'skeleton' : 'bg-surface-2'}">
  {#if status === 'error'}
    <div class="grid h-full place-items-center text-muted">
      <ImageBroken size={28} weight="light" aria-hidden="true" />
      <span class="sr-only">{src.alt} (image failed to load)</span>
    </div>
  {:else}
    <img
      use:checkComplete
      src={unsplash(src.id, 1400)}
      {srcset}
      {sizes}
      alt={src.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : 'auto'}
      decoding="async"
      onload={() => (status = 'loaded')}
      onerror={() => (status = 'error')}
      class="h-full w-full object-cover transition-opacity duration-700 ease-out-expo {status === 'loaded'
        ? 'opacity-100'
        : 'opacity-0'} {className}"
    />
  {/if}
</div>
