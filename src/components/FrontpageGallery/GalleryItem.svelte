<script lang="ts">
	import Play from '../../assets/Play.svelte';

	export let image: string;
	export let title = 'Missing a title...';
	export let description = 'Missing a description...';
	export let link = '#';
	export let featured = false;

	let hover = false;

	function extend(e: MouseEvent | KeyboardEvent) {
		window.open(link, '_blank');
	}
</script>

<!-- TODO: make this tabbable -->
{#if featured}
	<div class="container featured" style={`background-image: url(${image});`}>
		<div class="context">
			<span class="info">
				<h3 class="grid-title">{title}</h3>
				<p class="grid-description">{description}</p>
			</span>
			<a href={link} target="_blank" rel="noreferrer" class="play">
				<button>
					Play {title}
					<Play color="black" size="24" /></button
				>
			</a>
		</div>
	</div>
{:else}
	<div
		on:click={extend}
		on:keydown={extend}
		on:mouseover={() => (hover = true)}
		on:focus={() => (hover = true)}
		on:mouseout={() => (hover = false)}
		on:blur={() => (hover = false)}
		class="container regular hoverable"
		style={`background-image: url(${image});`}
	>
		<Play active={hover} />
	</div>
{/if}

<style>
	.container {
		width: 100%;
		aspect-ratio: 16/9;

		background-size: auto 100%;
		background-position: center;
		text-decoration: none;
		border-radius: 10px;

		display: flex;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
	}

	.featured {
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		padding: 2rem;
	}

	.regular {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.hoverable {
		transition: all 0.12s ease-in;
		cursor: pointer;
	}

	.hoverable:hover,
	.hoverable:focus {
		opacity: 0.95;
		transform: scale(1.01);
		box-shadow: 0 0 10px 0 rgba(22, 22, 22, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.8);
	}

	.context {
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}

	.info {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		padding: 0.5rem 1rem;
		font-family: monospace;
		border: 1px solid rgba(0, 0, 0, 0.5);
		background-color: black;
		color: #ffffff;
		max-width: 50%;
	}

	.play {
		text-decoration: none;
	}

	.play button {
		font-family: monospace;
		font-weight: 500;
		font-size: 1rem;
		text-transform: uppercase;

		background: white;
		border: none;
		outline: none;
		border-radius: 10px;
		padding: 0.5rem 1rem;
		cursor: pointer;

		display: flex;
		gap: 0.5rem;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.play button:hover {
		filter: invert(1);
	}

	.grid-title {
		font-size: 2.6rem;
	}

	.grid-description {
		font-size: 1rem;
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

		.info {
			display: none;
		}
	}
</style>
