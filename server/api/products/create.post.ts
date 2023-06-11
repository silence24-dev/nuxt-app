import { H3Event, sendError } from 'h3';
import { IProduct } from '~/types/IProduct';
import { createProduct } from '~/server/database/repositories/productRepository';

export default async (event: H3Event) => {
	const body = await readBody(event);
	
	// нужна валидация
	const productData: IProduct = {
		name: body.name,
		category: body.category,
		components: body.category,
		description: body.description,
		weight: body.weight,
		price: body.price,
		image: body.image,
	};

	return await createProduct(productData);
};
