# Custom Components
<!-- You need to import the component. You can reference your components folder as '$lib' -->
<script>
    import Hello from '$lib/Hello.svelte';
    import Hello2 from '$lib/Hello2.svelte';
    import Slider2 from '$lib/Slider_boolean2.svelte';
    import Checkbox from '$lib/Checkbox.svelte';
    import Slider from '$lib/Slider_boolean.svelte';
        ///
    import Slider3 from '$lib/Slider.svelte';
    let score = 8;
    ///

    $: year = 2000;
    $: swapXY_switch = true;
</script>

```sql sales_by_country 
select 'Canada' as country, 100 as sales_usd, 'yellow' as color, 20 as income_usd
union all 
select 'USA' as country, 200 as sales_usd, 'blue' as color,  40 as income_usd
union all 
select 'UK' as country, 300 as sales_usd, 'red' as color, 60 as income_usd  
```

To use data in the component, pass it to the component as a prop
You can use multiple queries, and name the props anything you like


<Checkbox 
bind:value={swapXY_switch}
/>

The swapXY is: **{swapXY_switch}**



<Hello2 query={sales_by_country2}
bind:swapXY={swapXY_switch}
y=sales_usd
/>


## Custom Components - Slider bound to `year`
<!-- You need to import the component. You can reference your components folder as '$lib' -->


```sql sales_by_country2 
select 'Canada' as country, 100 as sales_usd, 'yellow' as color, 20 as income_usd, 2000 as year union all 
select 'Canada' as country, 120 as sales_usd, 'yellow' as color, 30 as income_usd, 2001 as year union all 
select 'Canada' as country, 150 as sales_usd, 'yellow' as color, 40 as income_usd, 2002 as year union all 
select 'Canada' as country, 160 as sales_usd, 'yellow' as color, 50 as income_usd, 2003 as year union all 
select 'Canada' as country, 180 as sales_usd, 'yellow' as color, 60 as income_usd, 2004 as year union all 
select 'USA' as country, 200 as sales_usd, 'yellow' as color, 25 as income_usd, 2000 as year union all 
select 'USA' as country, 300 as sales_usd, 'yellow' as color, 35 as income_usd, 2001 as year union all 
select 'USA' as country, 400 as sales_usd, 'yellow' as color, 45 as income_usd, 2002 as year union all 
select 'USA' as country, 500 as sales_usd, 'yellow' as color, 55 as income_usd, 2003 as year union all 
select 'USA' as country, 600 as sales_usd, 'yellow' as color, 65 as income_usd, 2004 as year union all 
select 'UK' as country, 270 as sales_usd, 'yellow' as color, 20 as income_usd, 2000 as year union all 
select 'UK' as country, 370 as sales_usd, 'yellow' as color, 30 as income_usd, 2001 as year union all 
select 'UK' as country, 470 as sales_usd, 'yellow' as color, 40 as income_usd, 2002 as year union all 
select 'UK' as country, 570 as sales_usd, 'yellow' as color, 50 as income_usd, 2003 as year union all 
select 'UK' as country, 670 as sales_usd, 'yellow' as color, 60 as income_usd, 2004 as year
```

To use data in the component, pass it to the component as a prop
You can use multiple queries, and name the props anything you like

<Slider2 bind:value={year}/>

The year is: **{year}**

<Hello2
  query={sales_by_country2.filter(d=>d.year===year)}
  bind:year={year}
/>

<hr>

## Using component **Slider** 
- It's a slider component that lives in `./components`  
- We import it here and bind its only attribute `value` to a variable `score` declared in `script` section
- Then we add some text that dynamically changes when we move the slider
- `value` comes from the imported `Slider.svelte`
- `score` is bound to this `value` variable

<Slider3 bind:value={score}/>

The score is: **{score}**

<hr>



## Custom Components - Slider bound to Axis swich (Vertical/Horizontal). Chart has value and income 
This version has both: value and income in the chart

To use data in the component, pass it to the component as a prop
You can use multiple queries, and name the props anything you like

<Slider bind:value={swapXY_switch}/>

The swapXY is: **{swapXY_switch}**

<Hello 
  query={sales_by_country}
  bind:swapXY={swapXY_switch}
  y=sales_usd/>

