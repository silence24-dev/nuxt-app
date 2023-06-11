<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts" setup>
import { useUser } from '~/composables/useAuth';

const nuxtApp = useNuxtApp();

nuxtApp.hook('page:finish', () => {
	window.scrollTo(0, 0);
});

await useUser();
</script>
