<script lang="ts">
	import { onMount } from "svelte";
	import type { TenorGif } from "../../types/global";

  export const ssr = false;

  export let searchTerm = '';
  export let setGifs: (newGifs: TenorGif[]) => void;
  export let setSearchTerm: (newSearchTerm: string) => void;
  export let setAutoComplete: (newAutoComplete: string) => void;
  export let visible = true;

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

{#if visible}
  <form class="search-bar" on:submit={search}>
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
    <button type="submit" class="searchButton" on:click={search} on:submit={search} >Search</button>
  </form>
{/if}

<style lang="scss">
  .search-bar { 
    display: flex;
    align-items: center;
    max-width: calc(1200px - 1.2em);

    border-radius: 10px;

    margin: 0;
    padding: 0.1em 0.5em 0.1em 0.1em;
    color: rgba(0,0,0,.88);
    font-size: 1em;
    position: relative;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    transition: all .2s;

    &:focus,
    &:active,
    &:hover {
      border-color: #40a9ff;
      box-shadow: 0 0 0 2px rgba(24,144,255,.2);
    }

    input {
      flex: 1;
      padding: 0.5em 1em;
      margin: 0;
      font-size: 1em;

      border: none;
      outline: none;
    }

    .searchButton {
      padding: 0.25em 0.5em;
      border-radius: 6px;
      border: none;
      background: #00559a;
      color: white;
      font-size: 1em;
      font-weight: bold;

      cursor: pointer;
    }
  }
</style>