<template>
	<div class="page-wrap">
		<client-only>
			<el-form
				ref="formRef"
				:model="form"
				label-width="auto"
				v-loading="loading"
				size="large"
				label-position="top"
			>
				<el-form-item prop="name" label="Название">
					<el-input v-model="form.name" type="input" />
				</el-form-item>
				<el-form-item prop="category" label="Категория">
					<el-input v-model="form.category" type="input" />
				</el-form-item>
				<el-form-item prop="description" label="Описание">
					<el-input v-model="form.description" type="input" />
				</el-form-item>
				<el-form-item prop="composition" label="Состав">
					<el-input v-model="form.components" type="input" />
				</el-form-item>
				<el-form-item prop="imageURL" label="URL-адрес изображения">
					<el-input v-model="form.image" type="input" />
				</el-form-item>
				<el-form-item prop="weight" label="Вес">
					<el-input v-model="form.weight" type="number" />
				</el-form-item>
				<el-form-item prop="price" label="Цена">
					<el-input v-model="form.price" type="number" />
				</el-form-item>
				<el-input v-model="form.id" type="hidden" />
				<el-form-item>
					<el-button type="primary" @click.prevent="submitForm(formRef)">Редактировать</el-button>
				</el-form-item>
			</el-form>
		</client-only>
	</div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useProductStore } from '~~/composables/productStore';
import { IProduct } from '~~/types/IProduct';

const loading = ref(false);
const route = useRoute();
const productStore = useProductStore();
const formRef = ref<FormInstance>();

const products: IProduct[] = await productStore.getAll();
const product: IProduct = products.find((item) => item.id === +route.params.id);

const form = reactive<{
	id: number;
	name: string;
	category: string;
	description: string;
	components: string;
	weight: number;
	price: number;
	image: string;
}>({
	id: product.id || null,
	name: product.name || '',
	category: product.category || '',
	description: product.description || '',
	components: product.components || '',
	weight: product.weight || null,
	price: product.price || null,
	image: product.image || '',
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			const formData = {
				name: form.name,
				category: form.category,
				description: form.description,
				components: form.components,
				image: form.image,
				weight: +form.weight,
				price: +form.price,
				id: +form.id,
			};

			try {
				await ElMessageBox.confirm('Сохранить изменения?', 'Внимание!', {
					confirmButtonText: 'Да',
					cancelButtonText: 'Отмена',
					type: 'warning',
				});

				loading.value = true;
				await productStore.update(form.id, formData);

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
	title: `Редактирование | ${product.name}`,
});

definePageMeta({
	layout: 'admin',
	middleware: ['auth'],
});
</script>

<style lang="scss">
.page-wrap {
	width: 800px;
}
</style>
