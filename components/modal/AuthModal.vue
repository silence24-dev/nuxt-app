<template>
	<Modal ref="modal" :title="authFormTitle">
		<LoginForm v-if="formType === 'login'" @want-to-register="formType = 'register'"></LoginForm>
		<RegisterForm v-if="formType === 'register'"></RegisterForm>
	</Modal>
</template>

<script lang="ts" setup>
import Modal from './Modal.vue';
import LoginForm from '../forms/LoginForm.vue';
import RegisterForm from '../forms/RegisterForm.vue';

const modal = ref(null);

const formType = ref('login');

function resetModal() {
	formType.value = 'login';
}

const formTitles = {
	login: 'Войти в личный кабинет',
	register: 'Регистрация',
};

const authFormTitle = computed(() => formTitles[formType.value]);

defineExpose({
	show: () => modal.value?.show(),
	resetModal
});
</script>

<style></style>
