<template>
	<el-dialog v-model="dialogVisible" width="800px" align-center append-to-body>
		<div class="dialog-body">
			<div class="dialog-img">
				<img :src="props.product.imageURL" :alt="props.product.name" />
			</div>
			<div class="dialog-content">
				<p class="dialog-content__name">{{ props.product.name }}</p>
				<p class="dialog-content__components">{{ props.product.composition }}</p>
				<p class="dialog-content__weight">
					вес: <strong>{{ props.product.weight }}гр.</strong>
				</p>
				<p class="dialog-content__price">
					цена: <strong>{{ props.product.price }}₽</strong>
				</p>
			</div>
			<div class="dialog-footer">
				<el-input-number
					v-model="productInCart.amount"
					:min="0"
					:max="99"
					size="large"
					@change="handleChange(productInCart.amount, productInCart)"
				/>
				<el-button
					color="#00ac4e"
					class="to-cart"
					@click="
						cart.addToCart(props.product);
						productInCart = props.product;
					"
					>В корзину
				</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';

const props = defineProps({
	product: Object,
});
const dialogVisible = ref(false);
const cartStore = useCartStore();
const productInCart = ref({});

function handleChange(value, product) {
	//const productInCart = cart.shoppingCart.find((item) => item.id === product.id);

	if (value < 1) {
		cartStore.removeFromCart(product);
	}

	cartStore.cartCount = cartStore.shoppingCart.reduce((accum, product) => {
		accum = accum + product.amount;
		return accum;
	}, 0);
}

onMounted(() => {
	cartStore.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
	cartStore.cartCount = JSON.parse(localStorage.getItem('cartCount') || '0');
});

watch(
	cartStore.$state,
	(value) => {
		localStorage.setItem('shoppingCart', JSON.stringify(value.shoppingCart));
		localStorage.setItem('cartCount', JSON.stringify(value.cartCount));
	},
	{
		deep: true,
	}
);

function show() {
	dialogVisible.value = true;
}

defineExpose({
	show,
});
</script>
<style lang="scss" scoped>
.dialog-body {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.dialog-img {
		position: relative;
		overflow: hidden;
		padding-bottom: 58%;
		border-radius: 4px;
		margin-bottom: 10px;
		width: 100%;
		img {
			width: 100%;
			height: 100%;
			position: absolute;
			object-fit: cover;
			top: 0;
			left: 0;
		}
	}
	.dialog-content {
		font-size: 16px;
		p {
			margin-bottom: 10px;
		}
		.dialog-content__name {
			font-size: 20px;
			letter-spacing: 0.02em;
			font-weight: 700;
			line-height: 24px;
		}
	}
	.dialog-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.el-button {
			width: 140px;
			height: 40px;
			border-radius: 4px;
			font-weight: 500;
			font-size: 18px;
			line-height: 14px;
			margin-left: 20px;
		}
	}
}
</style>
