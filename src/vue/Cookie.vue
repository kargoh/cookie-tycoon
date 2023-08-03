<script setup>
    import '../scss/game.scss';

    // Define game vars (props) and functions (emits)
    var props = defineProps(['cookies', 'increment-cookie', 'notify', 'rate']);
</script>

<template>
    <div class="game">
        <div class="cookie">
            <label>
                <span class="cookies">{{ (+(cookies.toFixed(2))).toLocaleString() }} <img src="img/png/cookie.png" onload="this.style.opacity=1"></span>
                <span class="rate" :class="{ disabled: rate == 0 }">+{{ rate.toLocaleString() }}/s</span>
            </label>
            <button class="cookie" @click="notify('+' + incrementCookie().toLocaleString(), $event)">
                <img src="img/svg/star-2.svg" class="star" />
                <img src="img/svg/star-1.svg" class="star" />
                <img src="img/png/cookie.png" onload="this.style.opacity=1">
            </button>
        </div>
    </div>
</template>