<script setup>
	import '../scss/shop.scss';

	// Inherit game prop
	var props = defineProps(['game']);
</script>

<template>
	<div class="shop">
		<label>Store</label>
		<ul>
			<li v-for="(item, key, index) of game.shop">
				<button @click="game.purchase(key)" :disabled="game.orders[key]">
					{{ item.name }}
					<span class="cost">{{ game.orders[key] ? 'Owned' : item.cost }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>