<script lang="ts">
	import { page } from "$app/stores";
	import { PUBLIC_BACKEND_URL } from "$env/static/public";
	import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
	import { onMount } from "svelte";
	import Lobby from "../../../../components/Screen/Lobby.svelte";
	import type { GameRoom } from "../../../../types/global";
	import sortPlayersByPoints from "../../../../helpers/SortPlayersByScore";
	import GetWinningPlayer from "../../../../helpers/GetWinningPlayer";

  let loading = true;
	let error = false;
	let connection = new HubConnectionBuilder().withUrl(`${PUBLIC_BACKEND_URL}/hub/gifparty`).withAutomaticReconnect([2000]).build();
  let game = null as GameRoom | null;

  let phrase = '';

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
  });

  connection.on('ReceiveGame', (g) => {
		console.log('recievedGame: ', g);
		game = g;
	});

  $: currentGame = game?.games.filter((g) => g.current)[0];
</script>

<div class="gameContainer">
  {#if game && game.gameState === 0} <!-- In the lobby -->
    <Lobby connection={connection} loading={loading} error={error} game={game} />
  {:else if game && game.gameState === 1} <!-- Game is Running -->
    {#if currentGame && currentGame.gameState === 0} <!-- Choosing / inputting phrase -->
      <h2>Game started! Choose a phrase..</h2>

      <input placeholder="Phrase" bind:value={phrase} />
      <button on:click={() => connection.send('SetPhrase', $page.params.roomKey, phrase)}>Send Phrase</button>
    {:else if currentGame && currentGame.gameState === 1} <!-- Taking submissions -->
      <h2>The phrase is:</h2>
      <h1>{currentGame.phrase}</h1>

      {#if currentGame.submissions && currentGame.submissions.length > 0}
        <h2>Has submitted their answers:</h2>
        {#each currentGame.submissions as submission}
          <h3>{game.players.filter(p => p.id === submission.playerId)[0].name}</h3>
        {/each}
      {/if}

      <button on:click={() => {
        if(!currentGame || !currentGame.submissions || !game ) return;
        if(currentGame.submissions.length < game.players.length) {
          const continueCo = confirm('Not everyone has submitted their answer yet! Are you sure you want to continue?');
          if(!continueCo) return;
        }
        connection.send('StartVoting', $page.params.roomKey)
      }}>Start Voting</button>

    {:else if currentGame && currentGame.gameState === 2} <!-- Voting -->
      <h2>Vote for your favourite answer!</h2>

      {#if currentGame && currentGame.submissions}
        <div class="submissionList">
          {#each currentGame.submissions as submission}
          <div class="imageContainer">
            <img src={submission.gifUrl} alt="Player submission" />
            {#if submission.votes && submission.votes > 0}
              <div class="votes">
              👍 {submission.votes}
            </div>
            {/if}
          </div>
          {/each}
        </div>
      {/if}

      <button on:click={() => {
        if(!currentGame || !currentGame.submissions || !game ) return;
        if(currentGame.submissions.filter(s => s.votes > 0).reduce(
          (a, b) => a + b.votes, 0
        ) < game.players.length) {
          const continueCo = confirm('Not everyone has voted yet! Are you sure you want to continue?');
          if(!continueCo) return;
        }
        connection.send('EndGame', $page.params.roomKey)
      }}>Count the votes</button>

    {:else if currentGame && currentGame.gameState === 3} <!-- Game ended -->
      <h1>{GetWinningPlayer(game.players, currentGame).name} won this round!</h1>

      <br />

      {#each sortPlayersByPoints(game.players) as player, i}
        <h3 style={i === 0 ? "color: green; font-size: x-large" : ""}>{player.name} has {player.score} point{player.score !== 1 ? "s" : ""}</h3>
      {/each}

      <br />

      <button on:click={() => connection.send('StartGame', $page.params.roomKey)}>Start a new round</button>
      <button on:click={() => connection.send('EndGameRoom', $page.params.roomKey)}>End the game</button>
    {/if}

  {:else if game && game.gameState === 2} <!-- Game ended -->
    <h2>Game ended!</h2>

    <h1>{GetWinningPlayer(game.players).name} won!</h1>

    <br />

    {#each sortPlayersByPoints(game.players) as player, i}
      <h3 style={i === 0 ? "color: green; font-size: x-large" : ""}>{player.name} got {player.score} point{player.score !== 1 ? "s" : ""}</h3>
    {/each}
  {/if}
</div>

<style lang="scss">
  .gameContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .submissionList {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    padding: 1em;

    .imageContainer {
      position: relative;

      .votes {
        position: absolute;
        left: 20px;
        bottom: 0;
        transform: translateY(50%);

        background-color: white;
        border-radius: 10px;
        padding: 0.25em 0.5em;
        border: 1px solid grey;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        font-size: larger;
      }
    }

    img {
      border-radius: 10px;
      border: 1px solid black;
      height: 200px;
      aspect-ratio: 16/9;
    }
  }
</style>