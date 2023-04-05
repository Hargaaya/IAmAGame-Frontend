<script lang="ts">
	import Autocomplete from "../../../components/GifSearchBar/Autocomplete.svelte";
	import GifList from "../../../components/GifSearchBar/GifList.svelte";
	import SearchBar from "../../../components/GifSearchBar/SearchBar.svelte";
	import type { TenorGif } from "../../../types/global";
	
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

<div class="gifPartyContainer">
	<h1>Gif Party</h1>
	<SearchBar visible={!selectedGif} searchTerm={searchTerm} setAutoComplete={setAutoComplete} setSearchTerm={setSearchTerm} setGifs={setGifs} />
	<Autocomplete autoCompleteText={autoCompleteText} setSearchTerm={setSearchTerm} />
	<GifList selectedGif={selectedGif} setSelectedGif={setSelectedGif} gifs={gifs} />
</div>

<style lang="scss">
	.gifPartyContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}
</style>