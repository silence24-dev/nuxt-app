import { H3Event, sendError } from 'h3';
import bcrypt from 'bcrypt';
import { IUser } from '~/types/IUser';
import { createUser } from '~/server/database/repositories/userRespository';
import { makeSession } from '~~/server/services/sessionService';
import { validateUser } from '~/server/services/userService';

export default async (event: H3Event) => {
	const body = await readBody(event);
	const data = body.data;

	const validation = await validateUser(data);

	if (validation.hasErrors === true) {
		const errors = JSON.stringify(Object.fromEntries(validation.errors));
		return sendError(event, createError({ statusCode: 422, data: errors }));
	}

	const encryptedPassword: string = await bcrypt.hash(data.password, 10);

	const userData: IUser = {
		email: data.email,
		password: encryptedPassword,
	};

	const user = await createUser(userData);

	return await makeSession(user, event);
};
