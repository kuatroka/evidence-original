<script>
    import { timeParse } from "d3";
    export let date;
    // $: year = timeParse("%Y-%m-%d")(date).getFullYear();
    $: year = date.toString().slice(0, 4);
  </script>
  
  {#if date}
    <p>{year}</p>
  {/if}
  
  <style>
    p {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0;
      font-size: 3em;
      font-weight: 900;
      font-feature-settings: "tnum" 1;
    }
  </style>
