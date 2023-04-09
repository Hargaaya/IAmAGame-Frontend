<script lang="ts">
	import { HubConnectionBuilder } from '@microsoft/signalr';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { BACKEND_URL } from '$env/static/private';

	let loading = true;
	let error = false;
	let connection = new HubConnectionBuilder().withUrl(`${BACKEND_URL}/hub/gifparty`).build();

	onMount(() => {
		connection
			.start()
			.then(() => {
				loading = false;
			})
			.catch(() => {
				loading = false;
				error = true;
			});
	});

	const getData = () => connection.send('GetGame', $page.params.roomKey);
</script>

{#if loading}
	<div>loading...</div>
{:else}
	<div>
		<button on:click={getData} disabled={loading}>Get Data</button>

		{$page.params.roomKey}
	</div>
{/if}
