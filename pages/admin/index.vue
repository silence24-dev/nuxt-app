<template>
	<el-row :gutter="20">
		<el-col :span="6">
			<el-card shadow="hover" class="admin-panel-card" v-loading="loading">
				<div class="card-body">
					<el-icon size="67px"><Message /></el-icon>
					<div class="card-body-text">
						<p>Сообщения</p>
						<p>+50</p>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col :span="6"
			><el-card shadow="hover" class="admin-panel-card" v-loading="loading">
				<div class="card-body">
					<el-icon size="67px"><Box /></el-icon>
					<div class="card-body-text">
						<p>Заказы</p>
						<p>+5</p>
					</div>
				</div>
			</el-card></el-col
		>
		<el-col :span="6"
			><el-card shadow="hover" class="admin-panel-card" v-loading="loading">
				<div class="card-body">
					<el-icon size="67px"><UserFilled /></el-icon>
					<div class="card-body-text">
						<p>Пользователи</p>
						<p>+5</p>
					</div>
				</div>
			</el-card></el-col
		>
		<el-col :span="6"
			><el-card
				shadow="hover"
				class="admin-panel-card"
				v-loading="loading"
				@click="navigateTo('/admin/guestbook')"
			>
				<div class="card-body">
					<el-icon size="67px"><Notebook /></el-icon>
					<div class="card-body-text">
						<p>Отзывы и предложения</p>
						<p>всего: {{ reviews.length }}</p>
						<p>новых: +20</p>
					</div>
				</div>
			</el-card></el-col
		>
	</el-row>
	<el-row :gutter="20"
		><el-col :span="12">
			<el-card class="banner" v-loading="loading">
				<Carousel></Carousel>
				<div class="banner-buttons">
					<el-button>Добавить акцию</el-button>
					<el-button>Редактировать</el-button>
				</div>
			</el-card>
		</el-col>
		<el-col :span="12">
			<el-card v-loading="loading">
				<div class="discaunt">
					<div class="discaunt-title">Акции и скидки</div>
					<el-icon size="250px"
						><img src="@/assets/svgs/discount1-115862_115807.svg" alt=""
					/></el-icon>
					<div class="discaunt-buttons">
						<el-button>Смотреть все</el-button>
						<el-button>Добавить</el-button>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>
const orderStore = useOrderStore();
const reviewStore = useReviewStore();

const orders = await orderStore.getAll();
const reviews = await reviewStore.getAll();

const loading = ref(false);
definePageMeta({
	title: 'Админка',
	layout: 'admin',
	middleware: ['auth'],
});
</script>

<style lang="scss">
.admin-panel-card {
	background-color: #fff;
	color: #409eff;
	cursor: pointer;
}
.card-body {
	display: flex;
	justify-content: space-between;
}
.el-row {
	margin-bottom: 20px;
}

.banner {
	display: flex;
	flex-direction: column;
	.banner-buttons {
		display: flex;
		justify-content: flex-end;
	}
}

.discaunt {
	display: flex;
	flex-direction: column;
	align-items: center;
	.discaunt-title {
		align-self: flex-start;
	}
	.discaunt-buttons {
		align-self: flex-end;
	}
}
</style>
