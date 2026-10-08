<script lang="ts">
  let { size = 22 }: { size?: number } = $props();
</script>

<!-- Simple geometric mark: a cartridge slot seen from above. -->
<span
  aria-hidden="true"
  class="relative inline-grid shrink-0 place-items-center rounded-[30%] bg-ink"
  style="width:{size}px;height:{size}px"
>
  <span class="absolute inset-[22%] rounded-[22%] bg-accent"></span>
  <span class="absolute inset-[40%] rounded-[18%] bg-ink"></span>
</span>
