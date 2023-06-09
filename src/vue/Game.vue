<script setup>
    import '../scss/game.scss';
    import { ref, onMounted } from 'vue';

	// Initialize modes
	const cookieCount = ref(0);

    // Increment cookie count
	function clickDatCookie() {
		cookieCount.value++;
		
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
            <!-- TODO: Add cookie in the background when cookie is clicked -->
        </div>
        <div class="cookie">
            <label class="color">{{ cookieCount }} cookies</label>
            <button class="cookie" @click="clickDatCookie">
                <img src="img/png/cookie.png">
            </button>
        </div>
    </div>
</template>