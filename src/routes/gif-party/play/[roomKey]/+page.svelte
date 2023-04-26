<script lang="ts">
	import { HubConnectionBuilder } from '@microsoft/signalr';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { GameRoom, Player } from '../../../../types/global';
	import Autocomplete from "../../../../components/GifSearchBar/Autocomplete.svelte";
	import GifList from "../../../../components/GifSearchBar/GifList.svelte";
	import SearchBar from "../../../../components/GifSearchBar/SearchBar.svelte";
	import type { TenorGif } from "../../../../types/global";

	let roomKey = $page.params.roomKey;
	let loading = true;
	let error = false;
	let connection = new HubConnectionBuilder().withUrl(`${PUBLIC_BACKEND_URL}/hub/gifparty`).build();
	let playerName = '';
	let player = null as Player | null;

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
			})
			.catch(() => {
				loading = false;
				error = true;
			});
	});

	const addPlayer = () => connection.send('AddPlayer', roomKey, playerName);
	const changePlayerReady = () => {
		if (!player) return;
		connection.send('SetPlayerReadyState', roomKey, player, player.isReady);
	};
	const leave = () => {
		if (!player) return;
		connection.send('RemovePlayer', roomKey, player);
		window.location.href = `/gif-party/play`;
	};
	connection.on('ReceivePlayer', (p) => {
		console.log('recievedPlayer: ', p);
		player = p;

		// add query param to url with player id
		const url = new URL(window.location.href);
		url.searchParams.set('playerId', p.id);
		window.history.replaceState({}, document.title, url.toString());
	});

	connection.onclose(() => {
		window.location.reload();
	});

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
</script>

{#if loading}
	<div>loading...</div>
{:else}
	<div class="container">
		{#if player}
			<div class="textContainer">
				<h1>Game code is: {roomKey}</h1>
				<br />
				<h2>Your in, {player.name}!</h2>
				<h2>See your name on the screen?</h2>

				<div style={player.isReady ? 'color: green;' : 'color: rgb(255, 132, 0);'}>
					<label for="isReady">Ready?</label>
					<input type="checkbox" bind:checked={player.isReady} on:change={changePlayerReady} />
				</div>

				<br />

				<button type="button" on:click={leave}>Leave</button>

				<div class="gifPartyContainer">
					<h1>Gif Party</h1>
					<SearchBar searchTerm={searchTerm} setAutoComplete={setAutoComplete} setSearchTerm={setSearchTerm} setGifs={setGifs} />
					<Autocomplete autoCompleteText={autoCompleteText} setSearchTerm={setSearchTerm} />
					<GifList selectedGif={selectedGif} setSelectedGif={setSelectedGif} gifs={gifs} />
				</div>
			</div>
		{:else}
			<div class="addContainer">
				<input type="text" bind:value={playerName} />
				<button on:click={addPlayer} disabled={loading}>Add Me!</button>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;

		.textContainer {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	.gifPartyContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.addContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
</style>
