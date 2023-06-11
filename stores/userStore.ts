import { defineStore } from 'pinia';

export const useUserStore = defineStore({
	id: 'user-store',
	state: () => ({}),
	getters: {},
	actions: {
		async updateProfile(data) {
			try {
				const user = await $fetch('/api/users/update', {
					method: 'PUT',
					body: data,
				});
			} catch (e) {
				console.log('ERROR :>> ', e);
			}
		},
	},
});
