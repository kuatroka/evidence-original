<script>
    import { scaleLinear } from "d3";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import { tweened } from "svelte/motion";

    import Timer from "./Timer.svelte";
    import Bars from "./Bars.svelte";
    import Axis from "./Axis.svelte";
    import Labels from "./Labels.svelte";
    import Ticker from "./Ticker.svelte";

    export let inputData;
    export let dateCol;
    export let nameCol;
    export let valueCol;
    export let rankCol;
    export let barCount = undefined;
    export let duration = 300; // ms between keyframes

    function getSortedData(data, col, isAsc) {
        return [...data].sort((a, b) => {
        return (a[col] < b[col] ? -1 : 1) * (isAsc ? 1 : -1);
        });
    }

    inputData = getSortedData(inputData, dateCol, true);

    function getDistinctValues(data, column) {
        let distinctValues = [];
        const distinctValueSet = new Set();
        data.forEach((d) => {
        distinctValueSet.add(d[column]);
        });
        distinctValues = [...distinctValueSet];
        return distinctValues;
    }


    barCount = 8; // how many bars to show
    const barMargin = 4; // space between bars
    const distinctKeyframes = getDistinctValues(inputData, dateCol);
    const keyframeCount = distinctKeyframes.length; // number of keyframes
    const names = getDistinctValues(inputData, nameCol); // all data names/labels

    const dimensions = writable({});
    const scales = writable({});
    const data = tweened(null, { duration });
    const xMax = tweened(null, { duration });

    let figureWidth = 0;
    let figureHeight = 0;
    let currentKeyframe = 0;
    let isEnabled = false;

    // update dimensions
    $: width = figureWidth;
    $: height = figureHeight;
    $: barHeight = height / barCount - barMargin;

    // update data
    $: isEnabled = currentKeyframe < keyframeCount;
    $: frameIndex = Math.min(currentKeyframe, keyframeCount - 1);
    $: keyframeData = inputData.filter(d => d[dateCol] === distinctKeyframes[frameIndex]);
    $: keyframeDate = keyframeData[0][dateCol];
    $: currentData = names.map((name) => ({
        ...keyframeData.find((d) => d.name == name),
    }));

    // update stores and context
    $: data.set(currentData.map(({date, name, value, rank}) => ({name, value, rank})));
    $: dimensions.set({
        width,
        height,
        barHeight,
        barMargin,
    });
    $: xMax.set(Math.max(...keyframeData.map((d) => d[valueCol])));
    $: scales.set({
        x: scaleLinear().domain([0, $xMax]).range([0, $dimensions.width]),
        y: scaleLinear().domain([0, barCount]).range([0, $dimensions.height]),
    });
    $: chartContext = { dimensions, scales, data, names };
    $: setContext("Chart", chartContext);
</script>

{#if inputData}
<Timer
    bind:currentKeyframe
    keyframeCount="{keyframeCount}"
    duration="{duration}"
    isEnabled="{isEnabled}"
    on:end="{() => (isEnabled = false)}"
/>
<figure bind:offsetWidth="{figureWidth}" bind:offsetHeight="{figureHeight}">
    <div class="bars">
    <Bars barCount="{barCount}" />
    </div>

    <div class="axis">
    <Axis />
    </div>

    <div class="labels">
    <Labels barCount="{barCount}" />
    </div>

    <div class="ticker">
    <Ticker date="{keyframeDate}" />
    </div>
</figure>
{/if}

<style>
figure {
    display: block;
    position: relative;
    width: 100%;
    height: 50vh;
    min-height: 420px;
    margin: 0;
    user-select: none;
    font-family: sans-serif;
}

figure > * {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.axis {
    overflow: visible;
}

</style>