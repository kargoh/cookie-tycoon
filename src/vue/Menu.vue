<script setup>
  import { ref, onMounted } from 'vue';
  import '../scss/menu.scss';

  // Init refs
  var isOpen = ref(false)
  var props = defineProps(['game']);
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

  function syncData() {
    props.game.syncData();
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
        <span class="close"><span class="material-symbols-outlined">close</span></span>
      </label>
    </button>
    <ul class="nav" :class="{ visible: isOpen == true }">
      <li>
        <button @click="syncData()">
          <span class="material-symbols-outlined">cloud_upload</span> Sync Data
        </button>
      </li>
      <li>
        <button @click="openFullscreen()">
          <span class="material-symbols-outlined">fullscreen</span> Open Fullscreen
        </button>
      </li>
      <li class="stats">
        <div class="label"><span class="material-symbols-outlined">bar_chart</span> Cookie Production</div>
        <ul>
          <li v-for="(item, key, index) of game.shop" :style="{ animationDelay: (index * 50) + 'ms' }">
            <span class="icon material-symbols-outlined" :style="{ 'background': item.icon.color }" v-if="item.icon">{{ item.icon.name }}</span>
            <span class="text">{{ item.name }}: +{{ game.getItemAmount(key).toLocaleString() }}{{ item.tooltip }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>