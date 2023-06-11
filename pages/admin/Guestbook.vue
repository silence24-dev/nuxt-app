<template>
	<!-- <div class="guestbook">
		<el-table :data="reviews" style="width: 100%">
			<el-table-column prop="createdAt" label="Дата" width="120" />
			<el-table-column prop="name" label="Имя" width="120" />
			<el-table-column prop="phone" label="Телефон" width="120" />
			<el-table-column prop="type" label="Тип отзыва" width="120" />
			<el-table-column label="Операции" width="120">
				<template #default>
					<el-button link type="primary" size="small" @click="handleClick">Посмотреть</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div> -->
	<el-table :data="reviews" :border="true" style="width: 100%" :row-class-name="tableRowClassName">
		<el-table-column type="expand">
			<template #default="props">
				<div class="review-data">
					<p>Дата: {{ props.row.createdAt }}</p>
					<p>Имя: {{ props.row.name }}</p>
					<p>Телефон: {{ props.row.phone }}</p>
					<p>Сообщение: {{ props.row.message }}</p>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="Дата" prop="createdAt" />
		<el-table-column label="Тип" prop="type" />
	</el-table>
</template>

<script setup>
definePageMeta({
	layout: 'admin',
});

const reviewStore = useReviewStore();

const reviews = await reviewStore.getAll();

const tableRowClassName = (row, rowIndex) => {
	if (row.row.type === 'negative') {
		return 'warning-row';
	} else if (row.row.type === 'positive') {
		return 'success-row';
	}
	return '';
};
</script>

<style lang="scss">
.el-table .warning-row {
	--el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
	--el-table-tr-bg-color: var(--el-color-success-light-9);
}
.review-data {
	padding: 0 10px;
}
</style>
