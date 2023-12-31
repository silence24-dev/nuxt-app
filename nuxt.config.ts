import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	runtimeConfig: {
		private: {},
		public: {},
	},
	imports: {
		dirs: ['stores'],
	},
	css: ['~/assets/scss/index.scss'],
	app: {
		head: {
			title: 'Element Plus + Nuxt 3',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					hid: 'description',
					name: 'description',
					content: 'ElementPlus + Nuxt3',
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},

	typescript: {
		strict: true,
		shim: false,
	},

	// build modules
	modules: [
		'@vueuse/nuxt',
		'@unocss/nuxt',
		'@pinia/nuxt',
		'@element-plus/nuxt',
		'@nuxtjs/color-mode',
	],

	vueuse: {
		ssrHandlers: true,
	},

	colorMode: {
		classSuffix: '',
	},

	unocss: {
		uno: true,
		attributify: true,
		icons: {
			scale: 1.2,
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
				},
			},
		},
	},
	elementPlus: {
		icon: 'ElIcon',
		importStyle: 'scss',
		themes: ['dark'],
	},
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
		],
	},
});
