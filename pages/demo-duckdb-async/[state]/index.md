<script>
/** @type {import('./$types').PageData} */
</script>

# The customer is {$page.params.state}


## data from duckdb-async

{#each props.entries as entry}
    <ul>
      <li>{entry.state} --- Value --- {entry.sales}</li>
    </ul>
{/each}
























<!-- <script>
let template_page_slug = 'Minnesota' 
</script> -->


<!-- ## data from duckdb-async -->

<!-- {#each props.entries as entry}
  {#if entry.state === template_page_slug}
    <ul>
      <li>{entry.state} --- Value --- {entry.sales}</li>
    </ul>
  {/if}
{/each} -->

<!-- 
<pre>
{JSON.stringify($page.params, null, 2)}
</pre> -->


<!-- {#await props.entries}
  <p>...waiting</p>
{:then records}
  {#each records as record}
    {#if record.state === slug}
        <ul>
        <li>{record.state} --- Value --- {record.sales}</li>
        </ul>
    {/if}
  {/each}
{:catch error}
  <p>Error: {error.message}</p>
{/await} -->



