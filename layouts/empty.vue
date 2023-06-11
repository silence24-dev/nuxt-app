<template>
	<div class="empty-layout">
		<NuxtPage />
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const route = useRoute()
// const piniaStore = usePiniaStore()
// const error = computed(() => piniaStore.getError)

// watch(piniaStore.$state, (value) => {
// 	ElMessage({
// 		message: value.error,
// 		type: 'error',
// 	})
// }, {
// 	deep: true
// })

useHead({
	title: route.meta.title
})
</script>

<style lang="scss" scoped>
.empty-layout {
	display: flex;
	justify-content: center;
	width: 100%;
	padding-top: 4rem;
}
</style>