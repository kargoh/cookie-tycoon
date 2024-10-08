<script setup>
  import '../scss/popup.scss';
  import { ref, onMounted, onUnmounted } from 'vue';

  // Initialize attributes
  var text = ref('');
  var inputs = ref([]);
  var isOpen = ref(false);

  // Add event listener(s)
  function addEventListeners() {
    window.addEventListener('openPopup', openPopup);
    window.addEventListener('closePopup', closePopup);
    window.addEventListener('keydown', keydown);
  }
  
  // Remove event listeners
  function removeEventListeners() {
    window.removeEventListener('openPopup', openPopup);
    window.removeEventListener('closePopup', closePopup);
    window.removeEventListener('keydown', keydown);
  }

  function openPopup(e) {
    isOpen.value = true;

    // Assign values from custom event detail
    if (e.detail) {
      if (e.detail.text) text.value = e.detail.text;
      if (e.detail.inputs) {
        inputs.value = e.detail.inputs;
        inputs.value.forEach(function(input) {
          // Set input event type (ex: click vs change)
          if (input.type == 'file' || input.type == 'range' || input.type == 'text') input.event = 'change';
          else input.event = 'click';
        })
      }
    }
  }

  function closePopup() {
    isOpen.value = false;
  }

  function runCallback(callback, e) {
    if (callback == null) callback = closePopup;
    callback(e);
  }

  function runLastInputCallback(e) {
    var lastInput = inputs.value[inputs.value.length - 1];
    if (lastInput) runCallback(lastInput.callback, e);
  }

  function keydown(e) {
    if (isOpen.value == true) {
      var jumpKeys = ['Space', 'Enter', 'Escape'];
      if (jumpKeys.indexOf(e.code) > -1) {
        // Close popup
        e.preventDefault();
        runLastInputCallback(e);
      }
    }
  }

  onMounted(function() {
    addEventListeners();
  });

  onUnmounted(function() {
    removeEventListeners();
  });
</script>

<template>
  <Transition name="fade-bubble-popup">
    <div class="popup" v-if="isOpen == true">
      <div class="background" @click="runLastInputCallback"></div>
      <div class="container">
        <div class="content">
          <div class="text" v-html="text"></div>
          <div class="inputs">
            <template v-for="(input, index) of inputs">
              <label v-if="input.label" :for="'popup-' + input.type + '-' + index">{{ input.label }}</label>
              <input :class="input.class" :id="'popup-' + input.type + '-' + index" :type="input.type" :value="input.value" :min="input.min" :max="input.max" :step="input.step" :accept="input.accept" :style="input.style" v-on:[input.event]="runCallback(input.callback, $event)">
            </template>
          </div>
          <a class="close" @click="runLastInputCallback">
            <span class="material-symbols-outlined">close</span>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style>
  .fade-bubble-popup-enter-active, .fade-bubble-popup-leave-active { transition: opacity 0.1s ease; }
  .fade-bubble-popup-enter-from, .fade-bubble-popup-leave-to { opacity: 0; }
</style>