import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';

export const load: () => Promise<{
    todo_items: Prisma.PrismaPromise<{
        id: number;
        content: string;
    }[]>;
}> = (async () => {
	return {
		todo_items: prisma.todoItems.findMany()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	addTodoItem: async ({ request }) => {
		const { todo_item, id } = Object.fromEntries(await request.formData()) as { todo_item: string, id: string };
		const id_num = parseInt(id);

		const content = todo_item == null ? null : todo_item.trim().substring(0, 256);

		if (id == null || id_num == null || id_num <= 0) {
			return fail(400, { message: 'Invalid id' });
		}

		if (content == null || content.length === 0) {
			try {
				await prisma.todoItems.deleteMany({ where: { id: id_num }});
			} catch (err) {
				console.error(err);
				return fail(500, { message: 'Could not delete todo item' });
			}
		} else {
			try {
				const existing = await prisma.todoItems.findUnique({ where: { id: id_num }});
				if (existing == null) {
					await prisma.todoItems.create({
						data: {
							id: id_num,
							content: content
						}
					});
				} else if (existing?.content !== content) {
					await prisma.todoItems.update({ where: { id: id_num }, data: { content: content } });
				}
			} catch (err) {
				console.error(err);
				return fail(500, { message: 'Could not add todo item' });
			}
		}

		return {
			status: 201
		}
	}
};