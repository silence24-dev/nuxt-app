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
			console.log('data :>> ', data);
			try {
				// const fd = new FormData();
				// fd.append('name', data.name);
				// fd.append('category', data.category);
				// fd.append('description', data.description);
				// fd.append('components', data.components);
				// fd.append('weight', data.weight);
				// fd.append('price', data.price);
				// fd.append('image', data.image, data.image.name);

				const formData = new FormData();

				for (const name in data) {
					formData.append(name, data[name]);
				}

				const product = await $fetch<IProduct>('/api/products/create', {
					method: 'POST',
					body: formData,
					// headers: {
					// 	'Content-Type': 'multipart/form-data',
					// },
				});

				// const product = await useFetch<IProduct>('/api/products/create', {
				// 	method: 'POST',
				// 	body: fd,
				// });
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
