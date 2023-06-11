import { H3Event, sendError } from 'h3';
import { IOrder } from '~/types/IOrder';
import { createOrder } from '~/server/database/repositories/orderRepository';

export default async (event: H3Event) => {
	const body = await useBody(event);

	console.log('body :>> ', body);
	// нужна валидация
	const orderData: IOrder = {
		userId: body.userId,
		comment: body.comment,
		address: {
			street: body.street,
			building: body.building,
			floor: body.floor,
			entrance: body.entrance,
			apartment: body.apartment,
			doorphone: body.doorphone,
		},
		total: body.total,
		payment: body.payment,
		products: body.products,
		status: body.status,
	};

	return await createOrder(orderData);
};
