<script setup>
	import { ref, onMounted } from 'vue';
	import '../scss/version.scss';

	// Init version
	var version = ref('0.0.0');

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
	<label class="color version">v{{ version }}</label>
</template>