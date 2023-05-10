<script lang="ts">
	import type { HubConnection } from '@microsoft/signalr';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { GameRoom, Player, TenorGif } from '../../types/global';
	import Autocomplete from "../GifSearchBar/Autocomplete.svelte";
	import GifList from "../GifSearchBar/GifList.svelte";
	import SearchBar from "../GifSearchBar/SearchBar.svelte";

  let roomKey = $page.params.roomKey;
	export let loading = true;
	export let error = false;
  export let connection: HubConnection;
	export let player = null as Player | null;

	let playerName = '';

  const addPlayer = () => connection.send('AddPlayer', roomKey, playerName);
	const changePlayerReady = () => {
		if (!player) return;
		connection.send('SetPlayerReadyState', roomKey, player, player.isReady);
	};
</script>

{#if loading}
	<div>loading...</div>
{:else if error}
  <div>error</div>
{:else}
	<div class="container">
		{#if player}
			<div class="textContainer">
				<h1>Game code is: {roomKey}</h1>
				<br />
				<h2>Your in, {player.name}!</h2>
				<h2>See your name on the screen?</h2>

				<div class="readyContainer" style={player.isReady ? 'color: green;' : 'color: rgb(255, 132, 0);'}>
					<label for="isReady">Ready?</label>
					<input type="checkbox" bind:checked={player.isReady} on:change={changePlayerReady} />
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

			.readyContainer {
				font-size: x-large;
				
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.5em;

				input[type='checkbox'] {
					width: 1em;
					height: 1em;
				}
			}
		}
	}

	.addContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
</style>
