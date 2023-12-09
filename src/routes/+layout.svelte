<script lang="ts">
	import '../app.pcss';
	import Header from './Header.svelte';
</script>

<Header />

<main class="bg-slate-700 flex flex-1 justify-center items-center">
    <slot />
</main>

<style lang="postcss">
    :global(html), :global(body) {
        @apply m-0 p-0 w-full h-full;
    }

    :global(body) {
        @apply flex flex-col;
    }

    :global(header) {
        @apply bg-slate-900 h-20;
    }
</style>