<script setup>
    import '../scss/review.scss';
    import { ref } from 'vue';

    var review = ref(chrome.tabs != null);

    function writeReview() {
        review.value = false;
        if (chrome.tabs) chrome.tabs.create({ url: 'https://chrome.google.com/webstore/detail/cookie-tycoon/kiecejcohibdmhapebfjojofpofaijni/reviews' });
    }

    // Hide reviews if clicking the game
    window.addEventListener('pointerup', function(e) {
        if (e.target.className != 'review-button') review.value = false;
    })
</script>

<template>
    <div class="review" v-if="review == true">
        <button class="review-button" @click="writeReview()">Write a review <img src="img/svg/icon-heart.svg" ></button>
    </div>
</template>