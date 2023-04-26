<script lang="ts">
	import GroupIcon from '../assets/GroupIcon.svelte';
	import PlusIcon from '../assets/PlusIcon.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	export let gameType: string;

	let error = false;
	let loading = false;

	const createRoom = async () => {
		loading = true;
		const res = await fetch(`${PUBLIC_BACKEND_URL}/room/${gameType}`, {
			method: 'POST'
		});

		if (!res.ok) {
			loading = false;
			error = true;
			return;
		}

		const roomId = await res.text();
		window.open(`${gameType}/room/${roomId}`, '_self');
	};

	const joinRoom = () => {
		window.open(`${gameType}/play`, '_self');
	};
</script>

<div class="container">
	<button on:click={joinRoom}>
		<p>Join a room</p>
		<GroupIcon color="white" />
	</button>
	<button on:click={createRoom}>
		<p>Create a room</p>
		<PlusIcon color="white" />
	</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 5rem;
		flex: 1;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.625rem;
		margin: 4px 2px;
		background-color: #bdbdbd;
		border-radius: 10px;
		cursor: pointer;
		border: none;
		font-size: 1rem;
		font-weight: bold;
		color: white;
	}

	button:hover,
	button:focus {
		transform: scale(1.05);
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	}
</style>
