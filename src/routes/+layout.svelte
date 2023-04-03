<svelte:head>
	<title>I am a game</title>
</svelte:head>

<div class="page-container">
	<nav>
		<a href="/" class="nav-header"> I am a game</a>
	</nav>

	<main>
		<slot />
	</main>

	<footer>
		<p>
			Made by <a href="https://github.com/hargaaya" target="blank">Hargaaya</a> and
			<a href="https://github.com/kybbe" target="blank">Jacob</a>, check us out!
		</p>
		<b>BING CHILLING 🍦</b>
	</footer>
</div>

<style>
	.page-container {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
	}

	nav a {
		color: black;
		text-decoration: none;
	}

	.nav-header {
		font-size: 1.5rem;
		text-decoration: none;
		font-family: monospace;
	}

	main {
		padding-bottom: 4rem;
		flex: 1;
	}

	footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 4rem;
		padding: 0.5rem 5rem;
		background: #ebebeb;
		font-family: monospace;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	footer a {
		color: #0059ff;
		text-decoration: none;
	}

	footer b {
		color: transparent;
	}

	@media (max-width: 768px) {
		footer b {
			display: none;
		}
	}
</style>
