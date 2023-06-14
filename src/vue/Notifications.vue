<script setup>
    import { ref } from 'vue';
    import '../scss/notifications.scss';

    // Initialize empty array of notifications
    var notifications = ref([]);

    // Add a notification to the background
    function addNotification(text, $event) {
        var left = $event ? $event.clientX + 'px' : '50%';
        var top = $event ? $event.clientY + 'px' : '90%';
        var time = 1000; // ms
        var notification = {
            text: text,
            style: 'left: ' + left + '; top: ' + top + '; animation: fadeUp ' + (time / 1000) + 's ease-in-out; animation-fill-mode: forwards;'
        };

        // Add notification to array
        notifications.value.push(notification);

        // Add timer to remove notification
        setTimeout(function() {
            removeNotification(notification);
        }, time);
    }

    // Remove a notification from the background
    function removeNotification(notification, $event) {
        var index = notifications.value.indexOf(notification);
        if (index !== -1) {
            notifications.value.splice(index, 1);
        }
    }

    // Expose "addNotification()" function to App.vue
    defineExpose({ addNotification });
</script>

<template>
    <TransitionGroup>
        <label class="color" v-for="(notification, index) of notifications" :style="notification.style" :key="notification">
            {{ notification.text }}
        </label>
    </TransitionGroup>
</template>