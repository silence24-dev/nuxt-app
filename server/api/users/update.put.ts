import { updateUser } from '~~/server/database/repositories/userRespository';

export default defineEventHandler(async (event) => {
	const body = await useBody(event);

	try {
		await updateUser(body.id, body);
		return { message: 'Сохранено' };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
