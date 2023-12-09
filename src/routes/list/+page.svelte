<script lang="ts">
	import type { PageData, PageServerData, PageServerLoad } from './$types';
	import TodoList from './TodoList.svelte';


	export let data: PageServerData;
</script>

{#await data.todo_items}
	<p>Loading</p>
{:then items}
	<TodoList todo_items={items} />
{:catch error}
	{error}
{/await}
