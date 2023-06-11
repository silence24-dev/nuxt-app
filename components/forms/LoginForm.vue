<template>
	<el-form
		ref="formRef"
		:model="form"
		label-position="top"
		label-width="120px"
		size="large"
		v-loading="loading"
	>
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
			<el-input v-model.trim="form.email" prefix-icon="Message" />
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
			<el-input v-model.trim="form.password" type="password" autocomplete="off" prefix-icon="Lock" />
		</el-form-item>
		<el-form-item class="btn-wrapper">
			<el-button
				type="info"
				link
				:style="{ color: '#00AC4E', textDecoration: 'underline', marginBottom: '13px' }"
			>
				Забыли пароль?</el-button
			>
			<el-button class="login-btn" color="#00AC4E" @click.prevent="submitForm(formRef)"
				>Войти</el-button
			>
			<el-button class="registr-link" link @click="emit('wantToRegister')">
				Впервые у нас? <span class="green">Зарегистрироваться</span></el-button
			>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref } from '@vue/reactivity';
import { loginWithEmail } from '~/composables/useAuth';

const hasError = ref(null);
const errorMessage = ref(null);
const emit = defineEmits(['wantToRegister']);
const loading = ref(false);
const formRef = ref<FormInstance>();
const form = reactive<{ email: string; password: string }>({ email: null, password: null });
const dialogVisible = inject('dialogVisible');

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

				dialogVisible.value = false;
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
</script>

<style lang="scss">
.el-form-item.btn-wrapper {
	.el-form-item__content {
		flex-direction: column;
		align-items: center;
		.login-btn {
			width: 143px;
			height: 45px;
			border-radius: 6px;
			margin-bottom: 24px;
		}
		.el-button + .el-button {
			margin-left: 0;
		}
		.registr-link {
			color: #000000;
			.green {
				margin-left: 5px;
				color: #00ac4e;
			}
		}
	}
}
</style>
