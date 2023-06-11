import { getAllReviews } from '~~/server/database/repositories/reviewRepository';

export default defineEventHandler(async (event) => {
	return await getAllReviews();
});
