<template>
	<el-row style="height: 100%">
		<el-col :span="24">
			<el-card class="chat" v-loading="loading" style="height: 100%">
				<template #header>
					<div class="chat-header">
						<span>Chat</span>
					</div>
				</template>
				<div class="chat-body"></div>
				<div class="chat-bottom">
					<el-input v-model="input3" placeholder="Напишите ваше сообщение">
						<template #append>
							<el-button
								><el-icon><Promotion /></el-icon
							></el-button>
						</template>
					</el-input>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import { Promotion } from '@element-plus/icons-vue';
const loading = ref(false);

definePageMeta({
	layout: 'admin',
	title: 'Чат',
	middleware: ['auth'],
});
</script>

<style lang="scss">
.chat {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.chat-body {
	height: 450px;
	margin-bottom: 20px;
	border-radius: var(--el-card-border-radius);
	border: 1px solid var(--el-card-border-color);
	background-color: var(--el-card-bg-color);
	overflow: hidden;
	color: var(--el-text-color-primary);
	transition: var(--el-transition-duration);
}
</style>
