<script lang="ts">
	import { onMount } from 'svelte';
	import TodoItem from './TodoItem.svelte';

	export let todo_items: {
		id: number;
		content: string;
	}[];

	let last_todo_item: TodoItem;

	async function handleNewTodoItemAdded() {
		//await last_todo_item.focus();
	}

	async function newTodoItemAddedEvent(event: CustomEvent) {
		//console.log(`event called with todo_items: ${JSON.stringify(todo_items)}`);
		//await last_todo_item.focus();
	}

	let last_update: {
		id: number;
		content: string;
	}[] = todo_items;

	$: console.log(`last_todo_item: ${last_todo_item}`);

	$: onUpdate(last_todo_item);

	let last_todo_item_data: { id: number, content: string | null };
	
	$: update_last_item(todo_items);

	function update_last_item(todo_items: { id: number, content: string | null }[]) {
		console.log(`Updating last item`);
		last_todo_item_data = {
			id:
				todo_items.length == 0
					? 1
					: todo_items.length == 1
						? todo_items[0].id + 1
						: todo_items.map((item) => item.id).reduce((a, b) => Math.max(a, b)) + 1,
			content: null
		};
	}

	async function onUpdate(last_todo_item: TodoItem) {
		console.log(`onUpdate called with todo_items: ${JSON.stringify(todo_items)}, last_update: ${JSON.stringify(last_update)}`)
		if (todo_items.length > last_update.length) {
			last_update = todo_items;
			console.log(`focusing with todo_items: ${JSON.stringify(todo_items)}`);
			await last_todo_item.focus();
		}
	}
</script>

<div class="w-[50rem] h-[90%]">
	{#each todo_items as todo_item}
		<TodoItem {todo_item} new_todo_item_added_event={async () => await handleNewTodoItemAdded()} />
	{/each}
	<TodoItem
		todo_item={last_todo_item_data}
		new_todo_item_added_event={handleNewTodoItemAdded}
		bind:this={last_todo_item}
		on:newTodoItemAddedEvent={newTodoItemAddedEvent}
	/>
	<p>{last_todo_item?.value()}</p>
</div>
