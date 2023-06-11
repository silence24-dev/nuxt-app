import prisma from '~/server/database/client';

export async function createReview(data) {
	return await prisma.review.create({
		data: {
			name: data.name,
			phone: data.phone,
			type: data.type,
			message: data.message,
		},
	});
}

export async function getAllReviews() {
	return await prisma.review.findMany();
}
