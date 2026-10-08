<script lang="ts">
  import Logo from './Logo.svelte';
  const links = [
    { href: '#faq', label: 'Support' },
    { href: '#', label: 'Press' },
    { href: '#', label: 'Privacy' },
    { href: '#', label: 'Terms' },
  ];
</script>

<footer class="border-t border-line">
  <div
    class="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8"
  >
    <div class="flex items-center gap-3">
      <Logo size={26} />
      <div>
        <p class="font-semibold tracking-tight">Halden</p>
        <p class="text-sm text-muted">Hardware for the cartridges you kept.</p>
      </div>
    </div>
    <nav aria-label="Footer">
      <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        {#each links as link (link.label)}
          <li><a href={link.href} class="transition-colors duration-300 ease-spring hover:text-ink">{link.label}</a></li>
        {/each}
      </ul>
    </nav>
    <p class="text-sm text-muted">&copy; 2026 Halden</p>
  </div>
</footer>
