import { updateOrder } from '~~/server/database/repositories/orderRepository';

export default defineEventHandler(async (event) => {
	
	const body = await useBody(event);
	console.log('body :>> ', body);
	const id = +event.context.params.id;

	try {
		await updateOrder(id, body);
		return { message: 'Информация о заказе сохранена' };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
