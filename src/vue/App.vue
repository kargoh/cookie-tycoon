<script setup>
	import '../scss/style.scss';
	import { ref } from 'vue';
    import { Game } from '../js/Game.js';
    import Cookie from './Cookie.vue';
    import Background from './Background.vue';
    import Notifications from './Notifications.vue';
    import Shop from './Shop.vue';

	// Initialize Vue variables
    var game = ref(new Game());
    var background = ref();
    var notifications = ref();

    // Increment cookie count (this gets called by Cookies.vue)
	function incrementCookie() {
		var amount = game.value.increment()
		background.value.addCookie();
		return amount;
	}

	function notify(text, $event) {
		notifications.value.addNotification(text, $event);
	}
</script>

<template>
	<div class="ui">
		<div class="background">
			<Background ref="background" />
		</div>
		<div class="content">
			<Cookie :cookies="game.getCookies()" :increment-cookie="incrementCookie" :notify="notify" />
		</div>
		<div class="menu">
			<Shop :game="game" :notify="notify" />
		</div>
		<div class="notifications">
			<Notifications ref="notifications" />
		</div>
	</div>
</template>