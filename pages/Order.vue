<template>
	<div class="order" v-loading="loading">
		<div class="container">
			<el-tabs v-model="activeName" class="order-tabs">
				<el-tab-pane name="delivery">
					<template #label>
						<span class="tabs-label">
							<el-icon><Van /></el-icon>
							<span>Доставка</span>
						</span>
					</template>
					<el-row :gutter="20">
						<el-col :span="12" class="col-form">
							<ClientOnly>
								<el-form
									:model="deliveryForm"
									ref="deliveryFormRef"
									:rules="deliveryFormRules"
									label-width="120px"
									label-position="top"
									size="large"
								>
									<el-form-item label="Ваше имя" prop="name" required>
										<el-input v-model="deliveryForm.name" type="text" />
									</el-form-item>
									<el-form-item label="Телефон" prop="phone" required>
										<el-input
											v-model.trim="deliveryForm.phone"
											placeholder="+7"
											type="text"
											prefix-icon="PhoneFilled"
										/>
									</el-form-item>
									<el-form-item label="Улица" prop="street" required>
										<el-input v-model="deliveryForm.street" type="text" />
									</el-form-item>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="Дом" prop="building" required>
												<el-input
													v-model.trim="deliveryForm.building"
													type="number"
												/> </el-form-item
										></el-col>
										<el-col :span="12">
											<el-form-item label="Подъезд" prop="entrance" required>
												<el-input
													v-model.trim="deliveryForm.entrance"
													type="number"
												/> </el-form-item
										></el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="Этаж" prop="floor" required>
												<el-input
													v-model.trim="deliveryForm.floor"
													type="number"
												/> </el-form-item
										></el-col>
										<el-col :span="12">
											<el-form-item label="Квартира" prop="apartment" required>
												<el-input
													v-model.trim="deliveryForm.apartment"
													type="number"
												/> </el-form-item
										></el-col>
									</el-row>
									<el-form-item label="Домофон не работает">
										<el-switch v-model="deliveryForm.doorphone" />
									</el-form-item>
									<el-form-item label="Способ оплаты" prop="payment">
										<el-radio-group v-model="deliveryForm.payment">
											<el-radio label="Курьеру наличными" />
											<el-radio label="Курьеру банковской картой" />
										</el-radio-group>
									</el-form-item>
									<el-form-item label="Комментарий к заказу (необязательно)" prop="comment">
										<el-input v-model="deliveryForm.comment" type="textarea" />
									</el-form-item>
									<el-input type="hidden" v-model="deliveryForm.userId"></el-input>
								</el-form>
							</ClientOnly>
						</el-col>
						<!-- <el-col :span="12" class="col-sidebar">
							<div class="order-sidebar">
								<h2>Вы заказали:</h2>
								<p class="order-item" v-for="product in cartStore.shoppingCart">
									{{ product.name }}
									<strong>x{{ product.amount }}</strong>
								</p>
								<hr />
								<p>Доставка <strong>0₽</strong></p>
								<p>
									Итого к оплате <strong>{{ totalSum }}₽</strong>
								</p>
								<div class="sidebar-bottom">
									<el-button
										color="#00AC4E"
										@click.prevent="submitDeliveryForm(deliveryFormRef)"
										>Оформить заказ</el-button
									>
								</div>
							</div>
						</el-col> -->
					</el-row>
				</el-tab-pane>
				<el-tab-pane name="pickup">
					<template #label>
						<span class="tabs-label">
							<el-icon><OfficeBuilding /></el-icon>
							<span>Самовывоз (-10%)</span>
						</span>
					</template>
					<el-row :gutter="20">
						<el-col :span="12" class="col-form">
							<ClientOnly>
								<el-form
									:model="pickupForm"
									ref="pickupFormRef"
									:rules="pickupFormRules"
									label-width="120px"
									label-position="top"
									size="large"
								>
									<el-form-item label="Ваше имя" prop="name" required>
										<el-input v-model.trim="pickupForm.name" type="text" />
									</el-form-item>
									<el-form-item label="Телефон" prop="phone" required>
										<el-input
											v-model.trim="pickupForm.phone"
											placeholder="+7"
											type="text"
											prefix-icon="PhoneFilled"
										/>
									</el-form-item>
									<el-form-item prop="time" required>
										<el-time-select
											v-model="pickupForm.time"
											:start="'11:00'"
											step="00:30"
											end="23:59"
											placeholder="Выберите время"
											format="ddd, D MMM, HH:mm"
											size="large"
										/>
									</el-form-item>
								</el-form>
							</ClientOnly>
						</el-col>
						<el-col :span="12" class="col-sidebar">
							<!-- <div class="order-sidebar">
								<h2>Вы заказали:</h2>
								<p class="order-item" v-for="product in cartStore.shoppingCart">
									{{ product.name }}
									<strong>x{{ product.amount }}</strong>
								</p>
								<hr />
								<p>
									Доставка
									<strong style="color: #00ac4e">-{{ (totalSum / 100) * 10 }}₽</strong>
								</p>
								<p>
									Итого к оплате
									<strong>{{ totalSum - (totalSum / 100) * 10 }}₽</strong>
								</p>
								<div class="sidebar-bottom">
									<el-button
										color="#00AC4E"
										@click.prevent="submitPickupForm(pickupFormRef)"
										>Оформить заказ</el-button
									>
								</div>
							</div> -->
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

