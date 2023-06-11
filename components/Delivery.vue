<template>
	<div class="container">
		<div class="delivery">
			<h5 class="title">
				Бесплатная доставка по Красноярску <br />
				от 1999 RUB!
			</h5>
			<NuxtLink to="/order">Оформить</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.delivery {
	height: 254px;
	width: 100%;
	background: #f2f2f2;
	box-shadow: 0px 0px 18.0727px rgba(0, 0, 0, 0.03);
	border-radius: 18px;
	padding: 30px 0px 30px 40px;
	background-image: url(assets/img/delivery.png);
	background-repeat: no-repeat;
	background-position: center right;
	@media (max-width: 768px) {
		padding: 15px 0px 15px 15px !important;
		height: 200px;
	}
	.title {
		font-size: 31px;
		line-height: 38px;
		color: #333333;
		@media (max-width: 768px) {
			font-size: 22px !important;
			line-height: 30px !important;
		}
	}
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25px;
		line-height: 53px;
		color: #ffffff;
		background: #00ac4e;
		border-radius: 5px;
		width: 171px;
		height: 53px;
		margin-top: 34px;
		@media (max-width: 768px) {
			font-size: 22px !important;
			line-height: 30px !important;
			width: 156px;
			height: 44px;
		}
		@media (max-width: 375px) {
			width: 140px;
			height: 38px;
			font-size: 18px !important;
			line-height: 14px !important;
		}
	}
}
</style>
