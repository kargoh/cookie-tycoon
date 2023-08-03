<script setup>
	import { ref, onMounted } from 'vue';
	import '../scss/version.scss';

	// Init version
	var version = ref('');

	async function updateVersion() {
		// Load version asynchronously (Vite doesn't like JSON from /public dir)
        var response = await fetch('/manifest.json');
        var json = await response.json();
        version.value = json.version;
	}
	
	onMounted(async () => {
		updateVersion();
	});

</script>

<template>
	<div class="version">v{{ version }}</div>
</template>