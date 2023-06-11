<template>
	<div class="aside-wrapper">
		<div class="aside-top">
			<el-icon class="sidebar-toggle" color="#00AC4E" size="30px" @click="emit('closeSidebar')"><Fold /></el-icon>
			<div class="aside-logo"><img src="@/assets/img/logo.png" alt="" /></div>
		</div>
		<ul class="aside-menu">
			<li class="aside-menu__item">
				<span @click="isDropdownOpen = !isDropdownOpen"
					><img src="@/assets/img/fork.svg" alt="" />Меню<img
						class="arrow"
						src="@/assets/img/white-arrow.svg"
						alt=""
				/></span>
				<ul :class="['aside-dropdown', { 'aside-dropdown--open': isDropdownOpen }]">
					<li class="aside-dropdown__item">Салаты</li>
					<li class="aside-dropdown__item">Тако</li>
					<li class="aside-dropdown__item">Бургеры</li>
					<li class="aside-dropdown__item">Сэндвичи</li>
					<li class="aside-dropdown__item">Шаурма</li>
				</ul>
			</li>
			<li class="aside-menu__item">
				<NuxtLink to="/delivery"
					><img src="@/assets/img/truck.svg" alt="" />Доставка<img
						class="arrow"
						src="@/assets/img/white-arrow.svg"
						alt=""
				/></NuxtLink>
			</li>
			<li class="aside-menu__item">
				<NuxtLink to="/payment"
					><img src="@/assets/img/cash.svg" alt="" />Оплата<img
						class="arrow"
						src="@/assets/img/white-arrow.svg"
						alt=""
				/></NuxtLink>
			</li>
			<li class="aside-menu__item">
				<NuxtLink to="/vacancy"
					><img src="@/assets/img/search.svg" alt="" />Вакансии<img
						class="arrow"
						src="@/assets/img/white-arrow.svg"
						alt=""
				/></NuxtLink>
			</li>
			<li class="aside-menu__item">
				<NuxtLink to="/support"
					><img src="@/assets/img/support.svg" alt="" />Поддержка<img
						class="arrow"
						src="@/assets/img/white-arrow.svg"
						alt=""
				/></NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup>
const isDropdownOpen = ref(false);

const emit = defineEmits(['closeSidebar']);
</script>

<style lang="scss">
.aside-wrapper {
	min-height: 100%;
	width: 100%;
	color: #ffffff;
	.aside-top {
		height: 50px;
		width: 100%;
		background: #ffffff;
		border-bottom-right-radius: 8px;
		display: flex;
		align-items: center;
		.aside-logo {
			width: 50px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 37px;
			img {
				width: 100%;
			}
		}
		.sidebar-toggle {
			margin-left: 35px;
			cursor: pointer;
		}
	}
	.aside-menu {
		padding: 30px 0px;

		&__item {
			cursor: pointer;
			a.router-link-exact-active {
				border-right: 5px solid #00AC4E;
			}
			a,
			span {
				color: #ffffff;
				height: 45px;
				display: flex;
				align-items: center;
				padding: 0 25px;
				img {
					margin-right: 8px;
				}
				img.arrow {
					margin-left: auto;
					justify-self: flex-end;
				}
				&:hover {
					background-color: #434f5b;
				}
			}
		}
	}
	.aside-dropdown {
		height: 0;
		overflow: hidden;
		transition: 0.2s ease-in-out;
		padding-left: 40px;
		&__item {
			cursor: pointer;
			&:first-child {
				margin-top: 12px;
			}
			&:not(:last-child) {
				margin-bottom: 15px;
			}
		}
		&.aside-dropdown--open {
			height: auto;
		}
	}
}
</style>
