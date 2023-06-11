<template>
	<div class="error-layout">
		<NuxtPage />
	</div>
</template>

<script setup>
const route = useRoute();

useHead({
	title: route.meta.title,
});
</script>
