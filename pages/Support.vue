<template>
	<div class="vacancy">
		<div class="container">
			<Breadcrumb :title="$route.meta.title"></Breadcrumb>
			<el-row>
				<el-col :span="24">
					<h5>Поддержка</h5>
					<p>
						Тут чат?
					</p>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-button color="#00ac4e" size="large" @click.prevent="navigateTo('/')"
						>В каталог</el-button
					>
					<el-button link size="large" @click.prevent="navigateTo('/payment')">
						Об оплате
						<el-icon color="#00ac4e" size="20px"><ArrowRightBold /></el-icon>
					</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	title: 'Поддержка',
});
</script>

<style lang="scss">
.vacancy {
	h5,
	p {
		margin-bottom: 20px;
	}
	.el-row {
		&:not(:last-child) {
			margin-bottom: 30px;
		}
	}
}
</style>