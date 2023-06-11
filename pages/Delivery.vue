<template>
	<div class="delivery">
		<div class="container">
			<Breadcrumb :title="$route.meta.title"></Breadcrumb>
			<el-row>
				<el-col :span="24">
					<h1>Условия доставки</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, nisi rerum
						voluptatem iusto libero architecto fugit. Velit voluptas ipsam iure explicabo ipsum!
						Soluta minus unde recusandae quas enim tenetur possimus ullam veritatis fugit a
						aspernatur tempore eum expedita labore placeat, et vel, impedit, repudiandae hic?
						Tempore iusto aliquid corrupti pariatur, exercitationem ab ullam corporis consectetur
						aperiam illo, quam quisquam distinctio? Itaque deserunt reiciendis blanditiis
						doloremque id cumque commodi, quidem voluptatum, reprehenderit exercitationem quae
						molestiae recusandae. Aperiam molestias voluptas hic nobis voluptatibus laudantium,
						corporis laborum quos debitis dolores dignissimos quae ad exercitationem cupiditate
						ullam accusantium tenetur cum vero harum optio fugiat doloremque? Praesentium fuga quo
						recusandae. Ipsa reiciendis exercitationem at, vel voluptatum expedita ab distinctio,
						quia fugit autem fuga beatae earum impedit doloremque odit necessitatibus harum
						mollitia sunt. Iusto pariatur ex quibusdam numquam nostrum reiciendis, officia
						asperiores laboriosam nobis eaque aspernatur vitae deserunt odit voluptatem explicabo
						delectus fugit culpa. Nulla voluptatibus nam sunt, accusamus cum blanditiis sint
						velit? Dolorem atque repudiandae cumque, eaque porro eum id perferendis, inventore
						molestias repellendus voluptatem.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur vitae vero
						voluptates natus modi obcaecati, quae quaerat eveniet voluptatibus quis asperiores
						illo necessitatibus aspernatur deleniti alias hic, error dignissimos. Hic rem modi
						totam qui, nihil at blanditiis facilis in magnam voluptatem adipisci, iure corporis
						repellendus accusamus unde quisquam. Architecto, ex.
					</p></el-col
				>
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
	title: 'Доставка',
});
</script>

<style lang="scss">
.delivery {
	h1, p {
		margin-bottom: 20px;
	}
	.el-row {
		&:not(:last-child){
			margin-bottom: 30px;
		}
	}
}
</style>
