<template>
	<div class="vacancy">
		<div class="container">
			<Breadcrumb :title="$route.meta.title"></Breadcrumb>
			<el-row>
				<el-col :span="24">
					<h5>Повар</h5>
					<p>
						<strong>Требования:</strong> опыт от 3-х лет, умение готовить яишницу, пельмени, пиццу
						и наливать чай. Работа в коллективе в 25 человек.
					</p>
					<p>
						<strong>Условия:</strong> Сдельная плата за каждый бутерброд 5% от суммы и
						фиксированный оклад 4000 грн.
					</p>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<h5>Повар</h5>
					<p>
						<strong>Требования:</strong> опыт от 3-х лет, умение готовить яишницу, пельмени, пиццу
						и наливать чай. Работа в коллективе в 25 человек.
					</p>
					<p>
						<strong>Условия:</strong> Сдельная плата за каждый бутерброд 5% от суммы и
						фиксированный оклад 4000 грн.
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
	title: 'Вакансии',
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

