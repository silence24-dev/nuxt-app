<template>
	<div>
		<el-empty
			image="/assets/svgs/404.svg"
			:image-size="200"
			description="Ошибка 404. Страница не существует."
		>
			<NuxtLink to="/">
				<span class="home-link">Вернуться на главную</span>
			</NuxtLink>
		</el-empty>
	</div>
</template>

<script>
import { definePageMeta } from '#app';

export default {
	setup() {
		definePageMeta({
			layout: 'error',
			title: '404',
		});
	},
};
</script>

<style lang="scss">
.el-empty__description p {
	font-size: 30px;
}

.home-link {
	font-size: 25px;
	text-decoration: underline;
}
</style>
