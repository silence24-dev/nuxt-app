<template>
	<client-only>
		<el-dialog
			class="auth"
			v-model="dialogVisible"
			:title="props.title"
			width="358px"
			ref="dialog"
			append-to-body
		>
			<slot></slot>
		</el-dialog>
	</client-only>
</template>

<script lang="ts" setup>
const props = defineProps({
	title: String,
});

const dialogVisible = ref(false);

provide('dialogVisible', dialogVisible);

function show() {
	dialogVisible.value = true;
}

defineExpose({
	dialogVisible: computed(() => dialogVisible.value),
	show,
});
</script>

<style lang="scss">
.el-dialog.auth {
	background: #ffffff;
	box-shadow: 0px 0px 17.7465px rgba(0, 0, 0, 0.12);
	border-radius: 17.4636px;
	.el-dialog__title {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		font-size: 18px;
		line-height: 22px;
		color: #000000;
	}
	.el-dialog__headerbtn:focus .el-dialog__close,
	.el-dialog__headerbtn:hover .el-dialog__close {
		color: #00ac4e;
	}
}

.el-dialog__header {
	margin-right: 0;
}
.dialog-footer button:first-child {
	margin-right: 10px;
}
</style>
