```sql state_customer
select
    state,
    sum(sales) as sales_usd
from orders
group by 1
```
# All Customers
<DataTable
    data={state_customer}
    link=state
    showLinkCol=true
/>