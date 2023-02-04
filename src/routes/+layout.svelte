<svelte:head>
	<title>Layout header</title>
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
		min-height: 100vh;
	}

	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
		background: #f0f0f0;
	}

	.nav-header {
		color: black;
		font-size: 1.5rem;
		text-decoration: none;
		font-family: 'Gugi';
	}

	main {
		flex: 1;
		padding-bottom: 4rem;
	}

	footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 4rem;
		padding: 0.5rem 5rem;
		background: #f0f0f0;
		font-family: 'Inter';

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
</style>
