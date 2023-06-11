import { H3Event } from 'h3';
import { authCheck } from '../services/userService';

export default defineEventHandler(async (event) => {
	const isAllowed = await protectAuthRoute(event);

	if (!isAllowed) {
		return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
	}
});

async function protectAuthRoute(event: H3Event): Promise<boolean> {
	const protectedRoutes = ['/profile'];

	if (!protectedRoutes.includes(event.req.url)) {
		return true;
	}

	return await authCheck(event);
}
