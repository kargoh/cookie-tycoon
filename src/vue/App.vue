<script setup>
	import '../scss/style.scss';
	import { ref, onMounted } from 'vue';

	// Initialize modes
	const cookieCount = ref(0);
	var cookieImage = ref('./img/png/cookie-png.png');
	onMounted(() => {
		cookieCount.value = localStorage.getItem('cookieCount');
	})

	function clickDatCookie() {
		cookieCount.value++;
		localStorage.setItem('cookieCount', cookieCount.value);
	}
</script>

<template>
	<div class="view">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col">
					<div class="cookie-clicker">
						<p>{{ cookieCount }} cookies</p>
						<button @click="clickDatCookie" :style="{ 'background-image': cookieImage != undefined ? 'url(' + cookieImage + ')' : '' }">
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>