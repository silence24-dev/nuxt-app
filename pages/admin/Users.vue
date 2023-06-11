<template>
	<el-form
		ref="formRef"
		:model="form"
		label-width="120px"
		label-position="top"
		:style="{ width: '600px' }"
		rules=""
	>
		<h1>Создать пользователя</h1>

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
			<el-input
				v-model.trim="form.password"
				type="password"
				autocomplete="off"
			/>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click.prevent="submitForm(formRef)"
				>Создать</el-button
			>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { registerWithEmail } from '~~/composables/useAuth';

const loading = ref(false);
const formRef = ref<FormInstance>();
const form = reactive<{ email: string; password: string }>({ email: '', password: '' });

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			loading.value = true;
			try {
				const formData = {
					email: form.email,
					password: form.password,
				};
				// двойные куки
				await registerWithEmail(form.email, form.password)

				ElMessage({
					message: 'Новый пользователь добавлен.',
					type: 'success',
				});

				formEl.resetFields();
				loading.value = false;
			} catch (error) {
				loading.value = false;
			}

			console.log('submit!');
		} else {
			console.log('error submit!');
			return false;
		}
	});
};

definePageMeta({
	title: 'Пользователи',
	layout: 'admin',
	middleware: ['auth'],
});
</script>

<style lang="scss" scoped></style>
