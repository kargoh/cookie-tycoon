<script setup>
    import { ref, onMounted } from 'vue';
    import '../scss/game.scss';
    import { Background } from '../js/Background.js';

	// Initialize Vue variables
	var cookieCount = ref(0);

    // Initialize background
    var background = ref(new Background());

    // Increment cookie count
	function clickDatCookie() {
		cookieCount.value++;

        // Add a cookie to the background
        background.value.addCookie();
		
		//random number between 98 and 1
		localStorage.setItem('cookieCount', cookieCount.value);
	}

	onMounted(function() {
		cookieCount.value = localStorage.getItem('cookieCount') || 0;
	});
</script>

<template>
    <div class="game">
        <div class="background">
            <TransitionGroup>
                <img v-for="(cookie, index) of background.cookies" src="img/png/cookie.png" :style="cookie.style" :key="cookie" />
            </TransitionGroup>
        </div>
        <div class="cookie">
            <label class="color">{{ cookieCount }} cookies</label>
            <button class="cookie" @click="clickDatCookie">
                <img src="img/png/cookie.png">
            </button>
        </div>
    </div>
</template>