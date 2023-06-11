import { defineStore } from 'pinia';

export const useReviewStore = defineStore({
	id: 'review-store',
	state: () => ({}),
	getters: {},
	actions: {
		async create(data) {
			try {
				const review = await $fetch('/api/reviews/create', {
					method: 'POST',
					body: data,
				});
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
		async getAll(data) {
			try {
				const reviews = await $fetch('/api/reviews', {
					method: 'GET',
					body: data,
				});
				return reviews;
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
	},
});
