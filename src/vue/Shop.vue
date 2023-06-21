<script setup>
	import '../scss/shop.scss';

	// Inherit game prop/functions
	var props = defineProps(['game', 'notify']);

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
		<label>Shop</label>
		<ul>
			<li v-for="(item, key, index) of game.shop">
				<button @click="game.purchase(key, $event, notify);" :disabled="isDisabled(key)">
					{{ item.name }}
					<div class="info">
						<span class="price">{{ isDisabled(key) ? 'Maxed' : (item.price || 0) }}<img src="img/png/cookie.png"></span>
						<span class="quantity">{{ (game.orders[key] || 0) + '/' + (game.shop[key].stock != -1 ? game.shop[key].stock : '∞') }}</span>
					</div>
				</button>
			</li>
		</ul>
	</div>
</template>