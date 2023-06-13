<script setup>
    import '../scss/game.scss';

    // Define game vars (props) and functions (emits)
    var props = defineProps(['game']);
</script>

<template>
    <div class="game">
        <div class="cookie">
            <label class="color">{{ game.getCookies() }} cookies</label>
            <button class="cookie" @click="game.increment()">
                <img src="img/png/cookie.png">
            </button>
        </div>
    </div>
</template>