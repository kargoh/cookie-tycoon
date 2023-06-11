<script setup>
	import '../scss/style.scss';
	import { ref } from 'vue';
    import { Game } from '../js/Game.js';
    import Cookie from './Cookie.vue';
    import Background from './Background.vue';
    import Shop from './Shop.vue';

	// Initialize Vue variables
    var game = ref(new Game());
    var background = ref();

    // Increment cookie count
	function incrementCookie() {
		game.value.increment();
		background.value.background.addCookie();
	}
</script>

<template>
	<div class="ui">
		<div class="background">
			<Background ref="background" />
		</div>
		<div class="content">
			<Cookie :count="game.getCookies()" :action="incrementCookie" />
		</div>
		<div class="menu">
			<Shop />
		</div>
	</div>
</template>