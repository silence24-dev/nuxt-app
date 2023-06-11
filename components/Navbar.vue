<template>
	<div class="container">
		<el-menu
			mode="horizontal"
			:ellipsis="false"
			@select="handleSelect"
			background-color="#fff"
			active-text-color="#00ac4e"
			:default-active="$route.path"
		>
			<el-icon class="sidebar-toggle" color="#00AC4E" size="30px" @click.prevent="emit('toggleSidebar')"
				><Expand
			/></el-icon>
			<NuxtLink to="/" class="menu-item__logo"><img src="@/assets/img/logo.png" alt="" /></NuxtLink>
			<div class="flex-grow" />
			<el-sub-menu class="menu-item__desktop" index="4" popper-class="sub-popper">
				<template #title> Меню </template>
				<el-menu-item index="4-1"> Салаты </el-menu-item>
				<el-menu-item index="4-2"> Тако </el-menu-item>
				<el-menu-item index="4-3"> Бургеры </el-menu-item>
				<el-menu-item index="4-4"> Сэндвичи </el-menu-item>
				<el-menu-item index="4-5"> Шаурма </el-menu-item>
				<el-menu-item index="4-6"> Соусы </el-menu-item>
				<el-menu-item index="4-7"> Соленья </el-menu-item>
				<el-menu-item index="4-8"> Шашлык </el-menu-item>
			</el-sub-menu>

			<el-menu-item class="menu-item__desktop">
			</el-menu-item>
			<el-menu-item class="menu-item__desktop" index="/delivery"> Доставка </el-menu-item>
			<el-menu-item class="menu-item__desktop" index="/payment"> Оплата </el-menu-item>
			<el-menu-item class="menu-item__phone">
				<el-link :underline="false" href="tel:+79990000000">
					<el-icon size="30px"><PhoneFilled color="#00AC4E" /></el-icon>
					<span class="phone">+7 (990) 00-00-00</span>
				</el-link>
			</el-menu-item>
			<el-menu-item>
				<el-icon size="30px" v-if="!user" @click="emit('toggleAuthModal')"
					><User color="#00AC4E" />
				</el-icon>
				<el-icon size="30px" v-if="user" @click="logout">
					<SwitchButton color="#00AC4E" />
				</el-icon>
			</el-menu-item>
			<el-menu-item index="/cart">
				<el-icon class="shopping-cart" size="30px"><ShoppingCart color="#00AC4E" /></el-icon>
				<span class="basket-count" v-if="cartStore.cartCount > 0">{{ cartStore.cartCount }}</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script lang="ts" setup>
import { userLogout } from '~/composables/useAuth';
import { useCartStore } from '~/stores/cart';


const cartStore = useCartStore();
const showSideDrawer = ref(false);
const logout = userLogout;
const router = useRouter();
const user = useState('user');
const initalCheck = await useLoggedIn();
const isLoggedIn = ref(initalCheck);
router.afterEach(() => {
	showSideDrawer.value = false;
});
async function checkIfLoggedIn() {
	const check = await useLoggedIn();
	isLoggedIn.value = check;
}

onMounted(() => {
	cartStore.cartCount = JSON.parse(localStorage.getItem('cartCount') || '0');
});

watch(
	cartStore.$state,
	(value) => {
		localStorage.setItem('cartCount', JSON.stringify(value.cartCount));
	},
	{ deep: true }
);

watch(
	user,
	async (value) => {
		await checkIfLoggedIn();
	},
	{ deep: true }
);

const emit = defineEmits(['toggleSidebar', 'toggleAuthModal']);
const handleSignOut = () => {
	useFetch('/api/auth/logout');
	navigateTo('/');
};

const handleSelect = (key, keyPath) => {
	if (key) {
		navigateTo(key);
	}
};
</script>

<style lang="scss">
.el-menu {
	height: 100px;
	.el-icon {
		margin-right: 0;
	}
	.menu-item__logo {
		align-self: center;
	}
	.sidebar-toggle {
		display: none;
		align-self: center;
	}
	.flex-grow {
		flex-grow: 1;
	}
	@media (max-width: 1024px) {
		.phone {
			display: none;
		}
	}
	@media (max-width: 768px) {
		height: 50px;
		.menu-item__desktop {
			display: none;
		}
		.sidebar-toggle {
			display: block;
		}
		.el-menu-item {
			padding: 0 10px;
		}
		.menu-item__logo {
			padding: 0 37px;
			div {
				width: 50px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 100%;
				}
			}
		}
		.basket-count {
			position: absolute;
			text-align: center;
			left: 23px;
			bottom: 22px;
			border-radius: 50%;
			background: #eb5757;
			border: 2px solid white;
			font-style: normal;
			font-size: 15px;
			font-weight: 700;
			line-height: 20px;
			color: white;
			width: 24px;
			height: 24px;
		}
	}
	@media (max-width: 360px) {
		.menu-item__logo {
			padding: 0px 10px 0 25px;
		}
	}
}

.basket-count {
	position: absolute;
	text-align: center;
	left: 33px;
	bottom: 47px;
	border-radius: 50%;
	background: #eb5757;
	border: 2px solid white;
	font-style: normal;
	font-size: 15px;
	font-weight: 700;
	line-height: 20px;
	color: white;
	width: 24px;
	height: 24px;
}

.el-menu-item {
	.el-icon.shopping-cart {
		margin-right: 0;
	}
}

.el-sub-menu__title,
.el-menu-item {
	font-family: var(--primary-font);
	font-size: 18px;
}
.el-menu--horizontal {
	border-bottom: none;
	.el-menu-item.is-active {
		border-bottom: transparent;
		color: #00ac4e !important;
	}
	.el-sub-menu .el-sub-menu__title {
		border-bottom: none;
	}

	.el-menu--popup {
	}

	.el-menu-item:not(.is-disabled):focus,
	.el-menu-item:not(.is-disabled):hover {
		color: #00ac4e;
		background-color: #fff;
	}

	// .el-menu-item a,
	// .el-menu-item a:hover {
	// 	color: #000000;
	// }
	.el-sub-menu:hover .el-sub-menu__title {
		color: #00ac4e;
	}
}
</style>
