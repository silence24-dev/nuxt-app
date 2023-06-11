<template>
	<div class="profile">
		<div class="container">
			<el-tabs class="profile-tabs">
				<el-tab-pane lazy v-loading="loading">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon size="30px"><User /></el-icon>
							<span>Личные данные</span>
						</span>
					</template>
					<el-form
						ref="formRef"
						:model="form"
						:rules="rules"
						label-width="120px"
						class="profile-form"
						:size="formSize"
						status-icon
						label-position="top"
					>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item prop="avatar" class="avatar-item">
									<el-upload
										class="avatar-uploader"
										action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
										:show-file-list="false"
										:on-success="handleAvatarSuccess"
										:before-upload="beforeAvatarUpload"
									>
										<img v-if="imageUrl" :src="imageUrl" class="avatar" />
										<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
									</el-upload>
									<span>Загрузить фотографию</span>
								</el-form-item>
								<el-form-item label="Ваше имя" prop="name">
									<el-input v-model="form.name" />
								</el-form-item>
								<el-form-item label="Адрес электронной почты" prop="email">
									<el-input v-model="form.email" />
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<h5>Контактная информация (подтверждение заказов)</h5>
								<el-form-item label="Телефон" prop="phone">
									<el-input v-model="form.phone" />
								</el-form-item>
								<h5>Изменение пароля</h5>
								<el-form-item label="Ваш старый пароль" prop="password">
									<el-input
										v-model="form.password"
										type="password"
										show-password
										placeholder="Старый пароль"
									/>
								</el-form-item>
								<el-form-item label="Ваш новый пароль" prop="newPass">
									<el-input
										v-model="form.newPass"
										type="password"
										show-password
										placeholder="Новый пароль"
									/>
								</el-form-item>
								<el-form-item label="Подтверждение" prop="checkPass">
									<el-input
										v-model="form.checkPass"
										type="password"
										show-password
										placeholder="Подтвердите пароль"
									/>
								</el-form-item>
								<el-input v-model="form.id" type="hidden" />
								<el-form-item>
									<el-button color="#00ac4e" @click.prevent="submitForm(formRef)"
										>Сохранить изменения</el-button
									>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane lazy v-loading="loading">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon size="30px"><Document /></el-icon>
							<span>История заказов</span>
						</span>
					</template>
					<el-row>
						<el-col :span="24">
							<div class="profile-table">
								<el-table :data="userOrders" border style="width: 100%">
									<el-table-column type="expand">
										<template #default="props">
											<div m="4">
												<p m="t-0 b-2">Улица: {{ props.row.address[0].street }}</p>
												<p m="t-0 b-2">Дом: {{ props.row.address[0].building }}</p>
												<p m="t-0 b-2">
													Подъезд: {{ props.row.address[0].entrance }}
												</p>
												<p m="t-0 b-2">Floor: {{ props.row.address[0].floor }}</p>
												<h3>Заказ</h3>
												<el-table :data="props.row.products" :border="true">
													<el-table-column label="Наименование" prop="name" />
													<el-table-column label="Количество" prop="amount" />
												</el-table>
											</div>
										</template>
									</el-table-column>
									<el-table-column label="Дата" prop="createdAt" />
								</el-table>
							</div>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules, UploadProps } from 'element-plus';

definePageMeta({
	title: 'Профиль',
});

const user = useState('user');

const userStore = useUserStore();
const orderStore = useOrderStore();
const orders = await orderStore.getAll();
const userOrders = orders.filter((order) => order.userId === user.value.id);

const cartStore = useCartStore();

onMounted(() => {
	//cartStore.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
});

const loading = ref(false);
const imageUrl = ref('');
const formSize = ref('default');
const formRef = ref<FormInstance>();
const form = reactive<{
	id: number;
	name: string;
	email: string;
	password: string;
	checkPass: string;
	newPass: string;
	phone: string;
}>({
	id: user.value.id,
	name: user.value.name,
	email: user.value.email,
	phone: user.value.phone,
	password: '',
	newPass: '',
	checkPass: '',
});

const validatePass = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('Пожалуйста введите пароль'));
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
		callback(new Error('Пожалуйста введите пароль'));
	} else if (value !== form.password) {
		callback(new Error('Пароли должны совпадать!'));
	} else {
		callback();
	}
};

const validatePhone = (rule: any, value: any, callback: any) => {
	const regex = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
	if (value === '') {
		callback(new Error('Пожалуйста введите номер вашего телефона'));
	} else if (!regex.test(value)) {
		callback(new Error('Введите корректный номер'));
	} else {
		callback();
	}
};

