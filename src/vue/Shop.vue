<script setup>
	import '../scss/shop.scss';

	// Inherit game prop/functions
	var props = defineProps(['game', 'notify']);
</script>

<template>
	<div class="shop">
		<label>Store</label>
		<ul>
			<li v-for="(item, key, index) of game.shop">
				<button @click="game.purchase(key, $event, notify);" :disabled="game.orders[key]">
					{{ item.name }}
					<span class="price">{{ game.orders[key] ? 'Owned' : item.price }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>