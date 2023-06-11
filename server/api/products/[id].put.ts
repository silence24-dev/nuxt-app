import { updateProduct } from '~~/server/database/repositories/productRepository';

export default defineEventHandler(async (event) => {
	const body = await useBody(event);

	const id = +event.context.params.id;

	try {
		await updateProduct(id, body);
		return { message: 'Продукт обновлен' };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
