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

	function updateItemDescription(item) {
		var description = item.description;
		var index_1 = description.indexOf('#{');
		var index_2 = description.indexOf('}');
		var before = description.substring(0, index_1);
		var func = description.substring(index_1 + 2, index_2);
		var funcValue = game[func] ? game[func]() : '';
		var after = description.substring(index_2 + 1);

		// Truncate parts and call game function from JSON funcValue
		return before + funcValue + after;
	}

	function getToolTip(key, item) {
		// default with no orders
		var cookieProduction = (key != "prestige") ? game.getItemAmount(key, 1) : 1;

		// if there are orders then divide amount by the orders
		if (game.orders[key]) {
			cookieProduction = (key != "prestige") ? (game.getItemAmount(key, 1) / game.orders[key]) : 1;
		}

		return "+" + (cookieProduction).toLocaleString() + item.tooltip
	}
</script>

<template>
	<div class="shop">
		<div class="shop-buttons">
			<button @click="purchaseAmount = 1;" class="shop-button" :class="{ toggle: purchaseAmount == 1 }">Buy 1</button>
			<button @click="purchaseAmount = 10;" class="shop-button" :class="{ toggle: purchaseAmount == 10 }">Buy 10</button>
			<button @click="purchaseAmount = 100;" class="shop-button" :class="{ toggle: purchaseAmount == 100 }">Buy 100</button>
		</div>
		<ul>
			<li v-for="(item, key, index) of game.shop" :style="{ animationDelay: (index * 100) + 'ms' }">
				<button :class="key" @click="game.purchase(key, $event, notify, purchaseAmount);" :disabled="isDisabled(key)">
					<span class="icon material-symbols-outlined" :style="{ 'background': item.icon.color }" v-if="item.icon">{{ item.icon.name }}</span>
					<span class="text">{{ item.name }}</span>
					<div class="info">
						<span class="price" v-if="item.price > 0">{{ isDisabled(key) ? 'Maxed' : (game.getPrice(key, purchaseAmount).toLocaleString() || 0) }}<img src="img/png/cookie.png"></span>
						<span class="quantity">{{ (game.orders[key] || 0).toLocaleString() + '/' + (game.shop[key].stock != -1 ? game.shop[key].stock : '∞') }}</span>
					</div>
					<label class="description color" v-if="item.description" :style="{ 'background': item.icon.color }" v-html="updateItemDescription(item)"></label>
					<span class="tooltip">{{ getToolTip(key, item) }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>