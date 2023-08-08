<script setup>
	import { ref, onMounted } from 'vue';
	import '../scss/menu.scss';

	// Init refs
	var isOpen = ref(false)
	var version = ref('0.0.0');

	async function updateVersion() {
		// Load version asynchronously (Vite doesn't like JSON from /public dir)
        var response = await fetch('/manifest.json');
        var json = await response.json();
        version.value = json.version;
	}

	function toggleMenu() {
		isOpen.value = !isOpen.value;
	}

	function openFullscreen() {
		if (chrome.tabs) chrome.tabs.create({ url: location.href });
		else window.open(location.href, '_blank');
    }
	
	onMounted(async () => {
		updateVersion();
	});
</script>

<template>
	<div class="menu">
		<button class="toggle" :class="{ open: isOpen == true }" @click="toggleMenu()">
			<label class="color">
				<span class="material-symbols-outlined">settings</span>
				<span class="version">v{{ version }}</span>
			</label>
		</button>
		<ul class="nav" :class="{ visible: isOpen == true }">
			<li>
				<button @click="openFullscreen()">
					<span class="material-symbols-outlined">fullscreen</span> Open Fullscreen
				</button>
			</li>
		</ul>
	</div>
</template>