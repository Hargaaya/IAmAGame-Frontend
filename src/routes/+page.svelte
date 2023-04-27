<script lang="ts">
	import Gallery from '../components/FrontpageGallery/Gallery.svelte';
	import GalleryItem from '../components/FrontpageGallery/GalleryItem.svelte';
</script>

<Gallery>
	<GalleryItem
		slot="gallery-featured"
		title="Gif Party"
		description="A game where you have to react to the message you get with a gif. Perfect for 4 or more players. The more the merrier!"
		image="./images/black_balloons.jpg"
		featured={true}
		link="/gif-party"
	/>
	<GalleryItem image="./images/purple_imps.jpg" link="/whose-lie-is-it-anyways" />
	<GalleryItem image="./images/people_laughing.jpg" link="/trivia-clash" />
	<GalleryItem image="./images/multicolor_wool.jpg" link="/word-twist" />
</Gallery>
