<template>
	<div class="chat-window" :class="{ open: isOpen, 'with-border': isOpen }">
		<!-- Плашка для открытия чата -->
		<div class="chat-placeholder" v-if="!isOpen" @click="toggleChat">
			<div class="chat-icon">
				<el-icon><ChatDotRound /></el-icon>
			</div>
			<div class="chat-label">Чат</div>
		</div>

		<!-- Контейнер чата -->
		<div class="chat-container" :class="{ open: isOpen }" v-if="isOpen">
			<!-- Заголовок чата -->
			<div class="chat-header">
				<div class="chat-title">Чат с поддержкой</div>
				<div class="chat-close" @click="toggleChat">
					<el-icon><Close /></el-icon>
				</div>
			</div>

			<!-- Содержимое чата -->
			<div class="chat-content">
				<!-- Здесь будет содержимое чата -->
				Содержимое чата
			</div>
			<!-- Форма для отправки сообщений -->
			<form class="chat-form" @submit.prevent="sendMessage">
				<el-input v-model="message" placeholder="Введите сообщение" clearable></el-input>
				<el-button type="primary" native-type="submit">Отправить</el-button>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';

const isOpen = ref(false);
const message = ref('');
const chatStore = useChatStore();

const toggleChat = () => {
	isOpen.value = !isOpen.value;
};

const sendMessage = () => {
	if (message.value.trim() !== '') {
		// Отправить сообщение через Pinia store
		chatStore.addMessage(message.value);
		message.value = '';
	}
};
</script>

<style>
.chat-window {
	position: fixed;
	right: 20px;
	bottom: 20px;
	z-index: 9999;
	width: 300px;
	height: auto;
	/* border: 1px solid #ccc; */
	border-radius: 4px;
	/* overflow: hidden; */
	transition: transform 0.3s;
}

.open {
	transform: translateX(0);
	overflow: auto; /* Добавляем overflow: auto; только для открытого окна */
}

.chat-placeholder {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 60px;
	height: 60px;
	background-color: #ff8c00;
	color: #ffffff;
	border-radius: 50% 0 0 50%;
	cursor: pointer;
	transition: transform 0.3s ease-in-out;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
}

.chat-icon {
	margin-right: 5px;
}

.chat-label {
	font-size: 14px;
	font-weight: bold;
}

.chat-container {
	display: none;
	height: 100%;
}

.open .chat-container {
	display: block;
}

.chat-header {
	height: 50px;
	background-color: #f5f5f5;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #ccc;
}

.chat-title {
	font-size: 16px;
	font-weight: bold;
}

.chat-close {
	cursor: pointer;
}

.chat-content {
	flex-grow: 1;
	padding: 10px;
	overflow-y: auto;
}

.chat-form {
	display: flex;
	align-items: center;
	padding: 10px;
	background-color: #f5f5f5;
}

.chat-form el-input {
	flex-grow: 1;
	margin-right: 10px;
}

.with-border {
	border: 1px solid #ccc;
}
</style>
