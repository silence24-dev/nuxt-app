<template>
	<el-menu :collapse="isCollapse" router :style="{ height: '100%' }" :default-active="$route.path">
		<div class="toggle-admin-aside">
			<el-button @click="isCollapse = !isCollapse">
				<el-icon v-if="isCollapse"><Expand /></el-icon>
				<el-icon v-else><Fold /></el-icon>
			</el-button>
		</div>
		<el-menu-item index="/admin">
			<el-icon><HomeFilled /></el-icon>
			<span>Dashboard</span>
		</el-menu-item>
		<el-menu-item index="/admin/orders">
			<el-icon><Box /></el-icon>
			<span>Заказы</span>
		</el-menu-item>
		<el-sub-menu index="1">
			<template #title>
				<el-icon><ShoppingBag /></el-icon>
				<span>Товары</span>
			</template>
			<el-menu-item index="/admin/catalog">Все товары</el-menu-item>
			<el-menu-item index="/admin/add">Добавить</el-menu-item>
		</el-sub-menu>
		<el-menu-item index="/admin/users">
			<el-icon><Avatar /></el-icon>
			<span>Пользователи</span>
		</el-menu-item>
		<el-menu-item index="/admin/discount">
			<el-icon><PriceTag /></el-icon>
			<span>Акции и скидки</span>
		</el-menu-item>
		<el-menu-item index="/admin/chat">
			<el-icon><Service /></el-icon>
			<span>Чат</span>
		</el-menu-item>
		<el-menu-item index="/admin/guestbook">
			<el-icon><Notebook /></el-icon>
			<span>Отзывы и предложения</span>
		</el-menu-item>
		<el-menu-item index="/admin/logout">
			<el-icon><SwitchButton /></el-icon>
			<span>Выйти</span>
		</el-menu-item>
	</el-menu>
</template>

<script lang="ts" setup>
const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
.toggle-admin-aside {
	display: flex;
	justify-content: center;
	padding: 20px;
	.el-button {
		width: 100%;
	}
	.el-icon {
		font-size: 20px;
	}
}
</style>
