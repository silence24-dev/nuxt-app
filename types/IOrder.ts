import { IUser } from './IUser';
import { IProduct } from './IProduct';

export interface IOrder {
	id?: number;
	comment?: string;
	user?: IUser;
	userId?: number;
	total?: number;
	payment?: string;
	products?: {};
	address?: {};
	createdAt?: Date;
	status?: string;
}
