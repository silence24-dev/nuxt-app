import { deleteProduct } from '~~/server/database/repositories/productRepository';

export default defineEventHandler(async (event) => {
	const id = event.context.params.id;

	try {
		await deleteProduct(+id);
		return { message: 'Продукт удален' };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
