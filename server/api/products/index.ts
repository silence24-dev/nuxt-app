import { getAllProducts } from '~~/server/database/repositories/productRepository';

export default defineEventHandler(async (event) => {
	return await getAllProducts();
});
