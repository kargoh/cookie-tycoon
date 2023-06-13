<script setup>
	import '../scss/shop.scss';

	// Inherit game prop
	var props = defineProps(['game']);
</script>

<template>
	<div class="shop">
		<label>Store</label>
		<ul>
			<li v-for="(item, key, index) of game.shop.items">
				<button @click="game.purchaseFromShop(key)" :disabled="game.getOrderFromShop(key)">
					{{ item.name }}
					<span class="cost">{{ game.getOrderFromShop(key) ? 'Owned' : item.cost }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>