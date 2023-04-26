<script lang="ts">
	import type { TenorGif } from "../../types/global";

  export let gifs = [] as TenorGif[];
  export let selectedGif = undefined as TenorGif | undefined;
  export let setSelectedGif: (newSelectedGif: TenorGif | undefined) => void;
</script>

<div class="giflist">
  {#each gifs as gif}
    <button type="button" on:click={() => {
      selectedGif ? selectedGif = undefined : setSelectedGif(gif);
    }} class="gifSelectBtn">
      <img src={gif.media_formats.tinygif.url} alt={gif.title} />
    </button>
  {/each}
</div>

<style lang="scss">
  .giflist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1rem;
    padding: 0.5rem;
    max-width: 1200px;
    padding-top: 2em;

    .gifSelectBtn {
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      margin: 0;
      transform: scale(1);
      transition: all 0.2s ease-in-out;

      img {
        height: 200px;
        width: 200px;
        border: none;
        transition: border-radius 0.2s ease-in-out;

        &:hover,
        &:focus {
          outline: none;
          border-radius: 10px;
        }
      }

      &:hover,
      &:focus {
        transform: scale(1.05);
        border-radius: 10px;
        box-shadow: 0 0 0 2px hsl(0deg 0% 0%), 0 0 0 4px #007fe0, 4px 4px 8px hsl(0, 0%, 65%); 
        outline: none;
      }
    }
  }
</style>