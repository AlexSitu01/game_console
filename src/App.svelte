<script lang="ts">
  import Nav from './lib/components/Nav.svelte';
  import Hero from './lib/components/Hero.svelte';
  import Features from './lib/components/Features.svelte';
  import Display from './lib/components/Display.svelte';
  import Controller from './lib/components/Controller.svelte';
  import Specs from './lib/components/Specs.svelte';
  import Statement from './lib/components/Statement.svelte';
  import Editions from './lib/components/Editions.svelte';
  import Faq from './lib/components/Faq.svelte';
  import Signup from './lib/components/Signup.svelte';
  import Footer from './lib/components/Footer.svelte';
</script>

<a
  href="#features"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
>
  Skip to content
</a>

<Nav />

<main>
  <Hero />
  <Features />
  <Display />
  <Controller />
  <Specs />
  <Statement />
  <Editions />
  <Faq />
  <Signup />
</main>

<Footer />
