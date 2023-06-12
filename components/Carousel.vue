<template>
	<div class="carousel">
		<div class="container">
			<el-carousel :interval="5000" trigger="click" height="254px">
				<el-carousel-item v-for="item in 4" :key="item">
					<div class="carousel-content">
						<h5>Подарок на первый заказ.</h5>
						<p>Получите 500 рублей за подписку на рассылку</p>
						<el-button color="#00AC4E" size="large">Подписаться</el-button>
						<div class="img-wrapper">
							<img src="@/assets/images/banner.png" alt="" />
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<style lang="scss">
.carousel {
	margin-bottom: 30px;
	.carousel-content {
		position: relative;
		overflow: hidden;
		background: linear-gradient(180deg, #f1f1fb 0%, #ebebf5 100%);
		box-shadow: 0px 0px 18.0727px rgba(0, 0, 0, 0.03);
		border-radius: 18px;
		height: 100%;
		width: 100%;
		padding: 40px;

		h5 {
			margin-bottom: 20px;
		}

		p {
			margin-bottom: 40px;
		}

		.img-wrapper {
			position: absolute;
			right: 0;
			top: 0;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>

