import { defineStore } from 'pinia';
import { IOrder } from '~~/types/IOrder';

export const useOrderStore = defineStore({
	id: 'order-store',
	state: () => ({
		orders: [],
	}),
	getters: {},
	actions: {
		async create(data) {
			try {
				const order = await $fetch<IOrder>('/api/orders/create', {
					method: 'POST',
					body: data,
				});
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
		async getAll() {
			try {
				let data = await $fetch<IOrder[]>('/api/orders');
				this.orders = data;
				return data as IOrder[];
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
		async update(id: number, order: IOrder) {
			try {
				await $fetch(`/api/orders/${id}`, {
					method: 'PUT',
					body: order,
				});
				await useRouter().push('/admin/orders');
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
		async delete(id: number) {
			try {
				await $fetch(`/api/orders/${id}`, {
					method: 'DELETE',
					body: { id: id },
				});
				await useRouter().push('/admin/orders');
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
	},
});
