<script>
    // export makes the variable a component property   
    export let value = true
</script>
<!-- < name="range-slider" bind:value={value} max={25} step={1} ticked>Label</RangeSlider> -->
<input type=checkbox bind:checked={value}>