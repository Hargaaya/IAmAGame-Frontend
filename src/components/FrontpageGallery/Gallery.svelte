<div class="gallery-container">
	<div class="gallery-featured">
		<slot name="gallery-featured" />
	</div>
	<div class="gallery-regular">
		<slot />
	</div>
</div>

<style>
	.gallery-container {
		padding: 1rem 3rem;
		display: grid;
		grid-template-columns: 3.2fr 1fr;
		grid-template-rows: 1fr;
		gap: 1rem;
		grid-template-areas: 'gallery-featured gallery-regular';
	}

	.gallery-regular {
		grid-area: gallery-regular;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.gallery-featured {
		grid-area: gallery-featured;
	}

	@media (max-width: 1080px) {
		.gallery-container {
			padding: 1rem;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			gap: 0.8rem;
			grid-template-areas:
				'gallery-featured'
				'gallery-regular';
		}
	}

	@media (max-width: 768px) {
		.gallery-container {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}
	}
</style>
