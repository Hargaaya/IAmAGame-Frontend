<script lang="ts">
	import { page } from "$app/stores";
	import { PUBLIC_BACKEND_URL } from "$env/static/public";
	import { HubConnectionBuilder } from "@microsoft/signalr";
	import { onMount } from "svelte";

  let roomKey = $page.params.roomKey || "";
  let connection = new HubConnectionBuilder().withUrl(`${PUBLIC_BACKEND_URL}/hub/gifparty`).build();

  onMount(() => {
		connection
			.start()
			.then(() => {
        connection.on('ReceiveGame', (g) => {
          console.log('recievedGame: ', g); 
          if(g === "error") {
            alert("Your game was not found 😭, please check the room code and try again.");
            roomKey = "";
            return;
          } else {
            if(g.players && g.players.length >= g.maxPlayers) {
              alert("This game is full 😭, please try another room code.");
              roomKey = "";
              return;
            }
            window.location.href = `/gif-party/play/${roomKey}`;
          }
        });
      })
      .catch(() => {
        console.error("Failed to connect to hub");
      });
  });

  const join = () => {
    if(!roomKey) return;
    connection.send('GetGame', roomKey);
  }
</script>

<div class="container">
  <input type="text" bind:value={roomKey} placeholder="Room code (case sensitive)" />
  <button on:click={join}>Join</button> 
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
</style>