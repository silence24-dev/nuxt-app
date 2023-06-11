import { H3Event } from 'h3';
import { createReview } from '~/server/database/repositories/reviewRepository';

export default async (event: H3Event) => {
	const body = await useBody(event);

	const data = {
		name: body.name,
		phone: body.phone,
		type: body.type,
		message: body.message,
	};

	return await createReview(data);
};
