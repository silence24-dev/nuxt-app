<template>
	<div class="guestbook">
		<div class="container">
			<el-row justify="center">
				<el-col :span="12">
					<h1>Книга отзывов и предложений</h1>
					<p>
						Дорогой гость! Мы рады тому, что вы решили донести свое мнение о наших блюдах и
						сервисе, ведь этим вы помогаете ежедневно совершенствоваться, работать над ошибками и
						приумножать наши плюсы.
					</p>
					<p>
						Для того чтобы мы могли быстрее разобраться в ситуации, пожалуйста, прикладывайте
						фотографии блюд и подробно описывайте произошедшие события. Этим самым вы помогаете
						эффективнее бороться с нарушениями.
					</p>
					<client-only>
						<el-form :model="form" :rules="rules" ref="formRef" size="large">
							<el-form-item prop="name" required>
								<el-input v-model="form.name" type="text" placeholder="Имя" size="large" />
							</el-form-item>
							<el-form-item prop="phone" required>
								<el-input v-model="form.phone" type="text" placeholder="Телефон" />
							</el-form-item>
							<el-form-item prop="type" required>
								<el-select v-model="form.type" placeholder="Тип отзыва">
									<el-option label="Положительный" value="positive" />
									<el-option label="Отрицательный" value="negative" />
									<el-option label="Нейтральный" value="neutral" />
								</el-select>
							</el-form-item>
							<el-form-item prop="message" required>
								<el-input
									v-model="form.message"
									type="textarea"
									:rows="6"
									resize="none"
									placeholder="Напишите сообщение..."
								/>
							</el-form-item>
							<el-form-item>
								<el-button
									color="#00ac4e"
									size="large"
									@click.prevent="onSubmit(formRef)"
									:loading="loading"
									>Отправить</el-button
								>
							</el-form-item>
						</el-form>
					</client-only>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus';

definePageMeta({
	title: 'Отзывы и предложения',
});

const loading = ref(false);
const reviewStore = useReviewStore();

const form = reactive({
	name: '',
	phone: '',
	type: '',
	message: '',
});

const formRef = ref();

const validatePhone = (rule, value, cb) => {
	const regex = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
	if (value === '') {
		cb(new Error('Укажите ваш номер телефона'));
	} else if (!regex.test(value)) {
		cb(new Error('Вы указали неверный номер телефона!'));
	} else {
		cb();
	}
};

const rules = reactive({
	name: [
		{ required: true, message: 'Введите ваше имя', trigger: 'blur' },
		{ min: 2, max: 15, message: 'Минимальное количество символов 2', trigger: 'blur' },
	],
	phone: [
		{
			validator: validatePhone,
			required: true,
		},
	],
	type: [
		{
			required: true,
			message: 'Выберите тип отзыва',
			trigger: 'change',
		},
	],
	message: [
		{ required: true, message: 'Напишите ваше сообщение', trigger: 'blur' },
		{ min: 2, max: 15, message: 'Минимальное количество символов 2', trigger: 'blur' },
	],
});

const onSubmit = async (formEl) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			loading.value = true;

			const formData = {
				name: form.name,
				phone: form.phone,
				type: form.type,
				message: form.message,
			};

			try {
				await reviewStore.create(formData);

				ElMessage({
					message: 'Спасибо за ваш отзыв',
					type: 'success',
				});

				formEl.resetFields();
			} catch (error) {
				console.log('ERROR :>> ', error);

				// почему здесь не получается вызвать сообщение с ошибкой
				ElMessage({
					type: 'error',
					message: 'Произошла ошибка',
				});
			} finally {
				loading.value = false;
			}
		} else {
			return false;
		}
	});
};
</script>

<style lang="scss">
.guestbook {
	h1 {
		margin-bottom: 30px;
		font-weight: 700;
		font-size: 32px;
		line-height: 38px;
	}

	p {
		margin-bottom: 25px;
	}
	.el-button {
		margin-left: auto;
	}
}
</style>
