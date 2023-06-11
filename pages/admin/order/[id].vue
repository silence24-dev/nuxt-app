<template>
	<div class="page-wrap">
		<el-breadcrumb separator="|" :style="{ marginBottom: '1rem' }">
			<el-breadcrumb-item :to="{ path: '/admin/orders' }">Заказ</el-breadcrumb-item>
			<el-breadcrumb-item>ID: {{ order.id }}</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card class="box-card">
			<client-only>
				<el-form ref="formRef" :model="form" label-width="auto" v-loading="loading">
					<el-form-item prop="createdAt" label="Создан">
						<el-input v-model="order.createdAt" type="text" disabled />
					</el-form-item>
					<el-form-item label="Улица" prop="street">
						<el-input v-model="form.address[0].street" type="text" />
					</el-form-item>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="Дом" prop="building">
								<el-input
									v-model.trim="form.address[0].building"
									type="number"
								/> </el-form-item
						></el-col>
						<el-col :span="12">
							<el-form-item label="Подъезд" prop="entrance">
								<el-input
									v-model.trim="form.address[0].entrance"
									type="number"
								/> </el-form-item
						></el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="Этаж" prop="floor">
								<el-input v-model.trim="form.address[0].floor" type="number" /> </el-form-item
						></el-col>
						<el-col :span="12">
							<el-form-item label="Квартира" prop="apartment">
								<el-input
									v-model.trim="form.address[0].apartment"
									type="number"
								/> </el-form-item
						></el-col>
					</el-row>
					<el-form-item prop="products" label="Продукты:">
						<el-row :gutter="20" v-for="product in form.products"
							><el-col :span="24"
								><div class="product-info" v-if="product.amount > 0">
									<div class="product-info__item">
										{{ product.name }}
									</div>
									<div class="product-info__item">
										<el-input-number
											v-model="product.amount"
											:min="0"
											:max="99"
											controls-position="right"
											size="small"
											@change="handleChange"
										/>
									</div>
									<div class="product-info__item">
										<el-button
											type="danger"
											:icon="Delete"
											circle
											@click="handleDelete(product)"
										/>
									</div>
								</div> </el-col
						></el-row>
					</el-form-item>
					<el-form-item prop="payment" label="Оплата">
						<el-input v-model="form.payment" type="text" />
					</el-form-item>
					<el-form-item prop="price" label="Цена">
						<el-input v-model="form.total" type="number" />
					</el-form-item>
					<el-form-item prop="comment" label="Комментарий">
						<el-input v-model="form.comment" type="text" />
					</el-form-item>
					<el-form-item prop="status" label="Статус">
						// смысл изменять статус доставки?
						<el-switch
							v-model="form.isDelivered"
							class="mt-2"
							style="margin-left: 24px"
							inline-prompt
							:active-icon="Check"
							:inactive-icon="Close"
						/>
					</el-form-item>
					<el-input v-model="order.id" type="hidden" />
					<el-form-item>
						<el-button type="primary" @click.prevent="submitForm(formRef)">Сохранить</el-button>
						<el-button>Отменить заказ</el-button>
					</el-form-item>
				</el-form>
			</client-only>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Check, Close } from '@element-plus/icons-vue';
import { IOrder } from '~~/types/IOrder';

const loading = ref(false);
const route = useRoute();
const orderStore = useOrderStore();
const formRef = ref<FormInstance>();

const orders: IOrder[] = await orderStore.getAll();
const order: IOrder = orders.find((item) => item.id === +route.params.id);

const handleDelete = (product) => {
	console.log('product :>> ', product);
};

const handleChange = (currentValue: number, oldValue: number) => {
	if (currentValue === 0 && oldValue === 1) {
		//messageStore.createMessage('Вы точно хотите удалить продукт из заказа?', 'Внимание');
	}
	console.log('currentValue :>> ', currentValue);
	console.log('oldValue :>> ', oldValue);
};

const form = reactive<{
	payment: string;
	isDelivered: boolean;
	total: number;
	comment: string;
	address: object;
	products: object;
}>({
	payment: order.payment || null,
	isDelivered: order.isDelivered || false,
	total: order.total || null,
	comment: order.comment || null,
	address: order.address || null,
	products: order.products || null,
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			const formData = {
				payment: form.payment,
				products: form.products,
				address: form.address,
				comment: form.comment,
				total: form.total,
				status: form.isDelivered ? 'finished' : 'active',
			};
			console.log('formData :>> ', formData);
			try {
				await ElMessageBox.confirm('Сохранить изменения?', 'Внимание!', {
					confirmButtonText: 'Да',
					cancelButtonText: 'Отмена',
					type: 'warning',
				});

				loading.value = true;
				await orderStore.update(order.id, formData);

				ElMessage({
					type: 'success',
					message: 'Сохранено',
				});
				loading.value = false;
			} catch (error) {
				loading.value = false;

				ElMessage({
					type: 'info',
					message: 'Отмена',
				});
			}

			console.log('submit!');
		} else {
			console.log('error submit!');
			return false;
		}
	});
};

useHead({
	title: `Редактирование | ${order.id}` || '',
});

definePageMeta({
	layout: 'admin',
	middleware: ['auth'],
});
</script>

<style lang="scss">
.page-wrap {
	width: 800px;
	.el-col {
		.product-info {
			display: flex;
			&__item {
				margin: 0 5px;
			}
		}
	}
}
</style>
