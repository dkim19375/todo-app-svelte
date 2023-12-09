<script lang="ts">
	import { enhance } from '$app/forms';
	import { error, type SubmitFunction } from '@sveltejs/kit';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	export let todo_item: {
		id: number;
		content: string | null;
	};

	export let new_todo_item_added_event: () => Promise<void>;

	let input_element: HTMLInputElement;

	const dispatch_event = createEventDispatcher();

	function handleFocusOut(event: FocusEvent & { currentTarget: HTMLInputElement }) {
		const value = event.currentTarget.value.trim();
		const new_content = value.trim() === '' ? null : value;
		if (new_content === todo_item?.content) return;
		let form = event.currentTarget.form;
		if (form == null) {
			throw error(410, 'Form cannot be found');
		}
		form.requestSubmit();
	}

	onMount(() => {
		console.log(`ID: ${todo_item.id}:${todo_item.content}`);
	});

	export async function focus() {
		await tick();
		input_element.focus();
		console.log(`focused on ${todo_item.id}:${todo_item.content}:${input_element.value}`);
	}

	export function value(): string | null {
		return `id: ${todo_item.id}, content: ${todo_item.content}`;
	}

	export const handleEnhance = (({ formData }) => {
		const old_content = todo_item.content == null ? '' : todo_item.content.trim();
		const new_content = formData.get('todo_item')?.toString()?.trim() || '';
		console.log(`old_content: ${old_content}, new_content: ${new_content}`);
		if (old_content === new_content) return;
		const was_empty = todo_item.content === null || todo_item.content.trim() === '';
		console.log(`Sending form with id: ${todo_item.id.toString()}`);
		formData.append('id', todo_item.id.toString());
		return async ({ result, update }) => {
			update();
			console.log(result);
			if (was_empty && result.type === "success") {
				//await new_todo_item_added_event();
				dispatch_event('newTodoItemAddedEvent');
			}
		};
	}) satisfies SubmitFunction;
</script>

<form
	use:enhance={handleEnhance}
	on:submit|preventDefault={() => {}}
	action="?/addTodoItem"
	method="POST"
>
	<input
		bind:this={input_element}
		type="text"
		name="todo_item"
		class="w-full py-3 pl-5 m-[0.4rem] text-2xl transition-colors outline-none bg-slate-800 rounded-xl text-slate-200 focus:bg-slate-775"
		value={todo_item.content || ''}
		spellcheck="false"
		on:blur={handleFocusOut}
	/>
</form>
