<script lang="ts">
	export let image: string;
	// TODO: replace title with a svg for better performance.
	export let title = 'Missing a title...';
	export let text = 'Missing a description...';
	export let link = '#';
	export let featured = false;

	function extend(e: MouseEvent | KeyboardEvent) {
		window.open(link, '_blank');
	}
</script>

<!-- TODO: make this tabbable -->
<div
	on:click={extend}
	on:keydown={extend}
	class="container"
	style={`background-image: url(${image});`}
>
	<h3 class="grid-title no-shifting">{title}</h3>
	{#if featured}
		<p class="grid-description no-shifting">{text}</p>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		aspect-ratio: 16/9;

		background-size: auto 100%;
		background-position: center;
		text-decoration: none;
		border-radius: 10px;
		cursor: pointer;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
		transition: all 0.12s ease-in;
	}

	.container:hover,
	.container:focus {
		opacity: 0.95;
		transform: scale(1.01);
		box-shadow: 0 0 10px 0 rgba(22, 22, 22, 0.5);
		background-size: 103%;

		/* font blurriness fix */
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-ms-backface-visibility: hidden;
		-webkit-font-smoothing: subpixel-antialiased;
	}

	/* font shifting fix */
	.no-shifting {
		-webkit-transform: translateZ(0);
		-moz-transform: translateZ(0);
		-ms-transform: translateZ(0);
		-o-transform: translateZ(0);
		transform: translateZ(0);
	}

	.grid-title {
		font-family: monospace;
		text-align: center;
		font-size: 1.2rem;
		color: #fff;
	}

	.grid-description {
		font-family: monospace;
		font-size: 0.8rem;
		color: #fff;
	}

	@media (max-width: 1080px) {
		.container {
			flex-basis: 49%;
		}
	}

	@media (max-width: 768px) {
		.container {
			flex: 1 0 49%;
		}

		.grid-title {
			font-size: 1rem;
		}

		.grid-description {
			font-size: 0.8rem;
		}
	}
</style>
