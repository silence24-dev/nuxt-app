<template>
	<div class="common-layout">
		<el-container :style="{ height: '100%' }">
			<el-aside width="250px">
				<AdminAside />
			</el-aside>
			<el-main>
				<Header></Header>
				<NuxtPage />
			</el-main>
		</el-container>
	</div>
</template>

<script setup>
import Header from '~~/components/admin/Header.vue';

const route = useRoute();

useHead({
	title: route.meta.title,
});
</script>

<style lang="scss" scoped>
.common-layout {
	width: 100%;
	height: 100vh;
}
</style>
