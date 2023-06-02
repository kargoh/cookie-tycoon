<script setup>
	import '../scss/style.scss';
	import { ref } from 'vue';

	// Initialize modes
	var screen = ref('desktop'); // Options: desktop, tablet, mobile
	var height = ref('fold'); // Options: fold, full, scale
</script>

<template>

	<div class="view">
		<div class="options screen"></div>
		<div class="device">
			<div class="image"></div>
			<div class="content">The Fold</div>
		</div>
		<div class="options height">
			<button>
				<span class="material-symbols-outlined">fit_screen</span>
			</button>
		</div>
	</div>
</template>