const userStore = useUserStore();
const loading = ref(false);

definePageMeta({
	title: 'Оформление заказа',
});

const cartStore = useCartStore();
const orderStore = useOrderStore();
const activeName = ref('delivery');
const deliveryFormRef = ref<FormInstance>();
const pickupFormRef = ref<FormInstance>();

const deliveryForm = reactive<{
	userId: number;
	name: string;
	phone: string;
	street: string;
	building: number;
	entrance: number;
	comment: string;
	apartment: number;
	doorphone: boolean;
	payment: string;
	floor: number;
}>({
	userId: 0,
	name: '',
	phone: '+7',
	street: '',
	building: 0,
	entrance: 0,
	floor: 0,
	apartment: 0,
	doorphone: false,
	payment: '',
	comment: '',
});

const pickupForm = reactive<{
	name: string;
	phone: string;
	time: string;
}>({
	name: '',
	phone: '+7',
	time: '',
});

// wtf
const validatePhone = (rule: any, value: any, cb: any) => {
	const regex = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
	if (value === '') {
		cb(new Error('Укажите ваш номер телефона'));
	} else if (!regex.test(value)) {
		cb(new Error('Вы указали неверный номер телефона!'));
	} else {
		cb();
	}
};

const deliveryFormRules = reactive<FormRules>({
	name: [
		{
			required: true,
			message: 'Пожалуйста укажите ваше имя',
			trigger: 'blur',
		},
		{
			min: 2,
			max: 50,
			message: 'Минимальная длина имени 2 символа',
			trigger: 'blur',
		},
	],
	phone: [
		{
			validator: validatePhone,
			required: true,
			message: 'Пожалуйста укажите ваш номер телефона',
			trigger: 'change',
		},
	],
	street: [
		{
			required: true,
			message: 'Пожалуйтста укажите улицу',
			trigger: 'change',
		},
		{
			min: 3,
			message: 'Минимальное количество символов 3',
			trigger: 'blur',
		},
	],
	building: [
		{
			required: true,
			message: 'Пожалуйста укажите дом',
			trigger: 'change',
		},
		{
			min: 1,
			message: 'Минимальное количество символов 1',
			trigger: 'blur',
		},
	],
	entrance: [
		{
			required: true,
			message: 'Пожалуйста укажите подъезд',
			trigger: 'change',
		},
		{
			min: 1,
			message: 'Минимальное количество символов 1',
			trigger: 'blur',
		},
	],
	floor: [
		{
			required: true,
			message: 'Пожалуйста укажите этаж',
			trigger: 'change',
		},
		{
			min: 1,
			message: 'Минимальное количество символов 1',
			trigger: 'blur',
		},
	],
	apartment: [
		{
			required: true,
			message: 'Пожалуйста укажите квартиру',
			trigger: 'change',
		},
		{
			min: 1,
			message: 'Минимальное количество символов 1',
			trigger: 'blur',
		},
	],
	doorphone: [
		{
			required: false,
			trigger: 'change',
		},
	],
	payment: [
		{
			required: false,
			trigger: 'change',
		},
	],
	comment: [
		{
			required: false,
			trigger: 'change',
		},
		{
			max: 1000,
			trigger: 'blur',
		},
	],
});

const pickupFormRules = reactive<FormRules>({
	name: [
		{
			required: true,
			message: 'Пожалуйста укажите ваше имя',
			trigger: 'blur',
		},
		{
			min: 2,
			max: 50,
			message: 'Минимальная длина имени 2 символа',
			trigger: 'blur',
		},
	],
	phone: [
		{
			validator: validatePhone,
			required: true,
		},
	],
	time: [
		{
			required: true,
			message: 'Пожалуста укажите время',
			trigger: 'change',
		},
	],
});

const submitDeliveryForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid && cartStore.shoppingCart.length > 0) {
			const formData = {
				address: {
					street: deliveryForm.street,
					building: deliveryForm.building,
					entrance: +deliveryForm.entrance,
					apartment: +deliveryForm.apartment,
					floor: +deliveryForm.floor,
					doorphone: deliveryForm.doorphone,
				},
				userId: deliveryForm.userId,
				name: deliveryForm.name,
				payment: deliveryForm.payment,
				comment: deliveryForm.comment,
				status: 'ожидание',
				total: totalSum.value,
				products: cartStore.shoppingCart.map((product) => {
					return {
						id: product.id,
						name: product.name,
						amount: product.amount,
						price: product.price,
					};
				}),
			};

			await orderStore.create(formData);
			await userStore.updateProfile({ address: formData.address, name: formData.name });
			try {
				loading.value = true;
				ElMessage({
					type: 'success',
					message: 'Ваш заказ принят',
				});
			} catch (error) {
				console.log('Error from order form', error);
			} finally {
				loading.value = false;
			}

			console.log('submit!');

			formEl.resetFields();
			cartStore.shoppingCart = [];
			cartStore.cartCount = 0;
			//navigateTo('/');
		} else {
			console.log('error submit!');
			ElMessage({
				type: 'error',
				message: 'Произошла ошибка',
			});
			return false;
		}
	});
};

const submitPickupForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid && cartStore.shoppingCart.length > 0) {
			const formData = {
				name: pickupForm.name,
				phone: pickupForm.phone,
				time: pickupForm.time,
				isDelivery: true,
				totalPrice: totalSum.value - (totalSum.value / 100) * 10,
				order: cartStore.shoppingCart.map((product) => {
					return {
						name: product.name,
						amount: product.amount,
						price: product.amount * product.price,
					};
				}),
			};
			console.log('formData :>> ', formData);
			try {
				loading.value = true;
				ElMessage({
					type: 'success',
					message: 'Ваш заказ принят',
				});
			} catch (error) {
				console.log('Error from order form', error);
			} finally {
				loading.value = false;
			}

			console.log('submit!');

			formEl.resetFields();
			cartStore.shoppingCart = [];
			cartStore.cartCount = 0;
			//navigateTo('/');
		} else {
			console.log('error submit!');
			ElMessage({
				type: 'error',
				message: 'Произошла ошибка',
			});
			return false;
		}
	});
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
		sum += +product.amount * product.price;
	}

	return sum;
});
</script>

<style lang="scss">
.order-tabs {
	margin-top: 20px;
	.el-tabs__header {
		margin-bottom: 39px;
	}
	.tabs-label {
		font-size: 18px;
		.el-icon {
			vertical-align: middle;
			font-size: 20px;
		}
		span {
			vertical-align: middle;
			margin-left: 4px;
		}
	}
	.el-tabs__item:hover,
	.el-tabs__item.is-active {
		color: #00ac4e;
	}
	.el-tabs__active-bar {
		background-color: #00ac4e;
	}

	.order-sidebar {
		width: 100%;
		background: #ffffff;
		box-shadow: 0px 2px 12px rgb(81 151 181 / 12%);
		border: 1px solid #e5e5e5;
		border-radius: 15px;
		padding: 30px;
		hr {
			height: 1px;
			background-color: #e5e5e5;
			margin-top: 40px;
			margin-bottom: 10px;
		}
		h2 {
			margin-bottom: 39px;
			font-size: 20px;
			font-weight: 700;
			border-bottom: 1px solid #e5e5e5;
		}
		p {
			margin-bottom: 15px;
			display: flex;
			justify-content: space-between;
		}
		.order-item {
			font-size: 17px;
			font-weight: 400;
		}
		.sidebar-bottom {
			text-align: right;
			.el-button {
				color: #ffffff;
				font-size: 20px;
				font-weight: 700;
				padding: 24px 24px;
				margin-top: 15px;
			}
		}
	}
	.col-form {
		padding-right: 30px !important;
		padding-left: 30px !important;
	}

	.el-form {
		.el-select .el-input.is-focus .el-input__wrapper,
		.el-input__wrapper.is-focus {
			box-shadow: 0 0 0 1px #00ac4e inset !important;
		}

		.el-form-item__label {
			font-size: 16px;
		}
		.el-input__prefix {
			font-size: 16px;
		}
		.el-radio__input.is-checked .el-radio__inner,
		.el-switch.is-checked .el-switch__core {
			border-color: #00ac4e;
			background-color: #00ac4e;
		}
		.el-radio__inner:hover {
			border-color: #00ac4e;
		}
		.el-radio__input.is-checked + .el-radio__label {
			color: #00ac4e;
		}
	}

	@media (max-width: 768px) {
		.col-form,
		.col-sidebar {
			max-width: 100%;
			flex: 0 0 100%;
		}
		.col-sidebar {
			padding-right: 30px !important;
			padding-left: 30px !important;
		}
	}

	@media (max-width: 560px) {
		.col-form,
		.col-sidebar {
			padding-right: 15px !important;
			padding-left: 15px !important;
		}
	}

	@media (max-width: 410px) {
		.el-tabs__item {
			padding: 0 10px;
		}
		.tabs-label {
			font-size: 16px;
		}
	}

	@media (max-width: 350px) {
		.tabs-label {
			.el-icon {
				font-size: 18px;
			}
		}
	}
}
</style>