const rules = reactive({
	name: [
		{ message: 'Пожалуйста укажите ваше имя', trigger: 'blur' },
		{ min: 2, max: 50, message: 'Минимальная длина имени 2 символа', trigger: 'blur' },
	],
	email: [{ type: 'email', message: 'Введите корректный email', trigger: ['blur', 'change'] }],
	password: [
		{ validator: validatePass, required: true, message: 'Введите текущий пароль', trigger: 'blur' },
		{ min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] },
	],
	newPass: [
		{ validator: validatePass, required: true, message: 'Введите новый пароль', trigger: 'blur' },
		{ min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] },
	],
	checkPass: [
		{ validator: validatePass2, required: true, message: 'Пароли должны совпадать', trigger: 'blur' },
		{ min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: ['blur', 'change'] },
	],
	phone: [
		{
			validator: validatePhone,
			message: 'Пожалуйста укажите ваш номер телефона',
			trigger: 'change',
		},
	],
});

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw!);
	console.log('imageUrl.value :>> ', imageUrl.value);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	if (rawFile.type !== 'image/jpeg') {
		ElMessage.error('Avatar picture must be JPG format!');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!');
		return false;
	}
	return true;
};

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			//&& image.value
			const formData = {
				name: form.name,
				email: form.email,
				phone: form.phone,
				password: form.newPass,
				//image: image.value,
				id: form.id,
			};

			try {
				loading.value = true;
				await ElMessageBox.confirm('Сохранить?', 'Внимание!', {
					confirmButtonText: 'Да',
					cancelButtonText: 'Отмена',
					type: 'warning',
				});

				//const data = await updateUserProfile(formData);
				const data = await userStore.updateProfile(formData);
				console.log('data :>> ', data);
				ElMessage({
					type: 'success',
					message: 'Сохранено',
				});

				await navigateTo('/profile');
			} catch (error) {
				console.log('error :>> ', error);

				ElMessage({
					type: 'info',
					message: 'Отмена',
				});
			} finally {
				loading.value = false;
			}

			console.log('submit!');
			// image.value = null;
			// upload.value.clearFiles();
			formEl.resetFields();
		} else {
			console.log('error submit!', fields);
			ElMessage({
				type: 'error',
				message: 'Не удалось сохранить',
			});
			return false;
		}
	});
};
</script>

<style lang="scss">
.avatar-uploader .avatar {
	width: 78px;
	height: 78px;
	display: block;
}
</style>

<style lang="scss">
.orders-list {
	font-size: 18px;
	font-weight: 500;
}
.orders-list-item {
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	border-top: 1px solid #6b778c;

	&:last-child {
		border-bottom: 1px solid #6b778c;
	}
	strong {
		margin-left: 10px;
	}
	.orders-list-item__date {
	}
	.orders-list-item__total {
	}
	.orders-list-item__status {
	}
	.orders-list-item__btn {
		.el-button {
			font-size: 14px;
			font-weight: 500;
			.el-icon {
				color: #00ac4e;
				font-size: 20px;
				margin-right: 5px;
			}
		}
	}
}
.el-dropdown-menu__item {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	padding: 5px 15px;
	font-size: 16px !important;

	.dropdown-item__img {
		max-width: 100px;
		img {
			width: 100%;
		}
	}
	.dropdown-item__name {
		text-align: left;
	}
	.dropdown-item__amount {
	}
	.dropdown-item__price {
	}
}

.profile {
	.el-tabs__header .el-tabs__item.is-active {
		color: #00ac4e;
	}

	.el-tabs__header .el-tabs__item:not(.is-active):hover {
		color: #00ac4e;
	}
	.el-tabs__active-bar {
		background-color: #00ac4e;
	}
	h5 {
		font-size: 28px;
		line-height: 25px;
		color: #000000;
		margin-bottom: 30px;
	}
	.avatar-item {
		span {
			margin-left: 18px;
			font-size: 18px;
			line-height: 32px;
			text-decoration-line: underline;
			color: #00ac4e;
		}
	}
	label {
		font-weight: 400;
		font-size: 19px;
		line-height: 34px;
		color: #000000;
	}
	.profile-table {
		.el-table__row {
			border: 1px solid #ebebeb;
		}
		.amount {
			width: 114px;
			height: 41px;
			background: #fcfcfc;
			border: 1px solid #ebebeb;
			border-radius: 9px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 400;
			font-size: 13px;
			line-height: 19px;
			color: #000000;
		}
	}
	.order-info__row {
		font-weight: 400;
		font-size: 19.4096px;
		line-height: 29px;
		strong {
			margin-right: 9px;
		}
		.status {
			color: #eb5757;
		}
		.status.success {
			color: #00ac4e;
		}
	}
}

.profile-tabs > .el-tabs__content {
	padding: 30px 5px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
.profile-tabs .custom-tabs-label .el-icon {
	vertical-align: middle;
}
.profile-tabs .custom-tabs-label span {
	vertical-align: middle;
	margin-left: 4px;
}
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: #00ac4e;
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #00ac4e;
	width: 78px;
	height: 78px;
	text-align: center;
}
</style>
