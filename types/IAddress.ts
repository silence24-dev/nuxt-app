import { IUser } from './IUser';

export interface IAddress {
	orderId?: number;
	id?: number;
	street?: string;
	user?: IUser;
	userId?: number;
	total?: number;
	payment?: string;
	products?: string[];
	address?: {};
}
