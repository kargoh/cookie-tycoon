<script setup>
	import '../scss/style.scss';
	import { ref } from 'vue';

	// Initialize modes
	var screen = ref('desktop'); // Options: desktop, tablet, mobile
	var height = ref('fold'); // Options: fold, full, scale
	var image = ref('/public/img/jpg/background.jpg');

	// Use file input to update image source
	function updateImage(event) {
		var file = event.target.files[0];
		if (file) {
			var reader = new FileReader();
			var rawImage;
			reader.onloadend = function() {
				rawImage = reader.result;
				image.value = rawImage;
			}
			reader.readAsDataURL(file);
		}
	}
</script>

<template>

	<div class="view">
		<div class="container">
			<div class="row justify-content-end">
				<div class="col">
					<div class="options screen">
						<button :class="{ active: screen == 'desktop' }" @click="screen = 'desktop'">
							<span class="material-symbols-outlined">desktop_windows</span>
							<label>{{ screen }}</label>
						</button>
						<button :class="{ active: screen == 'tablet' }" @click="screen = 'tablet'">
							<span class="material-symbols-outlined">laptop_chromebook</span>
							<label>{{ screen }}</label>
						</button>
						<button :class="{ active: screen == 'mobile' }" @click="screen = 'mobile'">
							<span class="material-symbols-outlined">phone_iphone</span>
							<label>{{ screen }}</label>
						</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<div class="options height">
						<button :class="{ active: height == 'fold' }" @click="height = 'fold'">
							<span class="material-symbols-outlined">insert_page_break</span>
							<label>{{ height }}</label>
						</button>
						<button :class="{ active: height == 'full' }" @click="height = 'full'">
							<span class="material-symbols-outlined">fit_screen</span>
							<label>{{ height }}</label>
						</button>
						<button :class="{ active: height == 'scale' }" @click="height = 'scale'">
							<span class="material-symbols-outlined">aspect_ratio</span>
							<label>{{ height }}</label>
						</button>
					</div>
				</div>
				<div class="col">
					<div class="preview" :class="screen">
						<div class="image" :class="height" :style="{ 'background-image': image != undefined ? 'url(' + image + ')' : '' }">
							<input type="file" ref="image" accept="image/png, image/jpeg" @change="updateImage" hidden>
							<button @click="$refs.image.click()">
								<span class="material-symbols-outlined">image</span>
							</button>
						</div>
						<div class="content">
							<div class="title">The Fold</div>
							<p>This is your website content.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>