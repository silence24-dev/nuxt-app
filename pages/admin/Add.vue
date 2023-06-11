<template>
	<el-row>
		<el-col :span="12">
			<el-form
				ref="formRef"
				:model="form"
				label-width="auto"
				v-loading="loading"
				:rules="rules"
				label-position="top"
				size="large"
			>
				<el-form-item prop="name" label="Название">
					<el-input v-model="form.name" type="text" />
				</el-form-item>
				<el-form-item prop="category" label="Категория">
					<el-input v-model="form.category" type="text" />
				</el-form-item>
				<el-form-item prop="description" label="Описание">
					<el-input v-model="form.description" type="text" />
				</el-form-item>
				<el-form-item prop="composition" label="Состав">
					<el-input v-model="form.components" type="text" />
				</el-form-item>
				<el-form-item prop="weight" label="Вес">
					<el-input v-model="form.weight" type="number" />
				</el-form-item>
				<el-form-item prop="price" label="Цена">
					<el-input v-model="form.price" type="number" />
				</el-form-item>
				<el-upload
					drag
					action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
					:auto-upload="false"
					ref="upload"
					:accept="'image/*'"
					list-type="picture"
					name="image"
					:on-change="handleImageChange"
				>
					<el-icon class="el-icon--upload">
						<upload-filled />
					</el-icon>
					<div class="el-upload__text">Перетащите файл сюда <em>или нажмите</em></div>
					<template #tip>
						<div class="el-upload__tip">файлы с расширением jpg/png не более 500kb</div>
					</template>
				</el-upload>
				<el-form-item>
					<el-button type="success" @click="dialogVisible = true">Предросмотр</el-button>
					<el-button type="primary" @click.prevent="submitForm(formRef)">Добавить</el-button>
				</el-form-item>
			</el-form>
			<client-only>
				<el-dialog v-model="dialogVisible" title="Предросмотр" width="300px" append-to-body center>
					<el-card>
						<el-image
							:src="'https://cc.tvbs.com.tw/img/program/upload/2018/07/18/20180718184924-868091a2.jpg'"
							fit="cover"
						/>
						<div class="card-content">
							<p>{{ form.name }}</p>
							<hr />
							<p>{{ form.description }}</p>
							<p>{{ form.price }} ₽</p>
							<p>{{ form.weight }}гр.</p>
						</div>
						<el-button type="success" disabled>В корзину</el-button>
					</el-card>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialogVisible = false">Отмена</el-button>
							<el-button type="primary" @click.prevent="submitForm(formRef)"
								>Сохранить</el-button
							>
						</span>
					</template>
				</el-dialog>
			</client-only>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, UploadInstance } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';

const productStore = useProductStore();
const dialogVisible = ref(false);
const loading = ref(false);
const route = useRoute();
const upload = ref<UploadInstance>();
const formRef = ref<FormInstance>();

const image = ref(null);
const form = reactive<{
	name: string;
	category: string;
	description: string;
	components: string;
	weight: number;
	price: number;
}>({
	name: null,
	category: null,
	description: null,
	components: null,
	weight: null,
	price: null,
});

const rules = reactive<FormRules>({
	name: [
		{
			required: true,
			message: 'Необходимо добавить название блюда',
			trigger: 'blur',
		},
		{
			min: 3,
			max: 50,
			message: 'Минимальная длина названия 3 символа',
			trigger: 'blur',
		},
	],
	description: [
		{
			required: true,
			message: 'Необходимо добавить описание блюда',
			trigger: 'change',
		},
		{
			min: 3,
			max: 500,
			message: 'Минимальная длина описания 3 символа',
			trigger: 'blur',
		},
	],
	components: [
		{
			required: true,
			message: 'Необходимо добавить состав блюда',
			trigger: 'change',
		},
		{
			min: 3,
			max: 500,
			message: 'Минимальная длина состава 3 символа',
			trigger: 'blur',
		},
	],
	category: [
		{
			required: true,
			message: 'Необходимо добавить категорию',
			trigger: 'change',
		},
		{
			min: 3,
			max: 50,
			message: 'Минимальная длина категорий 3 символа',
			trigger: 'blur',
		},
	],
	weight: [
		{
			required: true,
			message: 'Необходимо добавить вес блюда',
			trigger: 'change',
		},
		{
			min: 2,
			max: 50,
			message: 'Минимальное число 2 символа',
			trigger: 'blur',
		},
	],
	price: [
		{
			required: true,
			message: 'Необходимо добавить цену блюда',
			trigger: 'change',
		},
		{
			min: 2,
			max: 50,
			message: 'Минимальное число 2 символа',
			trigger: 'blur',
		},
	],
});

const handleImageChange = (uploadFile, uploadFiles) => {
	image.value = uploadFile.raw;
};

const submitForm = (formEl: FormInstance | undefined) => {
	dialogVisible.value = false;
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid && image.value) {
			const fd = new FormData();

			const formData = {
				name: form.name,
				category: form.category,
				components: form.components,
				description: form.description,
				weight: form.weight,
				price: form.price,
				image: 'https://chocomir.com/wp-content/uploads/2019/08/svinoj-stejk-8-1024x576.jpg',
			};

			const imgBlob = new Blob([image.value], { type: 'image/jpeg' });
			fd.append('name', form.name);
			fd.append('category', form.category);
			fd.append('description', form.description);
			fd.append('components', form.components);
			fd.append('weight', form.weight);
			fd.append('price', form.price);
			fd.append('image', imgBlob, image.value.name);

			try {
				loading.value = true;
				await ElMessageBox.confirm('Вы точно хотите добавить блюдо?', 'Внимание!', {
					confirmButtonText: 'Да',
					cancelButtonText: 'Отмена',
					type: 'warning',
				});

				await productStore.create(fd);

				ElMessage({
					type: 'success',
					message: 'Сохранено',
				});

				await navigateTo('/admin/menu');
			} catch (error) {
				loading.value = false;

				ElMessage({
					type: 'info',
					message: 'Отмена',
				});
			} finally {
				loading.value = false;
			}

			image.value = null;
			upload.value.clearFiles();
			formEl.resetFields();
		} else {
			ElMessage({
				type: 'error',
				message: 'Не удалось сохранить',
			});
			return false;
		}
	});
};

definePageMeta({
	layout: 'admin',
	title: 'Добавление блюда',
	middleware: ['auth'],
});
</script>

<style lang="scss"></style>
