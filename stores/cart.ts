import { defineStore } from 'pinia';

export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		cartCount: 0,
		shoppingCart: [],
	}),
	getters: {},
	actions: {
		addToCart(product, amount = 1) {
			this.cartCount++;
			let exists = false;
			for (const cartItem of this.shoppingCart) {
				if (cartItem.id === product.id) {
					cartItem.amount += amount;
					// cartItem.amount = cartItem.amount + 1;
					exists = true;
					break;
				}
			}
			if (!exists) {
				this.shoppingCart.push({
					...product,
					amount: amount,
				});
			}
		},
		removeFromCart(product) {
			this.cartCount--;
			const productIndex = this.shoppingCart.findIndex((item) => item.id === product.id);
			this.shoppingCart[productIndex].amount -= 1;
			if (this.shoppingCart[productIndex].amount < 1) {
				this.shoppingCart.splice(productIndex, 1);
			}
		},
		removeAllFromCart(product) {
			this.cartCount -= product.amount;
			const productIndex = this.shoppingCart.findIndex((item) => item.id === product.id);
			this.shoppingCart.splice(productIndex, 1);
		},
	},
});
