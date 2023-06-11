import prisma from '~/server/database/client';
import { IProduct } from '~/types/IProduct';

export async function createProduct(data: IProduct) {
	const product = await prisma.product.create({
		data: {
			name: data.name,
			category: data.category,
			components: data.components,
			description: data.description,
			price: data.price,
			weight: data.weight,
			image: data.image,
		},
	});

	return product;
}

export async function getAllProducts(): Promise<IProduct[]> {
	return await prisma.product.findMany();
}

export async function updateProduct(id: number, data: IProduct): Promise<IProduct> {
	return await prisma.product.update({
		where: {
			id,
		},
		data: {
			name: data.name,
			category: data.category,
			components: data.components,
			description: data.description,
			weight: data.weight,
			price: data.price,
			image: data.image,
		},
	});
}

export async function getProductById(id: number): Promise<IProduct> {
	return await prisma.product.findUnique({
		where: {
			id: id,
		},
		select: {
			id: true,
			name: true,
			category: true,
			components: true,
			description: true,
			weight: true,
			price: true,
			image: true,
		},
	});
}

export async function deleteProduct(id: number): Promise<IProduct> {
	return await prisma.product.delete({
		where: {
			id,
		},
	});
}

