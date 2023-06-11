<template>
	<!-- <el-row :gutter="20" v-loading="loading">
		<el-col :span="6" v-for="product in products">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>{{ product.name }}</span>
						<div class="card-header-buttons">
							<el-button
								circle
								:icon="Edit"
								size="small"
								type="primary"
								@click="handleEdit(product.id, product)"
							>
							</el-button>
							<el-button
								circle
								:icon="Delete"
								size="small"
								type="danger"
								@click="handleDelete(product.id, product)"
							></el-button>
						</div>
					</div>
				</template>
				<el-image :src="product.image">
					<template #error>
						<div class="image-slot">
							<el-icon><icon-picture /></el-icon>
						</div>
					</template>
				</el-image>
				<el-collapse
					><el-collapse-item title="Раскрыть описание" name="2">
						<div>
							{{ product.components }}
						</div>
						<div>
							{{ product.description }}
						</div>
					</el-collapse-item></el-collapse
				>
			</el-card>
		</el-col>
	</el-row> -->
	<el-row :gutter="20">
		<el-col :span="6" v-for="(product, index) in products">
			<el-card>
				<el-image :src="product.image">
					<template #error>
						<div class="image-slot">
							<el-icon><icon-picture /></el-icon>
						</div>
					</template>
				</el-image>
				<p>{{ product.name }}</p>
				<hr />
				<p>{{ product.components }}</p>
				<p>
					вес: <strong>{{ product.weight }}гр.</strong>
				</p>
				<p>
					цена: <strong>{{ product.price }}₽</strong>
				</p>
				<div class="menu-card-footer">
					<el-button color="#00ac4e" disabled>В корзину</el-button>
					<div class="card-options">
						<el-button
							circle
							:icon="Edit"
							size="small"
							type="primary"
							@click="handleEdit(product.id, product)"
						>
						</el-button>
						<el-button
							circle
							:icon="Delete"
							size="small"
							type="danger"
							@click="handleDelete(product.id, product)"
						></el-button>
					</div>
				</div>
				<div class="card-header-buttons"></div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Delete } from '@element-plus/icons-vue';
import { IProduct } from '~~/types/IProduct';

const loading = ref(false);
const productStore = useProductStore();
const products = ref(null);
products.value = await productStore.getAll();

const handleEdit = (id: number, row: IProduct) => {
	navigateTo(`/admin/product/${id}`);
};
const handleDelete = async (id: number, row: IProduct) => {
	try {
		await ElMessageBox.confirm(`Вы точно хотите удалить ${row.name}?`, 'Внимание!', {
			confirmButtonText: 'Да',
			cancelButtonText: 'Отмена',
			type: 'warning',
		});
		await productStore.delete(+id);

		products.value = products.filter((p: IProduct) => p.id !== +id);

		ElMessage({
			type: 'success',
			message: 'Удалено',
		});
	} catch (error) {
		ElMessage({
			type: 'info',
			message: 'Отмена',
		});
	}
};

definePageMeta({
	title: 'Каталог',
	layout: 'admin',
	middleware: ['auth'],
});
</script>

<style lang="scss">
.card-header {
	display: flex;
	justify-content: space-between;
}
.menu-card-footer {
	display: flex;
	justify-content: space-between;
}
</style>
