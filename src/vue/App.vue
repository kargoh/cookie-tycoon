<script setup>
	import '../scss/style.scss';
	import Game from './Game.vue';
	import Shop from './Shop.vue';
</script>

<template>
	<div class="ui">
		<div class="content">
			<Game />
		</div>
		<div class="menu">
			<Shop />
		</div>
	</div>
</template>