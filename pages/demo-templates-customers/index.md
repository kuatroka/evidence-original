---
title: Customers
description: a funny Futurama gif here
---


```sql customers_sql
select
    last_name,
    last_name as page_link,
    sum(sales) as sales_usd
from orders
group by 1
```
# All Customers
<DataTable
    data={customers_sql}
    link=page_link
    showLinkCol=true
/>

