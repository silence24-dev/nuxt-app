<template>
	<div class="orders">
		<el-table border :data="filterOrders" style="width: 100%" v-loading="loading">
			<el-table-column prop="createdAt" label="Дата" width="180" />
			<el-table-column prop="userId" label="ID клиента" width="120" />
			<el-table-column prop="status" label="Статус" width="120" />
			<el-table-column label="Адрес">
				<template #default="scope">
					<div class="order-address">
						<span
							>ул. {{ scope.row.address[0].street }}, дом {{ scope.row.address[0].building }},
							подъезд {{ scope.row.address[0].entrance }}, этаж
							{{ scope.row.address[0].floor }}, кв. {{ scope.row.address[0].apartment }}</span
						>
					</div>
				</template></el-table-column
			>
			<el-table-column fixed="right" label="Операции">
				<template #default="scope">
					<el-button
						type="success"
						v-if="scope.row.status !== 'завершен' && scope.row.status !== 'активен'"
						@click="confirmOrder(scope.row.id, scope.row)"
						>Подтвердить заявку</el-button
					>
					<el-button
						type="success"
						v-if="scope.row.status === 'активен'"
						@click="closeOrder(scope.row.id, scope.row)"
						>Подтвердить доставку</el-button
					>
					<el-button
						type="danger"
						v-if="scope.row.status !== 'завершен' && scope.row.status !== 'отменен'"
						@click="cancelOrder(scope.row.id, scope.row)"
						>Отменить заказ</el-button
					>
					<el-button
						type="primary"
						@click="handleEdit(scope.row.id, scope.row)"
						v-if="scope.row.status === 'завершен'"
					>
						Редактировать
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { IOrder } from '~~/types/IOrder';

const loading = ref(false);
const orderStore = useOrderStore();
let orders: IOrder[] = await orderStore.getAll();

//const filterOrders =  orders.filter(order => order.status !== 'отменен)

const search = ref('');
const filterOrders = computed(() =>
	orders.filter((data) => !search.value || data.status.toLowerCase().includes(search.value.toLowerCase()))
);

const cancelOrder = async (id, order) => {
	try {
		await ElMessageBox.confirm('Отменить заказ?', 'Внимание', {
			confirmButtonText: 'Да',
			cancelButtonText: 'Отмена',
			type: 'warning',
		});

		order.status = 'отменен';
		await orderStore.update(id, order);

		ElMessage({
			type: 'success',
			message: 'Сохранено',
		});
	} catch (error) {
		ElMessage({
			type: 'info',
			message: 'Отмена',
		});
	}
};

const confirmOrder = async (id, order) => {
	order.status = 'активен';
	await orderStore.update(id, order);
};

const closeOrder = async (id, order) => {
	order.status = 'завершен';
	await orderStore.update(id, order);
};

const handleEdit = (id: number, row: IOrder) => {
	navigateTo(`/admin/order/${id}`);
};

const handleDelete = async (id: number, row: IOrder) => {
	try {
		await ElMessageBox.confirm(`Вы точно хотите удалить заказ с ID: ${row.id}?`, 'Внимание!', {
			confirmButtonText: 'Да',
			cancelButtonText: 'Отмена',
			type: 'warning',
		});
		await orderStore.delete(+id);

		orders = orders.filter((item) => item.id !== +id);

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
	title: 'Заказы',
	layout: 'admin',
	middleware: ['auth'],
});
</script>

<style lang="scss">
.el-col {
	margin-bottom: 20px;
}
.order-card-header {
	display: flex;
	justify-content: space-between;
}
.order-card-info {
	display: flex;
	flex-direction: column;
	p {
		margin-bottom: 20px;
	}
}

.search {
	width: 500px;
	margin-bottom: 30px;
	margin-left: auto;
}
p.active {
	color: #67c23a;
}
.order-address {
	display: flex;
	gap: 30px;
}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
	border-bottom: var(--el-table-border);
}
</style>
