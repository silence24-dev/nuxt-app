import { defineStore } from 'pinia';
import { IProduct } from '~~/types/IProduct';

export const useProductStore = defineStore({
	id: 'product-store',
	state: () => ({
		products: [],
	}),
	getters: {},
	actions: {
		async create(data) {
			try {
				const product = await $fetch<IProduct>('/api/products/create', {
					method: 'POST',
					body: data,
				});
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
		async getAll() {
			try {
				let data = await $fetch<IProduct[]>('/api/products');
				this.products = data;
				return data as IProduct[];
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
		async update(id: number, product: IProduct) {
			try {
				await $fetch(`/api/products/${id}`, {
					method: 'PUT',
					body: product,
				});
				await useRouter().push('/admin/menu');
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
		async delete(id: number) {
			try {
				await $fetch(`/api/products/${id}`, {
					method: 'DELETE',
					body: { id: id },
				});
				await useRouter().push('/admin/menu');
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
	},
});
