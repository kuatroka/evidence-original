<script>
	// export makes the variable a component property	
	export let value;
</script>

<input type='range' bind:value min=0 max=10 step=1 />