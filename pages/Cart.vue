<template>
	<div class="cart">
		<div class="container">
			<Breadcrumb :title="$route.meta.title"></Breadcrumb>
			<div class="cart-content" v-if="cartStore.shoppingCart.length > 0" v-loading="loading">
				<el-row>
					<el-col :span="24">
						<ul class="cart-list">
							<li class="cart-list-item" v-for="product in cartStore.shoppingCart">
								<div class="cart-list-item__img">
									<img :src="product.image" :alt="product.name" />
								</div>
								<div class="cart-list-item__name">{{ product.name }}</div>
								<div class="cart-list-item__price">{{ product.price }} ₽</div>
								<div class="cart-list-item__amount">
									<el-input-number
										v-model="product.amount"
										:min="0"
										:max="99"
										size="large"
										@change="handleChange(+product.amount, product)"
									/>
								</div>
								<div class="cart-list-item__total">
									{{ +product.price * +product.amount }} ₽
								</div>
								<el-button
									:icon="CloseBold"
									circle
									@click="handleDelete(product)"
									size="large"
									color="#00AC4E"
									class="remove-btn"
								/>
							</li>
						</ul>
					</el-col>
				</el-row>
				<el-row class="cart-footer">
					<el-col :span="24">
						<div class="total">
							<strong>Сумма вашего заказа:</strong>
							<span>{{ totalSum }} ₽</span>
						</div>
						<div class="button">
							<el-button @click.prevent="navigateTo('/order')" size="large"
								>Оформить заказ</el-button
							>
						</div>
					</el-col>
				</el-row>
			</div>
			<h1 v-else>Ваша корзина пуста</h1>
		</div>
	</div>
</template>

<script setup>
import { CloseBold } from '@element-plus/icons-vue';

const loading = ref(false);

definePageMeta({
	title: 'Корзина',
});

const cartStore = useCartStore();

const handleDelete = (product) => {
	cartStore.removeAllFromCart(product);
	cartStore.cartCount = cartStore.shoppingCart.reduce((accum, product) => {
		accum = accum + product.amount;
		return accum;
	}, 0);
};

const handleChange = (value, product) => {
	if (value < 1) {
		cartStore.removeFromCart(product);
	}
	cartStore.cartCount = cartStore.shoppingCart.reduce((accum, product) => {
		accum = accum + product.amount;
		return accum;
	}, 0);
};

onMounted(() => {
	cartStore.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
});

watch(
	cartStore.$state,
	(value) => {
		localStorage.setItem('shoppingCart', JSON.stringify(value.shoppingCart));
	},
	{ deep: true }
);

const totalSum = computed(() => {
	let sum = 0;

	for (const product of cartStore.shoppingCart) {
		sum += +product.amount * +product.price;
	}
	return sum;
});
</script>

<style lang="scss">
.cart {
	.cart-content {
		.cart-list {
			.cart-list-item {
				display: grid;
				grid-template-columns: 170px 1fr 96px 195px 96px 55px;
				grid-gap: 24px;
				align-items: center;
				padding: 20px 0;
				border-top: 1px solid #ebebeb;
				position: relative;
				&:last-child {
					border-bottom: 1px solid #ebebeb;
				}
				.cart-list-item__img {
					border-radius: 5px;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
						object-fit: contain;
						object-position: center;
					}
				}
				.cart-list-item__amount {
					text-align: center;
					.el-input-number--large {
						line-height: 30px;
					}
				}
				.cart-list-item__price {
					text-align: center;
				}
				.cart-list-item__total {
					text-align: center;
				}
			}
		}
		.cart-footer {
			margin-top: 70px;
			.el-col {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.total {
					font-size: 28px;
					line-height: 36px;
					font-weight: 700;
					span {
						font-size: 24px;
						line-height: 26px;
						margin-left: 30px;
					}
				}
				.button {
					.el-button {
						color: #ffffff;
						background-color: #00ac4e;
						font-size: 20px;
						font-weight: 700;
						padding: 24px 24px;
					}
				}
			}
		}
	}
	@media (max-width: 900px) {
		.cart-content {
			.cart-list {
				.cart-list-item {
					grid-template-columns: 120px 1fr 96px 140px 96px 55px;
					grid-gap: 12px;

					.cart-list-item__amount {
						.el-input-number--large {
							width: 130px;
							.el-input-number__decrease,
							.el-input-number__increase {
								width: 35px;
							}
						}
					}
					.el-button.remove-btn {
						width: 30px;
						height: 30px;
					}
					.cart-list-item__price {
						text-align: right;
					}
					.cart-list-item__total {
						text-align: right;
					}
				}
			}
		}
	}
	@media (max-width: 768px) {
		.cart-content {
			.cart-list {
				.cart-list-item {
					grid-template-columns: 120px 1fr 96px 103px 96px 55px;
					font-size: 16px;
					.cart-list-item__amount {
						.el-input--large {
							height: 25px;
						}
						.el-input-number--large {
							width: 94px;
							line-height: 1px;
							.el-input-number__decrease,
							.el-input-number__increase {
								width: 25px;
							}
						}
					}
					.el-button.remove-btn {
						width: 25px;
						height: 25px;
						padding: 6px;
						position: absolute;
						right: 5px;
						top: 18px;
					}
				}
			}
			.cart-footer {
				margin-top: 50px;
				.el-col {
					.total {
						font-size: 20px;
						span {
							font-size: 19px;
						}
					}
					.button {
						.el-button {
							font-size: 16px;
						}
					}
				}
			}
		}
	}

	@media (max-width: 646px) {
		.cart-content {
			.cart-list {
				.cart-list-item {
					grid-template-columns: 120px 100px 1fr;

					.cart-list-item__img {
						grid-row: 1/3;
						grid-column: 1/2;
					}

					.cart-list-item__name {
						grid-row: 1/2;
						grid-column: 2/-1;
					}
					.cart-list-item__price {
						grid-row: 2/3;
						grid-column: 2/3;
						text-align: left;
					}

					.cart-list-item__total {
						display: none;
					}
				}
			}
		}
	}

	@media (max-width: 550px) {
		.cart-content {
			.cart-footer {
				margin-top: 30px;
				.el-col {
					flex-direction: column;
					.total {
						span {
							margin-left: 20px;
						}
					}
					.total,
					.button {
						width: 100%;
					}
					.button {
						margin-top: 15px;
						.el-button {
							width: 100%;
						}
					}
				}
			}
		}
	}

	@media (max-width: 375px) {
		.cart-content {
			.cart-list {
				.cart-list-item {
					grid-template-columns: 100px 65px 1fr;
				}
			}
			.cart-footer {
				.el-col {
					.total {
						span {
							margin-left: 7px;
						}
					}
				}
			}
		}
	}
}
</style>
