<script>
	import Ghost from '../assets/Ghost.svelte';
</script>

<div class="container">
	<Ghost size="10rem" />
	<span>
		<h1>404 - You seem to be lost!</h1>
		<a href="/"><button>Go back home</button></a>
	</span>
</div>

<style>
	.container {
		margin: 4rem auto;

		font-family: monospace;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	span {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		align-items: flex-start;

		margin-left: 1rem;
	}

	span a button {
		background-color: e6e6e6;
		border: none;
		border-radius: 10px;
		padding: 1rem;
		font-size: 1rem;
		color: black;
	}

	@media (max-width: 600px) {
		.container {
			flex-direction: column;
		}

		span {
			align-items: center;
			margin-top: 1rem;
			text-align: center;
		}
	}
</style>
