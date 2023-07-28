<script>
  import { createEventDispatcher } from "svelte";
  import { timer, elapsed } from "./my-timer.js";
  export let currentKeyframe = 0;
  export let keyframeCount = 0;
  export let duration = 1000;
  export let isEnabled = false;
    export let labelFlag = true;
    let label;
    $: if (labelFlag === true){
        label = "Pause";
    } else {
        label = "Play";
    }
  const dispatch = createEventDispatcher();
  const onReset = () => {
    currentKeyframe = 0;
    timer.reset();
  };
  $: if (isEnabled) currentKeyframe = Math.floor($elapsed / duration);
  $: if (currentKeyframe === keyframeCount) dispatch("end");
  $: isEnabled ? timer.start() : timer.stop();
</script>

<div>
  <button on:click="{() => {isEnabled = !isEnabled; labelFlag = !labelFlag}}">{label}</button>
  <button on:click="{onReset}">Reset</button>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    margin-bottom: 3em;
    font-family: sans-serif;
  }
  button {
    width: 70px;
    margin: 0.5em;
    padding: 0.5em;
    border: none;
    background: #ccc;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
  }
</style>