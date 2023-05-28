<script lang="ts">
  import type { HubConnection } from '@microsoft/signalr';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { GameRoom } from '../../types/global';
	import QrCode from '../QRCode.svelte';

  export let loading = true;
	export let error = false;
  export let game = null as GameRoom | null;
  export let connection: HubConnection;
  let linkForUsers = '';

  onMount(() => {
    if(window) {
      const url = new URL(window.location.href);
      url.pathname = `/gif-party/play/${$page.params.roomKey}`;
      linkForUsers = url.toString();
    }
  });

  connection.on('PlayerJoined', (p) => {
		console.log('playerJoined: ', p);
		if(!game) return;
		game = { ...game, players: [...game.players, p] };
	});
  connection.on('PlayerLeft', (p) => {
    console.log('playerLeft: ', p);
    if(!game) return;
    game = { ...game, players: game.players.filter((player) => player.id !== p.id) };
  });

  connection.onclose(() => {
		window.location.reload();
	});

  function startGame() {
    if(!game || game.players.length < 2) {
      alert('You need at least 2 players to start the game!');
      return;
    }
    for(const player of game.players) {
      if(!player.isReady) {
        alert('Not all players are ready yet!');
        return;
      }
    }
    connection.send('StartGame', $page.params.roomKey);
  }
</script>

{#if loading}
	<div>loading...</div>
{:else if error}
  <h1>An error occured! Please try again later!</h1>
{:else}
  <div class="container">
    <div class="header">
      <h2>Game code is: {$page.params.roomKey}</h2>
      {#if linkForUsers}
        <QrCode url={linkForUsers} />
      {/if}
    </div>

    {#if game}
      {#if game.players.length > 0}
        <div>
          <h2>Players</h2>
          <ul>
            {#each game.players as player}
              <li class={"player" + (player.isReady ? " ready" : "")}>{player.isReady ? "Ready!" : ""} {player.name}</li>
            {/each}
          </ul>
        </div>
      {:else}
        <h3>No players yet...</h3>
      {/if}
      <button class="startButton" on:click={startGame}>Start Game</button>
    {/if}
  </div>
{/if}

<style lang="scss">
	.player {
		animation: markRed 0.4s ease-in-out forwards;

		&.ready {
			color: green;
		}

    &:not(.ready) {
      color: rgb(255, 132, 0);
    }
	}

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
    gap: 4em;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: x-large;
      }
    }

    .startButton {
      color: green;
      
      &:hover, &:focus {
        box-shadow: 0px 0px 6px rgba(0, 255, 0, 0.35);
      }
    }
  }

	@keyframes markRed {
		0% {
			background-color: white;
		}
		50% {
			background-color: rgb(243, 174, 78);
		}
		100% {
			background-color: white;
		}
	}
</style>