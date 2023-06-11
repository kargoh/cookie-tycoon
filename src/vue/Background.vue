<script setup>
    import { ref } from 'vue';
    import { Background } from '../js/Background.js';
    import '../scss/background.scss';

    var background = ref(new Background());

    // Define game vars (props) and functions (emits)
    var props = defineProps(['background']);
    defineExpose({ background });
</script>

<template>
    <TransitionGroup>
        <img v-for="(cookie, index) of background.cookies" src="img/png/cookie.png" :style="cookie.style" :key="cookie" />
    </TransitionGroup>
</template>