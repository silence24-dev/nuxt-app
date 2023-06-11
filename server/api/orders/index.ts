import { getAllOrders } from '~~/server/database/repositories/orderRepository';

export default defineEventHandler(async (event) => {
	return await getAllOrders();
});
