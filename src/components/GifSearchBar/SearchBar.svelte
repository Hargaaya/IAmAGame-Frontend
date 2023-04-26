<script lang="ts">
	import { onMount } from "svelte";
	import type { TenorGif } from "../../types/global";

  export const ssr = false;

  export let searchTerm = '';
  export let setGifs: (newGifs: TenorGif[]) => void;
  export let setSearchTerm: (newSearchTerm: string) => void;
  export let setAutoComplete: (newAutoComplete: string) => void;

  async function search() {
    setSearchTerm(searchTerm);
    const response = await fetch("/api/tenor/search?q=" + searchTerm);
    const data = await response.json();

    setGifs(data);
  }

  async function getFeaturedGifs() {
    const response = await fetch("/api/tenor/featured");
    const data = await response.json();
    setGifs(data);
	}

  onMount(() => {
    getFeaturedGifs();
  });

  $: searchTerm !== "" && search();
</script>

<input
  type="text"
  placeholder="Search for a gif"
  bind:value={searchTerm}
  on:keyup={(e) => {
    if(e.currentTarget.value === "") {
      setAutoComplete("");
      getFeaturedGifs();
    } else {
      setAutoComplete(e.currentTarget.value);
      search();
    }
  }}
/>