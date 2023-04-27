<script lang="ts">
  import QRCode from 'easyqrcodejs'
	import { onMount } from 'svelte';
  // import * as QRCode from 'easyqrcodejs';

  export let url: string;
  let node: HTMLElement;

  onMount(() => {
    const options = {
      text: url,
      // ... your other options
      width: 100,
      height: 100,
      quietZone: 10,
    };
    new QRCode(node, options);
  });
</script>

<div bind:this={node}></div>

<style lang="scss">
  div {
   /* make QR-wrapper squared */
    width: 100%;
    position: relative;
    padding: 50%;
    z-index: 1;
  }
  div :global(canvas) {
    /* fit QR to wrapper */
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>