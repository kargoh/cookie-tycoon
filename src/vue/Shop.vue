<script setup>
	import { ref } from 'vue';
	import '../scss/shop.scss';

	// Inherit game prop/functions
	var props = defineProps(['game', 'notify']);
	var purchaseAmount = ref(1);

	function isDisabled(key) {
		var disabled = false;
		var shop = props['game'].shop;
		var orders = props['game'].orders;
		var stock = orders[key] || 0;

		// Disable if player stock is >= shop.json stock
		if (stock >= shop[key].stock && shop[key].stock != -1) disabled = true;
		return disabled;
	}
</script>

<template>
	<div class="shop">
		<div class="top">
			<label>Shop</label>
		</div>
		<div class="shop-buttons">
			<button @click="purchaseAmount = 1;" class="shop-button" :class="{ toggle: purchaseAmount == 1 }">Buy 1</button>
			<button @click="purchaseAmount = 10;" class="shop-button" :class="{ toggle: purchaseAmount == 10 }">Buy 10</button>
			<button @click="purchaseAmount = 100;" class="shop-button" :class="{ toggle: purchaseAmount == 100 }">Buy 100</button>
		</div>
		<ul>
			<li v-for="(item, key, index) of game.shop">
				<button @click="game.purchase(key, $event, notify, purchaseAmount);" :disabled="isDisabled(key)">
					<span class="text">{{ item.name }}</span>
					<div class="info">
						<span class="price">{{ isDisabled(key) ? 'Maxed' : (game.getPrice(key, purchaseAmount).toLocaleString() || 0) }}<img src="img/png/cookie.png"></span>
						<span class="quantity">{{ (game.orders[key] || 0).toLocaleString() + '/' + (game.shop[key].stock != -1 ? game.shop[key].stock : '∞') }}</span>
					</div>
					<span class="tooltip">{{ item.tooltip }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>