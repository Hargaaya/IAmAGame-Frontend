<script lang="ts">
	import { onMount } from "svelte";
	import Lobby from "../../../../components/Client/Lobby.svelte";
	import type { Game, GameRoom, Player, TenorGif } from "../../../../types/global";
	import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
	import { page } from "$app/stores";
	import { PUBLIC_BACKEND_URL } from "$env/static/public";
	import GifList from "../../../../components/GifSearchBar/GifList.svelte";
	import SearchBar from "../../../../components/GifSearchBar/SearchBar.svelte";
	import Autocomplete from "../../../../components/GifSearchBar/Autocomplete.svelte";
	import sortPlayersByPoints from "../../../../helpers/SortPlayersByScore";
	import GetWinningPlayer from "../../../../helpers/GetWinningPlayer";

	let roomKey = $page.params.roomKey;
	let loading = true;
	let error = false;
	let connection = new HubConnectionBuilder().withUrl(`${PUBLIC_BACKEND_URL}/hub/gifparty`).withAutomaticReconnect([2000]).build();
	let game = null as GameRoom | null;
	let currentGame = undefined as Game | undefined;
	let player = null as Player | null;

	let gifs = [] as TenorGif[];
	let searchTerm = "";
	let autoCompleteText = "";
	let selectedGif = undefined as TenorGif | undefined;

	function setGifs (newGifs: TenorGif[]) {
		gifs = newGifs;
	}

	function setSearchTerm (newSearchTerm: string) {
		searchTerm = newSearchTerm;
	}

	function setAutoComplete (newAutoComplete: string) {
		autoCompleteText = newAutoComplete;
	}

	function setSelectedGif (newSelectedGif: TenorGif | undefined) {
		selectedGif = newSelectedGif;
	}

	function sendSelectedGif () {
		if (!selectedGif) return;
		connection.send('AddSubmission', roomKey, player, selectedGif.media_formats.gif.url);
	}

	onMount(() => {
		connection
			.start()
			.then(() => {
				loading = false;

				// get query param for player id
				const url = new URL(window.location.href);
				const playerId = url.searchParams.get('playerId');
				if (playerId) {
					connection.send('GetPlayer', roomKey, playerId);
				}
				connection.send('GetGame', $page.params.roomKey);
			})
			.catch(() => {
				loading = false;
				error = true;
			});
	});

	const leave = () => {
		if (!player) return;
		connection.send('RemovePlayer', roomKey, player);
		window.location.href = `/gif-party/play`;
	};
	connection.on('ReceivePlayer', (p: Player) => {
		console.log('recievedPlayer: ', p);
		player = p;

		// add query param to url with player id
		const url = new URL(window.location.href);
		url.searchParams.set('playerId', p.id);
		window.history.replaceState({}, document.title, url.toString());
	});
	connection.on('ReceiveGame', (g: GameRoom) => {
		console.log('recievedGame: ', g);
		game = g;
		connection.send('GetPlayer', roomKey, player?.id);
	});

	connection.onclose(() => {
		window.location.reload();
	});

	$: currentGame = game?.games.filter((g: Game) => g.current)[0];

	$: if (!player && game && game.gameState > 0) {
		alert('The game has already started!');
		window.location.href = `/gif-party/play`;
	}
</script>

<h1 style="text-align: center;">Gif Party</h1>
<div class="gameContainer">
	{#if game && game.gameState === 0} <!-- Lobby -->
		<Lobby connection={connection} loading={loading} error={error} player={player} />

	{:else if game && game.gameState === 1} <!-- Game is Running -->

		{#if currentGame && currentGame.gameState === 0} <!-- Choosing / inputting phrase -->
			<h2>Game started! Inputting a phrase on the big screen..</h2>
		{:else if currentGame && currentGame.gameState === 1} <!-- Taking submissions -->
			<h2>The phrase is: {currentGame.phrase}</h2>

			<div class="gifPartyContainer">
				<SearchBar searchTerm={searchTerm} setAutoComplete={setAutoComplete} setSearchTerm={setSearchTerm} setGifs={setGifs} />
				<Autocomplete autoCompleteText={autoCompleteText} setSearchTerm={setSearchTerm} />
				<GifList selectedGif={selectedGif} setSelectedGif={setSelectedGif} gifs={gifs} />

				{#if selectedGif}
					<button class="gifSubmit" type="button" on:click={sendSelectedGif}>Submit GIF</button>
				{/if}
			</div>

		{:else if currentGame && currentGame.gameState === 2} <!-- Voting -->
			{#if player && !player.hasVoted}
        <h2>Vote for your favourite answer!</h2>

				{#if currentGame && currentGame.submissions}
					{#each currentGame.submissions as submission}
						<button on:click={() => connection.send('Vote', roomKey, player, submission.playerId)}>
							<img src={submission.gifUrl} alt="gif" style="aspect-ratio: 16/9; height: 200px;" />
						</button>
					{/each}
				{/if}
			{:else}
        <h2>Waiting for other players to vote..</h2>
      {/if}

		{:else if currentGame && currentGame.gameState === 3} <!-- Game ended -->
			<h1>{GetWinningPlayer(game.players, currentGame).name === player?.name ? "You" : GetWinningPlayer(game.players, currentGame).name} won this round!</h1>

			<br />

      {#each sortPlayersByPoints(game.players) as p, i}
        <h3 style={i === 0 ? "color: green; font-size: x-large" : ""}>{p.name === player?.name ? "You have" : p.name + " has"} {p.score} point{p.score !== 1 ? "s" : ""}</h3>
      {/each}

		{/if}

	{:else if game && game.gameState === 2} <!-- Game ended -->
		<h2>Game ended!</h2>

		<h1>{GetWinningPlayer(game.players).name === player?.name ? "You" : GetWinningPlayer(game.players).name} won!</h1>

		<br />

    {#each sortPlayersByPoints(game.players) as p, i}
			<h3 style={i === 0 ? "color: green; font-size: x-large" : ""}>{p.name === player?.name ? "You" : p.name} got {p.score} point{p.score !== 1 ? "s" : ""}</h3>
    {/each}
	{/if}

	<button class="leaveButton" type="button" on:click={leave}>Leave</button>
</div>

<style lang="scss">
  .gameContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

	.gifPartyContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.leaveButton {
		position: fixed;
		top: 10px;
		right: 10px;
		color: red;

		&:hover, &:focus {
			box-shadow: 0px 0px 6px rgba(255, 0, 0, 0.35);;
		}
	}

	.gifSubmit {
		position: fixed;
		bottom: 10px;
		right: 50%;
		transform: translateX(50%);
		z-index: 3;
		
		padding: 10px;
		border-radius: 10px;
		border: none;
		background-color: #4CAF50;
		color: white;
		font-size: 16px;
		cursor: pointer;

		&:hover, &:focus {
			background-color: #3e8e41;
			box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
		}
	}
</style>