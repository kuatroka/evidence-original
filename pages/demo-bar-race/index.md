```channel_group_rank 
SELECT 
    DATE_TRUNC('month', order_datetime) AS date,
    channel_group AS name,
    SUM(sales) AS value,
    DENSE_RANK() OVER (PARTITION BY DATE_TRUNC('month', order_datetime) ORDER BY SUM(sales) DESC) AS rank
FROM orders 
GROUP BY DATE_TRUNC('month', order_datetime), channel_group
order by DATE_TRUNC('month', order_datetime) DESC
```
<!-- <script>
import BarRace from '$lib/BarRace.svelte';
</script> -->

# D3: Bar Race - data comes from a table in **duckb** database

<BarRace 
inputData={channel_group_rank}
dateCol="date"
nameCol="name"
valueCol="value"
duration=500
/>

# D3: Bar Race - data comes from a dummy data table created inline

```data_with_rank
-- create a table with dummy data: date, name, value
WITH RECURSIVE bar_race_data(date,name, value) AS (
    VALUES ('2017-10-31', 'TECHNIPFMC PLC', 498.9)
    UNION ALL
    VALUES ('2017-10-31', 'CONSTELLIUM NV', 11.6)
    UNION ALL
    VALUES ('2017-10-31', 'TALEND S A', 70.3)
    UNION ALL
    VALUES ('2018-01-01', 'TECHNIPFMC PLC', 490.9)
    UNION ALL
    VALUES ('2018-01-01', 'CONSTELLIUM NV', 500)
    UNION ALL
    VALUES ('2018-01-01', 'TALEND S A', 100.3)
    UNION ALL
    VALUES ('2019-10-31', 'TECHNIPFMC PLC', 50)
    UNION ALL
    VALUES ('2019-10-31', 'CONSTELLIUM NV', 120)
    UNION ALL   
    VALUES ('2019-10-31', 'TALEND S A', 600)
)
-- add rank to any table with strictly defined columns
SELECT date,
    name,
    value,
    DENSE_RANK() OVER (PARTITION BY date ORDER BY value DESC) AS rank
FROM bar_race_data 
```
{JSON.stringify(channel_group_rank[0])}

<BarRace 
inputData={data_with_rank}
dateCol="date"
nameCol="name"
valueCol="value"
duration=1000
/>

