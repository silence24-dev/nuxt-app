<template>
	<div class="video">
		<iframe
			class="yt-video"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			:src="videoURL"
		></iframe>
		<img
			class="play-btn"
			src="assets/img/play-btn.svg"
			alt="img"
			:style="changeStyle"
			@click.prevent="
				(videoURL = 'https://www.youtube.com/embed/cJ8smVm1y1Y'), (changeStyle = 'display: none')
			"
		/>
	</div>
</template>

<script setup>
const videoURL = ref(null);
const changeStyle = ref(null);
</script>

<style lang="scss">
.video {
	margin-bottom: 60px;
	aspect-ratio: 16 / 9;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url(assets/img/video-bg.jpg);
	background-repeat: no-repeat;
	background-size: cover;
	overflow: hidden;
	iframe {
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.play-btn {
		cursor: pointer;
		position: relative;
		max-width: 106px;
		object-fit: cover;
		@media (max-width: 786px) {
			max-width: 70px;
		}
		@media (max-width: 375px) {
			max-width: 50px;
		}
	}
}
</style>
