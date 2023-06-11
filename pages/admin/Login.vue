<template>
	<el-card shadow="always" :style="{ width: '500px' }" v-loading="loading">
		<client-only>
			<el-form ref="formRef" :model="form" label-width="120px">
				<el-form-item
					prop="email"
					label="Email"
					:rules="[
						{
							required: true,
							message: 'Введите email',
							trigger: 'blur',
						},
						{
							type: 'email',
							message: 'Введите корректный email',
							trigger: ['blur', 'change'],
						},
					]"
				>
					<el-input v-model.trim="form.email" />
				</el-form-item>
				<el-form-item
					label="Пароль"
					prop="password"
					:rules="[
						{
							required: true,
							message: 'Введите пароль',
							trigger: 'blur',
						},
						{
							min: 6,
							message: 'Пароль должен быть не менее 6 символов',
							trigger: ['blur', 'change'],
						},
					]"
				>
					<el-input v-model.trim="form.password" type="password" autocomplete="off" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.prevent="submitForm(formRef)">Submit</el-button>
				</el-form-item>
			</el-form>
		</client-only>
	</el-card>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { loginWithEmail } from '~/composables/useAuth';

const route = useRoute();
const loading = ref(false);
const formRef = ref<FormInstance>();
const form = reactive<{ email: string; password: string }>({ email: null, password: null });
const hasError = ref(null);
const errorMessage = ref(null);

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			loading.value = true;

			try {
				const res = await loginWithEmail(form.email, form.password);
				if (!res) {
					errorMessage.value = 'Invalid Credentials';
					hasError.value = true;
					setTimeout(() => {
						hasError.value = false;
					}, 3000);
				}

				ElMessage({
					message: 'Добро пожаловать.',
					type: 'success',
				});

				formEl.resetFields();
			} catch (error) {
				console.log('Error :>> ', error);
			} finally {
				loading.value = false;
			}

			console.log('submit!');
		} else {
			console.log('error submit!');
			return false;
		}
	});
};

onMounted(() => {
	const { message } = route.query;

	switch (message) {
		case 'login':
			ElMessage({
				message: 'Вам необходимо авторизоваться!',
				type: 'warning',
			});
			break;
		case 'logout':
			ElMessage({
				message: 'Вы успешно вышли из системы.',
				type: 'success',
			});
			break;
	}
});

definePageMeta({
	title: 'Авторизация',
	layout: 'empty',
});
</script>

<style lang="scss" scoped></style>
