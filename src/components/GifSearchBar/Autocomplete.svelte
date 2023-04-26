<script lang="ts">
  export let autoCompleteText = "";
  export let autoCompletions = [] as string[];
  export let setSearchTerm: (newSearchTerm: string) => void;

  async function getAutoComplete() {
    const response = await fetch("/api/tenor/autocomplete?q=" + autoCompleteText);
    autoCompletions = await response.json();
  }

  function randomColor() {
    return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  }

  $: autoCompleteText !== "" && getAutoComplete();
</script>

{#if autoCompleteText !== ""}
  <div class="autoCompleteContainer">
    {#each autoCompletions as completion}
      <button style={`background-color: ${randomColor()}`} class="autoCompleteItem" on:click={() => {
        setSearchTerm(completion)
        autoCompleteText = completion;
      }}>
        {completion}
      </button>
    {/each}
  </div>
{/if}

<style lang="scss">
  .autoCompleteContainer {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    padding: 0.25em;
    max-width: min(100vw, 1150px);
    overflow-x: auto;

    .autoCompleteItem {
      background-color: #ccc;
      padding: 0.25em 0.5em;
      border-radius: 0.5em;

      border: none;

      white-space: nowrap;
      cursor: pointer;
    }
  }
</style>