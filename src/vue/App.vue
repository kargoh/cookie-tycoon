<script setup>
	import '../scss/style.scss';
	import { ref, onMounted, onUpdated  } from 'vue';

	// Initialize modes
	const cookieCount = ref(0);
	var cookieImage = ref('./img/png/cookie-png.png');
	var cookieDrops = "";
	onMounted(() => {
		cookieCount.value = localStorage.getItem('cookieCount');
	})

	function clickDatCookie() {
		cookieCount.value++;
		
		//random number between 98 and 1
		var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
		var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
		localStorage.setItem('cookieCount', cookieCount.value);


		//add in a new cookie drops with various randomizations to certain CSS properties
		cookieDrops += '<div class="cookie-drop" style="background-image: url(./img/png/cookie-png.png); left: ' + (randoHundo) + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div>';

	}

	onUpdated(() => {
		// text content should be the same as current `count.value`
		console.log(cookieDrops)
		document.getElementById('pizza').innerHTML += cookieDrops
	})
</script>

<template>
	<div class="view">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col">
					<div id="pizza" class="cookie-rain"></div>
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