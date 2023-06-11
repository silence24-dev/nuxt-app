import prisma from '~/server/database/client';
import { IOrder } from '~/types/IOrder';

export async function createOrder(data: IOrder): Promise<IOrder> {
	return await prisma.order.create({
		data: {
			userId: data.userId,
			address: data.address,
			payment: data.payment,
			products: data.products,
			comment: data.comment,
			status: data.status,
			total: data.total,
		},
	});
}

export async function getAllOrders(): Promise<IOrder[]> {
	return await prisma.order.findMany();
}

export async function updateOrder(id: number, data: IOrder): Promise<IOrder> {
	return await prisma.order.update({
		where: {
			id,
		},
		data: {
			...data,
		},
	});
}

export async function getOrderById(id: number): Promise<IOrder> {
	return await prisma.order.findUnique({
		where: {
			id: id,
		},
		select: {
			total: true,
			payment: true,
			products: true,
		},
	});
}

export async function deleteOrder(id: number): Promise<IOrder> {
	return await prisma.order.delete({
		where: {
			id,
		},
	});
}

export async function getAllOrdersByUserId(userId: number): Promise<IOrder[]> {
	return await prisma.order.findMany({
		where: {
			userId,
		},
	});
}
