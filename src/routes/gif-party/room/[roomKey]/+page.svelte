<script lang="ts">
  import { HubConnectionBuilder } from '@microsoft/signalr';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { GameRoom, Player } from '../../../../types/global';

  let loading = true;
	let error = false;
	let connection = new HubConnectionBuilder().withUrl(`${PUBLIC_BACKEND_URL}/hub/gifparty`).build();
  let game = null as GameRoom | null;
  let linkForUsers = '';

  onMount(() => {
		connection
			.start()
			.then(() => {
				loading = false;

        connection.send('GetGame', $page.params.roomKey);
        connection.send('AddScreen', $page.params.roomKey);
      })
			.catch(() => {
				loading = false;
				error = true;
			});

    if(window) {
      const url = new URL(window.location.href);
      url.pathname = `/gif-party/play/${$page.params.roomKey}`;
      linkForUsers = url.toString();
    }
  });

  connection.on('ReceiveGame', (g) => {
		console.log('recievedGame: ', g);
		game = g;
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
</script>

{#if loading}
	<div>loading...</div>
{:else}
  <div class="container">
    <h1>Game code is: {$page.params.roomKey}</h1>
    <h2>Go to <u>{linkForUsers}</u> if you want to play!</h2>
    {#if game && game.players.length > 0}
      <div>
        <h2>Players</h2>
        <ul>
          {#each game.players as player}
            <li class={"player" + (player.isReady ? " ready" : "")}>{player.isReady ? "Ready!" : ""} {player.name}</li>
          {/each}
        </ul>
      </div>
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

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
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