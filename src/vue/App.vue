<script setup>
	import '../scss/style.scss';
	import { ref, onMounted } from 'vue';
    import { Game } from '../js/Game.js';
    import Cookie from './Cookie.vue';
    import Background from './Background.vue';
    import Notifications from './Notifications.vue';
    import Shop from './Shop.vue';
	import Review from './Review.vue';
	import Menu from './Menu.vue';

	// Initialize Vue variables
    var game = ref(window.game = new Game());
    var background = ref();
    var notifications = ref();

    // Increment cookie count (this gets called by Cookies.vue)
	function incrementCookie() {
		var amount = game.value.increment()
		background.value.addCookie();
		return amount;
	}

	function autoIncrement() {
		// Increment cookies for worker types (ex: oven, bakery, etc.)
		setInterval(() => {
			var amount = game.value.autoIncrement();
			if (amount > 0) {
				background.value.addCookie();
				notify('+' + amount.toLocaleString());
			}
		}, 1000);
	}

	function notify(text, $event) {
		notifications.value.addNotification(text, $event);
	}

	function purchaseAmountToggle() {
		window.addEventListener("DOMContentLoaded", (event) => {
			var menuToggles = document.querySelectorAll('.shop-button');
			var prevToggle;
			for (var i = 0, len = menuToggles.length; i < len; i++) {
				menuToggles[i].setAttribute("dataIndex", i)
				menuToggles[i].addEventListener("click", function(e) {
					if (prevToggle) {
						prevToggle.classList.remove("toggle")
					}
					menuToggles[e.target.attributes.dataIndex.value].classList.add("toggle")

					prevToggle = menuToggles[e.target.attributes.dataIndex.value]
				});
			}
		});
	}

	onMounted(() => {
		autoIncrement();
		purchaseAmountToggle();
	})
</script>

<template>
	<div class="ui">
		<div class="background">
			<Background ref="background" />
		</div>
		<div class="content">
			<Cookie :cookies="game.getCookies()" :rate="game.rate" :increment-cookie="incrementCookie" :notify="notify" />
		</div>
		<div class="aside">
			<Shop :game="game" :notify="notify" />
		</div>
		<div class="notifications">
			<Notifications ref="notifications" />
		</div>
		<Menu :game="game" />
		<Review />
	</div>
</template>