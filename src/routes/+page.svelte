<script lang="ts">
	import Gallery from '../components/FrontpageGallery/Gallery.svelte';
	import GalleryItem from '../components/FrontpageGallery/GalleryItem.svelte';
</script>

<Gallery>
	<GalleryItem
		slot="gallery-featured"
		title="Gif Party"
		image="./images/black_balloons.jpg"
		featured={true}
	/>
	<GalleryItem title="Whose Lie Is It Anyway?" image="./images/purple_imps.jpg" />
	<GalleryItem title="Trivia Clash" image="./images/people_laughing.jpg" />
	<GalleryItem title="Word Twist" image="./images/multicolor_wool.jpg" />
</Gallery>
