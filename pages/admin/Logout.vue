<template>
	<h5>Выход из системы...</h5>
</template>

<script setup>

navigateTo('/admin/login?message=logout');

definePageMeta({
	layout: 'admin',
	middleware: ['auth'],
});
</script>

<style lang="scss" scoped></style>
