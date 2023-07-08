<script>
    // export makes the variable a component property   
    export let value = 2000
</script>
<!-- < name="range-slider" bind:value={value} max={25} step={1} ticked>Label</RangeSlider> -->
<input type=range min=2000 max=2004 bind:value={value}>
