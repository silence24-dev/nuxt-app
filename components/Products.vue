<template>
	<section class="products">
		<div class="container">
			<h2 v-if="products.length > 0">Все товары</h2>
			<h2 v-else>Вы еще не добавили ни одного товара</h2>
			<el-row :gutter="20">
				<el-col :span="6" v-for="(product, index) in products">
					<el-skeleton :loading="loading" animated>
						<template #template>
							<el-skeleton-item variant="image" style="width: 275.5px; height: 199.11px" />
							<el-skeleton-item variant="p" style="width: 50%" />
							<div class="card-content">
								<el-skeleton-item variant="text" />
								<el-skeleton-item variant="text" />
								<div class="card-content__bottom">
									<el-skeleton-item variant="text" />
									<el-skeleton-item variant="text" />
								</div>
							</div>
						</template>
						<template #default>
							<el-card
								@click="
									dialogVisible = true;
									productInModal = product;
								"
							>
								<el-image :src="product.image" />

								<div class="card-content">
									<p>{{ product.name }}</p>
									<p>{{ product.weight }}гр.</p>
									<div class="card-content__bottom">
										<el-button
											color="#00ac4e"
											size="large"
											@click="addProductToCart(product)"
										>
											В корзину
										</el-button>
										<strong>{{ product.price }}₽</strong>
									</div>
								</div>
							</el-card>
						</template>
					</el-skeleton>
				</el-col>
			</el-row>
		</div>
	</section>

	<client-only>
		<el-dialog v-model="dialogVisible" width="800px" align-center append-to-body>
			<el-image :src="productInModal.image">
				<template #error>
					<div class="image-slot">
						<el-icon><Picture /></el-icon>
					</div>
				</template>
			</el-image>
			<p>{{ productInModal.name }}</p>
			<hr />
			<p>{{ productInModal.components }}</p>
			<p>
				вес: <strong>{{ productInModal.weight }}гр.</strong>
			</p>
			<p>
				цена: <strong>{{ productInModal.price }}₽</strong>
			</p>
			<div class="dialog-footer">
				<el-input-number
					v-model="inputValue"
					:min="0"
					:max="99"
					size="large"
					@change="handleChange(inputValue, productInModal)"
				/>
				<el-button color="#00ac4e" class="to-cart" @click="cartStore.addToCart(productInModal)"
					>В корзину
				</el-button>
			</div>
		</el-dialog>
	</client-only>
</template>

<script lang="ts" setup>
import { ElNotification } from 'element-plus';
import { IProduct } from '~~/types/IProduct';

const loading = ref(true);
const cartStore = useCartStore();
const productStore = useProductStore();
const products: IProduct[] = await productStore.getAll();
const dialogVisible = ref(false);
const productInModal = ref();
const inputValue = ref(0);

const addProductToCart = (product) => {
	ElNotification({
		title: 'Успешно',
		message: 'Добавлено в корзину',
		type: 'success',
	});
	cartStore.addToCart(product);
};

onMounted(() => {
	cartStore.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
});

watch(
	cartStore.$state,
	(value) => {
		localStorage.setItem('shoppingCart', JSON.stringify(value.shoppingCart));
	},
	{
		deep: true,
	}
);

function handleChange(inputValue, product) {
	const productInCart = cartStore.shoppingCart.find((item) => item.id === product.id);

	productInCart.amount = inputValue;

	if (inputValue < 1) {
		cartStore.removeFromCart(product);
	}

	cartStore.cartCount = cartStore.shoppingCart.reduce((accum, product) => {
		accum = accum + product.amount;
		return accum;
	}, 0);
}
</script>

<style lang="scss">
.products {
	margin-bottom: 65px;
	h2 {
		margin-bottom: 39px;
	}

	.el-card__body {
		padding: 0;
	}

	.card-content {
		padding: 10px;
		p {
			margin-bottom: 20px;
		}
		&__bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
}
.dialog-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
