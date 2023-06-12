<!-- <template>
	<div class="desktop-layout">
		<el-container>
			<el-header>
				<Navbar
					@toggle-sidebar="isExpanded = true"
					@toggle-auth-modal="
						authModal.show();
						authModal.resetModal();
					"
				/>
			</el-header>
			<el-container>
				<el-aside width="0" :class="isExpanded ? 'is-expanded' : ''"
					><Sidebar @close-sidebar="isExpanded = false"
				/></el-aside>
				<el-container>
					<el-main><NuxtPage /></el-main>
					<el-footer>
						<Footer
							@toggle-policy-modal="policyModal.show()"
							@toggle-auth-modal="
								authModal.show();
								authModal.resetModal();
							"
						/>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
		<AuthModal ref="authModal"></AuthModal>
		<PolicyModal ref="policyModal"></PolicyModal>
		<ChatWindow></ChatWindow>
	</div>
</template>

<script setup>
import AuthModal from '../components/modal/AuthModal.vue';
import PolicyModal from '../components/modal/PolicyModal.vue';
import ChatWindow from '~/components/chat/ChatWindow.vue';

const authModal = ref(false);
const policyModal = ref(false);
const route = useRoute();
const isExpanded = ref(false);

useHead({
	title: route.meta.title,
});
</script>

<style lang="scss">
.desktop-layout {
	display: flex;
	min-height: 100vh;
	overflow: hidden;
	flex-direction: column;
	position: relative;
	overflow-x: hidden;
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 15px;
	}
	.el-header {
		background: #ffffff;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.12);
		height: auto;
	}
	.el-main {
		padding: 60px 0;
	}
	.el-aside {
		min-height: 100vh;
		background: #343e48;
		left: 0;
		top: 0;
		position: fixed !important;
		z-index: 99;
		transition: 0.2s ease-in-out;
		&.is-expanded {
			width: 250px;
		}
	}
	.el-footer {
		height: auto;
		padding: 0;
	}
	@media (max-width: 768px) {
		flex-direction: row;
		.el-main {
			padding: 25px 0;
		}
	}
}
</style> -->

<template>
	<div class="desktop-layout">
		<el-container>
			<el-header>
				<Navbar
					@toggle-sidebar="isExpanded = true"
					@toggle-auth-modal="
						authModal.show();
						authModal.resetModal();
					"
				/>
			</el-header>
			<el-container>
				<el-aside width="0" :class="isExpanded ? 'is-expanded' : ''"
					><Sidebar @close-sidebar="isExpanded = false"
				/></el-aside>
				<el-container>
					<el-main><NuxtPage /></el-main>
					<el-footer>
						<Footer
							@toggle-policy-modal="policyModal.show()"
							@toggle-auth-modal="
								authModal.show();
								authModal.resetModal();
							"
						/>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
		<AuthModal ref="authModal"></AuthModal>
		<PolicyModal ref="policyModal"></PolicyModal>
		<ChatWindow :isOpen="chatOpen" @toggleChat="toggleChat"></ChatWindow>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';
import AuthModal from '../components/modal/AuthModal.vue';
import PolicyModal from '../components/modal/PolicyModal.vue';
import ChatWindow from '~/components/chat/ChatWindow.vue';

const authModal = ref(false);
const policyModal = ref(false);
const route = useRoute();
const isExpanded = ref(false);
const chatOpen = ref(false);
const chatStore = useChatStore();

const toggleChat = () => {
	chatOpen.value = !chatOpen.value;
};

useHead({
	title: route.meta.title,
});
</script>

<style lang="scss">
.desktop-layout {
	display: flex;
	min-height: 100vh;
	overflow: hidden;
	flex-direction: column;
	position: relative;
	overflow-x: hidden;
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 15px;
	}
	.el-header {
		background: #ffffff;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.12);
		height: auto;
	}
	.el-main {
		padding: 60px 0;
	}
	.el-aside {
		min-height: 100vh;
		background: #343e48;
		left: 0;
		top: 0;
		position: fixed !important;
		z-index: 99;
		transition: 0.2s ease-in-out;
		&.is-expanded {
			width: 250px;
		}
	}
	.el-footer {
		height: auto;
		padding: 0;
	}
	@media (max-width: 768px) {
		flex-direction: row;
		.el-main {
			padding: 25px 0;
		}
	}
}
</style>
