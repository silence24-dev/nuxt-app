<template>
	<el-form
		ref="formRef"
		:model="form"
		label-position="top"
		label-width="120px"
		:rules="rules"
		size="large"
		v-loading="loading"
	>
		<el-form-item prop="email" label="Email" required >
			<el-input v-model.trim="form.email" prefix-icon="Message" />
		</el-form-item>
		<el-form-item label="Пароль" prop="password" required >
			<el-input v-model.trim="form.password" type="password" autocomplete="off" prefix-icon="Lock" />
		</el-form-item>
		<el-form-item label="Подтвердите пароль" prop="checkPass" required >
			<el-input v-model="form.checkPass" type="password" autocomplete="off" prefix-icon="Lock" />
		</el-form-item>
		<el-form-item class="radio-wrapper" prop="privacyPolicy">
			<el-radio :label="true" v-model="form.privacyPolicy"> </el-radio>
			<div class="link-wrapper">
				Принимаю условия
				<nuxt-link class="agr-link" to="/agreement"> Пользовательского соглашения, </nuxt-link>
			</div>
			<span class="w-row">Политики конфиденциальности</span>
		</el-form-item>
		<el-form-item class="btn-wrapper">
			<el-button class="registr-btn" color="#00AC4E" @click.prevent="submitForm(formRef)"
				>Зарегистрироваться</el-button
			>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref } from '@vue/reactivity';
import { registerWithEmail } from '~/composables/useAuth';

const email = ref(null);
const password = ref(null);
const username = ref(null);
const name = ref(null);
const errors = ref(new Map());
const dialogVisible = inject('dialogVisible');

const loading = ref(false);
const formRef = ref<FormInstance>();
const form = reactive<{ email: string; password: string; checkPass: string; privacyPolicy: boolean }>({
	email: '',
	password: '',
	checkPass: '',
	privacyPolicy: null,
});

const validatePass = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('Please input the password'));
	} else {
		if (form.checkPass !== '') {
			if (!formRef.value) return;
			formRef.value.validateField('checkPass', () => null);
		}
		callback();
	}
};
const validatePass2 = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('Please input the password again'));
	} else if (value !== form.password) {
		callback(new Error("Two inputs don't match!"));
	} else {
		callback();
	}
};

const rules = reactive({
	email: [
		{ required: true, message: 'Введите email', trigger: 'blur' },
		{ type: 'email', message: 'Введите корректный email', trigger: ['blur', 'change'] },
	],
	pass: [
		{ validator: validatePass, required: true, message: 'Введите пароль', trigger: 'blur' },
		{ min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] },
	],
	checkPass: [
		{ validator: validatePass2, required: true, message: 'Пароли должны совпадать', trigger: 'blur' },
		{ min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] },
	],
	privacyPolicy: [
		{
			required: true,
			message: 'Please select activity resource',
			trigger: 'change',
		},
	],
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			loading.value = true;
			try {
				//порешать с политокой конфиденциальности
				const formData = {
					email: form.email,
					password: form.password,
					//privacyPolicy: form.privacyPolicy,
				};
				await registerWithEmail(formData.email, formData.password);
				
				ElMessage({
					message: 'Вы успешно зарегистрировались',
					type: 'success',
				});

				formEl.resetFields();
				dialogVisible.value = false;
			} catch (error) {
				console.log('ERROR :>> ', error);
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
.el-form-item.radio-wrapper {
	.el-form-item__content {
		font-size: 10px !important;
		line-height: 14px;
		.w-row {
			margin-left: 30px;
		}
		.el-radio {
			&.el-radio--large {
				height: 0px;
			}
			margin-right: 0;
			.el-radio__label {
				display: none;
			}
		}
		.link-wrapper {
			margin-left: 16px;
			display: flex;
			.agr-link {
				color: #00ac4e;
				margin-left: 3px;
			}
		}
	}
}
.el-form-item__content {
	.registr-btn {
		border-radius: 6px;
		padding: 15px 24px;
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
	}
}
</style>
