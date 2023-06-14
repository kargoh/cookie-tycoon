<script setup>
    import '../scss/game.scss';

    // Define game vars (props) and functions (emits)
    var props = defineProps(['cookies', 'increment-cookie', 'notify']);
</script>

<template>
    <div class="game">
        <div class="cookie">
            <label class="color">{{ cookies }} cookies</label>
            <button class="cookie" @click="incrementCookie(); notify('+' + incrementCookie(), $event)">
                <img src="img/png/cookie.png">
            </button>
        </div>
    </div>
</template>