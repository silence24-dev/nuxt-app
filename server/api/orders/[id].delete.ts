import { deleteOrder } from '~~/server/database/repositories/orderRepository';

export default defineEventHandler(async (event) => {
	const id = event.context.params.id;

	try {
		await deleteOrder(+id);
		return { message: 'Заказ удален' };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
