<template>
	<div class="footer">
		<div class="container">
			<el-row>
				<el-col :span="8" class="contacts">
					<div class="phone">+7 (391) 282-60-00</div>
					<div class="time">Ежедневно с 9:00 до 18:00</div>
					<div class="email">Email: info@.ru</div>
					<div class="support">
						<el-button link @click.prevent="navigateTo('/guestbook')"
							>Отзывы и предложения<el-icon size="30px"><Notebook /></el-icon>
						</el-button>
					</div>
				</el-col>
				<el-col :span="8" class="social">
					<el-link :underline="false">
						<el-icon size="32px">
							<svg
								width="48"
								height="48"
								viewBox="0 0 48 48"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M16.6323 0H31.3677C44.8158 0 48 3.18419 48 16.6323V31.3677C48 44.8158 44.8158 48 31.3677 48H16.6323C3.18419 48 0 44.8158 0 31.3677V16.6323C0 3.18419 3.18419 0 16.6323 0Z"
									fill="#4680C2"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M39.2322 15.3211C39.4693 14.5759 39.2322 14.0339 38.1821 14.0339H34.693C33.8123 14.0339 33.4058 14.5081 33.1687 15.0163C33.1687 15.0163 31.3733 19.3522 28.8666 22.1637C28.0536 22.9767 27.681 23.2477 27.2407 23.2477C27.0035 23.2477 26.6987 22.9767 26.6987 22.2315V15.2872C26.6987 14.4065 26.4277 14 25.6824 14H20.1948C19.6528 14 19.3141 14.4065 19.3141 14.813C19.3141 15.6599 20.5674 15.8631 20.7029 18.2343V23.3832C20.7029 24.5011 20.4997 24.7043 20.0593 24.7043C18.8737 24.7043 15.9944 20.3345 14.2668 15.355C13.928 14.3726 13.5893 14 12.7086 14H9.18559C8.16938 14 8 14.4743 8 14.9824C8 15.897 9.18559 20.5039 13.5215 26.6013C16.4009 30.7678 20.4997 33.0035 24.192 33.0035C26.4277 33.0035 26.6987 32.4954 26.6987 31.6486V28.4983C26.6987 27.482 26.9019 27.3127 27.6133 27.3127C28.1214 27.3127 29.036 27.5836 31.1023 29.5822C33.4735 31.9534 33.88 33.0374 35.2011 33.0374H38.6902C39.7064 33.0374 40.1807 32.5293 39.9097 31.5469C39.6048 30.5646 38.4531 29.1419 36.9626 27.4481C36.1496 26.4997 34.9301 25.4496 34.5575 24.9414C34.0494 24.264 34.1849 23.993 34.5575 23.3832C34.5237 23.3832 38.7918 17.3536 39.2322 15.3211Z"
									fill="white"
								/>
							</svg>
						</el-icon>
					</el-link>
					<el-link :underline="false">
						<el-icon size="31px">
							<svg
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
							>
								<defs>
									<radialGradient
										cx="-578.95"
										cy="-837.6"
										gradientTransform="translate(499.5 629.5) scale(0.75)"
										gradientUnits="userSpaceOnUse"
										id="radial-gradient"
										r="197.06"
									>
										<stop offset="0" stop-color="#f9ed32" />
										<stop offset="0.36" stop-color="#ee2a7b" />
										<stop offset="0.44" stop-color="#d22a8a" />
										<stop offset="0.6" stop-color="#8b2ab2" />
										<stop offset="0.83" stop-color="#1b2af0" />
										<stop offset="0.88" stop-color="#002aff" />
									</radialGradient>
								</defs>
								<title />
								<g data-name="3-instagram" id="_3-instagram">
									<rect
										class="cls-1"
										height="64"
										rx="11.2"
										ry="11.2"
										transform="translate(64 64) rotate(180)"
										width="64"
									/>
									<path
										class="cls-2"
										d="M44,56H20A12,12,0,0,1,8,44V20A12,12,0,0,1,20,8H44A12,12,0,0,1,56,20V44A12,12,0,0,1,44,56ZM20,12.8A7.21,7.21,0,0,0,12.8,20V44A7.21,7.21,0,0,0,20,51.2H44A7.21,7.21,0,0,0,51.2,44V20A7.21,7.21,0,0,0,44,12.8Z"
									/>
									<path
										class="cls-2"
										d="M32,45.6A13.6,13.6,0,1,1,45.6,32,13.61,13.61,0,0,1,32,45.6Zm0-22.4A8.8,8.8,0,1,0,40.8,32,8.81,8.81,0,0,0,32,23.2Z"
									/>
									<circle class="cls-2" cx="45.6" cy="19.2" r="2.4" />
								</g>
							</svg>
						</el-icon>
					</el-link>
				</el-col>
				<el-col :span="8" class="auth">
					<el-button link @click.prevent="emit('toggleAuthModal')">
						<el-icon size="30px"><Avatar /></el-icon>Войти / Регистрация
					</el-button>
				</el-col>
			</el-row>
			<el-row class="bottom">
				<div class="policy" @click="emit('togglePolicyModal')">Политика конфиденциальности</div>
				<div>©2022. Texas Meat House</div>
			</el-row>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(['toggleAuthModal', 'togglePolicyModal']);
</script>

<style lang="scss" scoped>
.container {
	max-width: 1200px;
	margin: 0 auto;
}
.footer {
	background: #00ac4e;
	padding: 34px 15px;
	color: #ffffff;

	.support {
		.el-button {
			padding: 0;
			text-decoration: underline;
			color: #ffffff !important;
			font-size: 18px;
			.el-icon {
				margin-left: 12px;
			}
		}
	}

	.auth {
		.el-button {
			padding: 0;
			color: #ffffff !important;
			font-size: 18px;
			.el-icon {
				margin-right: 12px;
			}
		}
	}

	.contacts {
		div {
			margin-bottom: 10px;
		}
		.phone {
			font-size: 25px;
		}
	}
	.social {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		gap: 11px;
	}

	.bottom {
		display: flex;
		gap: 40px;
		.policy {
			cursor: pointer;
			font-weight: 400;
			font-size: 16px;
		}
	}

	@media (max-width: 786px) {
		.contacts,
		.auth {
			max-width: 100%;
			flex: 0 0 50%;
		}

		.auth {
			text-align: right;
		}
		.social {
			max-width: 100%;
			flex: 0 0 100%;
			order: 3;
			justify-content: flex-start;
			margin-bottom: 15px;
		}
	}
	@media (max-width: 598px) {
		.bottom {
			gap: 18px;
		}
	}
	@media (max-width: 538px) {
		.contacts,
		.auth {
			max-width: 100%;
			flex: 0 0 100%;
		}
		.auth {
			margin-bottom: 10px;
			text-align: left;
		}
	}
}
.cls-1 {
	fill: url(#radial-gradient);
}
.cls-2 {
	fill: #fff;
}
</style>
