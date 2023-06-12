<script setup>
    import { ref } from 'vue';
    import '../scss/background.scss';

    // Initialize empty array of cookies
    var cookies = ref([]);

    // Add a cookie to the background
    function addCookie() {
        var time = 1000; // ms
        var cookie = {
            style: 'left: ' + (Math.random() * 100) + '%; animation: rainDown ' + (time / 1000) + 's ease-in; animation-fill-mode: forwards;'
        };

        // Add cookie to array
        cookies.value.push(cookie);

        // Add timer to remove cookie
        setTimeout(function() {
            removeCookie(cookie);
        }, time);
    }

    // Remove a cookie from the background
    function removeCookie(cookie) {
        var index = cookies.value.indexOf(cookie);
        if (index !== -1) {
            cookies.value.splice(index, 1);
        }
    }

    // Expose "addCookie()" function to App.vue
    defineExpose({ addCookie });
</script>

<template>
    <TransitionGroup>
        <img v-for="(cookie, index) of cookies" src="img/png/cookie.png" :style="cookie.style" :key="cookie" />
    </TransitionGroup>
</template>