<script lang="ts">
  import { fade } from 'svelte/transition';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import { reveal } from '../actions/reveal';

  type Status = 'idle' | 'sending' | 'error' | 'done';

  let email = $state('');
  let status = $state<Status>('idle');
  let message = $state('');

  const valid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (!valid(email)) {
      status = 'error';
      message = 'Enter a full email address, like name@domain.com.';
      return;
    }
    status = 'sending';
    message = '';
    try {
      // Replace with your mailing-list endpoint.
      await new Promise((resolve) => setTimeout(resolve, 900));
      status = 'done';
    } catch {
      status = 'error';
      message = 'That did not go through. Please try again in a moment.';
    }
  }
</script>

<section class="px-4 pt-8 pb-24 md:px-8 md:pb-32">
  <div use:reveal class="bezel mx-auto max-w-[1400px]">
    <div class="bezel-core grid grid-cols-1 gap-10 p-7 md:p-14 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-6">
        <h2 class="text-4xl leading-[1.04] font-semibold tracking-[-0.04em] md:text-5xl">Not ready to pre-order?</h2>
        <p class="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted">
          Leave your email and we will send one message when the first units ship. Nothing else.
        </p>
      </div>

      <div class="lg:col-span-6">
        {#if status === 'done'}
          <div in:fade={{ duration: 400 }} class="flex items-start gap-4" role="status">
            <CheckCircle size={32} weight="light" class="shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p class="text-lg font-medium">You are on the list.</p>
              <p class="mt-1 text-muted">We will write to {email.trim()} when Halden One ships.</p>
            </div>
          </div>
        {:else}
          <form novalidate onsubmit={submit} class="grid gap-2">
            <label for="email" class="text-sm font-medium">Email address</label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="you@example.com"
                bind:value={email}
                oninput={() => status === 'error' && (status = 'idle')}
                aria-invalid={status === 'error'}
                aria-describedby="email-help email-error"
                class="h-12 min-w-0 flex-1 rounded-full bg-bg px-5 text-ink ring-1 ring-line transition-shadow duration-300 ease-spring placeholder:text-muted focus:ring-2 focus:ring-accent focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-accent"
              />
              <button type="submit" class="btn-primary group" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending' : 'Notify me'}
                <span class="btn-orb" class:sending={status === 'sending'}>
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </span>
              </button>
            </div>
            <p id="email-help" class="text-sm text-muted">One email, no marketing list.</p>
            <p id="email-error" class="min-h-5 text-sm font-medium text-accent" aria-live="assertive">
              {status === 'error' ? message : ''}
            </p>
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  @media (prefers-reduced-motion: no-preference) {
    .sending {
      animation: nudge 900ms var(--ease-spring) infinite;
    }
  }
  @keyframes nudge {
    50% {
      transform: translateX(4px);
    }
  }
</style>
