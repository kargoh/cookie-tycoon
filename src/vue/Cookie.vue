<script setup>
    import '../scss/game.scss';

    // Define game vars (props) and functions (emits)
    var props = defineProps(['cookies', 'increment-cookie', 'notify', 'rate']);
</script>

<template>
    <div class="game">
        <div class="cookie">
            <label>
                <span class="cookies">{{ +(cookies.toFixed(2)) }} <img src="img/png/cookie.png"></span>
                <span class="rate" v-if="rate != 0">+{{ rate }}/s</span>
            </label>
            <button class="cookie" @click="notify('+' + incrementCookie(), $event)">
                <img src="img/png/cookie.png">
            </button>
        </div>
    </div>
</template>