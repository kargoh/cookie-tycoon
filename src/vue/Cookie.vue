<script setup>
    import '../scss/game.scss';

    // Define game vars (props) and functions (emits)
    var props = defineProps(['count', 'action']);
</script>

<template>
    <div class="game">
        <div class="cookie">
            <label class="color">{{ count }} cookies</label>
            <button class="cookie" @click="action()">
                <img src="img/png/cookie.png">
            </button>
        </div>
    </div>
</template>