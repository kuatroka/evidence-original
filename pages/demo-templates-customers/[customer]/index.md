# The customer is {$page.params.customer}

```sql state_query
select
    last_name,
    state
from orders
-- where last_name = '{$page.params.customer}'
```
<script>
 let filtered_data=state_query.filter(d => d.last_name === $page.params.customer)
</script>


<Value
    data={filtered_data}
    column=state
/>

<!-- <pre>{JSON.stringify($page.params, null, 2)}</pre> -->




