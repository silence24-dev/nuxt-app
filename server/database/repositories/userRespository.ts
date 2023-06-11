import prisma from '~/server/database/client';
import { IUser } from '~/types/IUser';

export async function getUserByEmail(email: string): Promise<IUser> {
	return await prisma.user.findFirst({
		where: {
			email,
		},
		select: {
			id: true,
			name: true,
			password: true,
		},
	});
}

export async function createUser(data: IUser) {
	const user = await prisma.user.create({
		data: {
			email: data.email,
			password: data.password,
		},
	});

	return user;
}

export async function getUserById(id: number): Promise<IUser> {
	return await prisma.user.findUnique({
		where: {
			id: id,
		},
		select: {
			id: true,
			name: true,
			email: true,
		},
	});
}

export async function updateUser(id: number, data: IUser) {
	const user = await prisma.user.update({
		where: {
			id: id,
		},
		data: data,
	});

	return user;
}
