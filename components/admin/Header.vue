<template>
	<header>
		<el-row class="header-wrapper" justify="space-between">
			<el-col class="header-col" :span="12">
				<el-input v-model="search" size="large" placeholder="Искать" prefix-icon="Search" />
			</el-col>
			<el-col class="header-col user-panel" :span="12">
				<div class="user-panel__item" style="padding: 0 50px">
					<el-switch active-icon="Moon" inactive-icon="Sunny" v-model="isDarkTheme" size="large" />
				</div>
				<el-badge :value="12" class="item">
					<el-button circle
						><el-icon><Bell /></el-icon
					></el-button>
				</el-badge>
				<div class="user-panel__item" style="padding: 0 25px">
					<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				</div>
			</el-col>
		</el-row>
	</header>
</template>

<script lang="ts" setup>
const search = ref('');
const isDarkTheme = ref(false);
</script>

<style lang="scss" scoped>
header {
	margin-bottom: 20px;
}
.header-col {
	display: flex;
	align-items: center;
	&.user-panel {
		justify-content: flex-end;
	}
}
</style>
