---
title: Not a Main Page
description: a funny Futurama gif here
---

Markdown can be used to write expresively in text

- it sussports list,
- **bolding**, _italics_ and code `print("hello world")`
- links to [external sites](https://docs.evidence.dev/core-concepts/syntax/)

## Images 
Evidence looks for images in your `static` folder
![Company Logo](/good_news.gif)


## SQL

### First Query against the table `orders` from the `needful_thinkgs` db
```sql orders_by_month
select 
    date_trunc('month', order_datetime) as month, 
    ANY_VALUE(category) as category,
    sum(sales) as sales_usd0k,
    count(sales) as num_orders_num0,
    sales_usd0k / count(sales) as aov_usd2
from orders
group by month
order by month, sales_usd0k desc
```

### List all the tables in `needful_thinkgs` db
```sql all_tables
SHOW ALL TABLES
```

## Components
### Line Chart
<LineChart 
    data={orders_by_month}
    y = num_orders_num0
    title = 'Sales by Month'
/>

### Bar Chart
<BarChart
    data="{orders_by_month}"
    x="month"
    y="sales_usd0k"
    series="category"
    title="Sales by Category"
/>

### Showing Text with values

```sql reviews
SELECT
    order_month,
    count(id) as num_reviews
FROM orders
group by 1
order by 1 DESC
```


The number of reviews yesterday was <Value data = {reviews} column = num_reviews row=5 />.

### Loops

{#each orders_by_month.slice(0, 3) as month}

- There were <Value data={month} column=num_orders_num0/> orders in <Value data={month} />.

{/each}

### If/Else

{#if orders_by_month[0].sales_usd > orders_by_month[1].sales_usd}

Sales are up month-over-month.

{:else}

Sales are down vs last month. See [category detail](/sales-by-category).

{/if}

### Page Variables
<!-- The current page is: {$page.url} -->
The current page is: {$page.route.id}

### Code Fences
```python
names = ["Alice", "Bob", "Charlie"]
for name in names:
    print("Hello, " + name)
```

```sql widget_orders
SELECT *
FROM orders
LIMIT 5
```


### Querying files
#### CSV - directly
```sql titanic
SELECT * FROM './sources/titanic.csv'
```

#### Parquet - directly

```sql sec
SELECT * FROM 'sources/3521-TICKER-2002-07-18.parquet'

```

#### CSV - through Duckdb
```sql titanic2
select * from read_csv_auto('./sources/titanic.csv', HEADER=TRUE);
```

#### Prquet - through Duckdb
```sql sec2
select * from read_parquet('./sources/3521-TICKER-2002-07-18.parquet')
```


## Query Chaining

```sql sales_by_state
select
    state,
    sum(sales) as sales
from orders
group by 1
```

```sql average_sales
select
    avg(sales) as average_sales
from ${sales_by_state}
```

## Loops 2
- prepare the table
```sql sec_cusip
select
    cik_name,
    cusip_ticker,
    cusip_ticker_name,
    sum(value) as value_usd,
    sum(shares) as shares
from ${sec2}
group by (1, 2, 3)
order by value_usd desc
limit 50
```

```sql sec_cusip2
select
    fdate,
    sum(value) as value_usd,
from ${sec2}
group by (1)
```


- use each loop
Value and shares:

{#each sec_cusip.slice(0,3) as sec}

## {sec.cusip_ticker}

<Value data={sec} column=value_usd/> and <Value data={sec} column=shares/> shares

{/each}

## If/Else 2
The big fat investor is: <Value data = {sec_cusip} column = cik_name row=1 />

{#if sec_cusip.length !== 0}
    <DataTable data="{sec_cusip}" search="true">
    <Column id="cusip_ticker" title="Ticker"/>
    <Column id="cusip_ticker_name" title="Name" />
    <Column id="value_usd" />
    <Column id="shares" />
    </DataTable>
    <!-- <DataTable data={sec_cusip} column=shares/>  -->

{/if}

## If/Else 3

{#if sec_cusip.length > 15}

You've got {sec_cusip.length} low marhing customers
{sec_cusip[0].cusip_ticker} // syntax to show 1st record in the table. column = "cusip_ticker"

{:else }
<DataTable data={sec_cusip}/>
There are fewer than fifteen low margin customers, which is not enough to fill a call block.

{/if}


## Generating filter URLs and using a table
```sql channels
select
    channel,
    '?channel=' || channel as filter_link
from orders
group by 1
```


<DataTable data={channels} link=filter_link />

## Filtering a query result
To filter the data shown by a component, use the javascript filter method on the query result.

#### Filtered Component

```sql items
select
    email,
    channel,
    sum(sales) as sales_usd
from orders
group by 1,2
```

{#if $page.url.searchParams.get('channel')} <!-- Check for a filter in the URL -->

<DataTable data={items.filter(d=>d.channel === $page.url.searchParams.get('channel'))}/>

{:else} <!-- If not, show all data -->

<DataTable data={items}/>

{/if}

## Tree Map


```sql sales_by_country
WITH RECURSIVE names(name) AS (
    VALUES ('Canada')
    UNION ALL
    VALUES ('US')
    UNION ALL
    VALUES ('UK')
    UNION ALL
    VALUES ('Australia')
    UNION ALL
    VALUES ('Germany')
),
sales(sale) AS (
    VALUES (100)
    UNION ALL
    VALUES (250)
    UNION ALL
    VALUES (130)
    UNION ALL
    VALUES (50)
    UNION ALL
    VALUES (23)
),
areas(area) AS (
    VALUES ('North America')
    UNION ALL
    VALUES ('North America')
    UNION ALL
    VALUES ('Europe')
    UNION ALL
    VALUES ('Australia')
    UNION ALL
    VALUES ('Europe')
)
SELECT ROW_NUMBER() OVER (ORDER BY RANDOM()) AS id,
    name,
    sale * CAST(RANDOM() * 2.5 AS INTEGER) AS sale,
    area
FROM names CROSS JOIN sales CROSS JOIN areas
ORDER BY id
```

```sql treemap_data
SELECT name, CAST(sum(sale) / sum(sum(sale)) OVER () * 100 AS INTEGER) AS value
FROM ${sales_by_country}
GROUP BY name
```
<script>
const treemap_data2 = [
      { name: 'Area 1', children: [
        { name: 'Category 1', value: 100 },
        { name: 'Category 2', value: 200 },
        // Add more data objects with the 'name' category
      ]},
      // Add more data objects with the 'area' category
      { name: 'Area 2', children: [
        { name: 'Category 3', value: 40 },
        { name: 'Category 4', value: 67 },
        // Add more data objects with the 'name' category
      ]},
    ];



const inputArray = [
  { area: 'North America', name: 'USA', value: 100 },
  { area: 'North America', name: 'Canada', value: 200 },
  { area: 'Europe', name: 'UK', value: 40 },
  { area: 'Europe', name: 'Spain', value: 67 },
  // Add more objects to the input array
];

const outputArray = [];
const areaMap = new Map();

inputArray.forEach(obj => {
  const { area, name, value } = obj;
  
  if (!areaMap.has(area)) {
    areaMap.set(area, { name: area, children: [] });
  }
  
  const areaObj = areaMap.get(area);
  areaObj.children.push({ name, value });
});

areaMap.forEach(value => outputArray.push(value));

console.log(JSON.stringify(outputArray, null, 2));
</script>

## Custom echarts - Simple Treemap
data format is two columns. One is has to be names 'name' and another is 'value'

<ECharts config={
  {title: {
        text: 'Sales by Country',
        left: 'center'
      },
    tooltip: {
      formatter: '{c}'
    },
    series: [
      {name: 'All Countries',
        type: 'treemap',
        data: outputArray,
        label: {
          show: true,
          formatter: '{b}: {c}%'
        },
        itemStyle: {
            gapWidth: 1
          },
      }
    ]
  }
}/>

## Custom echarts - Simple Treemap 2

```sql ticker_value
select
    cusip,
    name_of_issuer as name,
    ANY_VALUE(cusip_ticker) as ticker,
    sum(value) as value,
    ((sum(value) / (SELECT sum(value) FROM ${sec2})) * 100)::integer as pct,
from ${sec2}
where quarter = '2002Q2' and accession_number != 'SYNTHETIC-CLOSE'
group by (1,2)
order by value desc
```

<ECharts config={
  {title: {
        text: 'Assets by Value',
        left: 'center'
      },
    tooltip: {
      formatter: function (params) {      
            const formattedValue = params.data.value.toLocaleString('en-US', {
    maximumFractionDigits: 2
  });
  return `${params.name}<br />
          \$${formattedValue}<br />
          ${params.data.pct}%`;
          }
},
    series: [
      {name: 'All Assets',
        type: 'treemap',
        data: ticker_value,
        label: {
          position: 'insideTopLeft',
          show: true,
          formatter:  '{b}\n{c}',
        },
        itemStyle: {
            gapWidth: 2,
            borderColor: 'white',
          },
                upperLabel: {
          show: false
        },
      }
    ]
  }
}/>

<hr>

## Custom Funnel Chart with in-line generated data

<ECharts config={
    {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  legend: {
    data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
  },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 60, name: 'Visit' },
        { value: 40, name: 'Inquiry' },
        { value: 20, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
      ]
    }
  ]
}
}
/>



## Custom Bar Chart with data from `parquet` file
<ECharts config={
{
    title: {
    text: "Main Title",
    subtext: "Sub Title",
    left: "center",
    top: "top",
    textStyle: {
      fontSize: 30
    },
    subtextStyle: {
      fontSize: 10
    }
  },
  legend: {},
  xAxis: {
    type: 'category',
    data: sec_cusip.map((obj => obj.cusip_ticker))
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: sec_cusip.map((obj => obj.value_usd)),
      type: 'bar'
    }
  ]
}
}
/>

## Custom Basic Line Chart

```sql data_json
select year(epoch_ms(date)) as year, round(MEAN(value),0) as value, round(MEAN(value2),0) as value2 from read_json_auto('./sources/data_edited_value2.json',dateformat='%x') group by 1;
```

### Table with `data_json`
<DataTable data={data_json}/>

### Note of dates format: 
file `data_edited.json` has date format in UNIX Epoch time format and it works fine, but..
file `data_edited_date_utc.json` has date format as string of a UTC Date and it doesn't work


**date** is {data_json[0].year}
**value** is {data_json[0].value}
**value2** is {data_json[0].value2}

### How to format data:
- Use the notation `dataset` > `source` and map it to our named SQL table/query. Example `dataset: {
    source: data_json
}`
- In `series` > `encode` we map `x` and `y` to column names from our dataset.
- The chart is very temperamental if `value` is not in **integer** format. Need to check a lot
- To get data part from Unix timestamp format - `strftime('%Y-%m-%d', epoch_ms(date))`

<ECharts config={
 {
  
  dataset: {
    source: data_json
  },
  xAxis: {
    type: 'time',
    name: 'Time',
  },
  yAxis: {
    axisLabel: {
    },
      type: 'value',
      name: 'Sales Quantity'
    },
  series: [
    {
      type: 'line',
      encode: {
        // Map "amount" column to x-axis.
        y: ['value', 'value2'],
        // Map "product" row to y-axis.
        x: 'date'
      }
    }
  ]
}
}
/>


### New Custom Chart example

<ECharts config={
{
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {},
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        rotate: 30
      },
      data: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      min: 0,
      max: 250,
      position: 'right',
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      min: 0,
      max: 25,
      position: 'left',
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Precipitation',
      type: 'bar',
      yAxisIndex: 0,
      data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
    },
    {
      name: 'Temperature',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      data: [
        6.0,
        10.2,
        10.3,
        11.5,
        10.3,
        13.2,
        14.3,
        16.4,
        18.0,
        16.5,
        12.0,
        5.2
      ]
    }
  ]
}
}/>

### New Custom Bar Chart with my data
- Source: data_json: ['year':'number', 'value':'number', 'value2':'number']


<eCharts config={
{ xAxis: {
    type: 'category',
    data: data_json.map((obj => obj.year))
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: data_json.map((obj => obj.value)),
      type: 'line'
    }
  ]
}
}/>

<ECharts config={
 {
  
  dataset: {
    source: data_json
  },
  xAxis: {
    type: 'category',
    
  },
  yAxis: {
    axisLabel: {
    },
      type: 'value',
      name: 'Sales Quantity'
    },
  series: [
    {
      type: 'bar',
      encode: {
        // Map "amount" column to x-axis.
        y: 'value2',
        // Map "product" row to y-axis.
        x: 'year'
      }
    },
        {
      type: 'line',
      encode: {
        // Map "amount" column to x-axis.
        y: ['value'],
        // Map "product" row to y-axis.
        x: 'year'
      }
    },
  ]
}
}
/>


### Half working Line Chart with sliding window and zoom box
<ECharts config={
{
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  title: {
    left: 'center',
    text: 'Large Area Chart'
  },
  toolbox: {
    feature: {
      dataZoom: {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
      },
      restore: {},
    }
  },
      grid: {
      right: 70,
      bottom: 70
    },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data_json.map((obj => obj.year))
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  dataZoom: [
    {
      type: 'inside'
    },
    {
      type: 'slider'
    }
  ],
  series: [
    {
      name: 'Value',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      data: data_json.map((obj => obj.value))
    },
        {
      name: 'Value2',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(0, 128, 128)'
      },
      data: data_json.map((obj => obj.value2))
    }
  ]
}
}/>


### evidence native LineChart

<LineChart 
    data={widget_orders} 
    x=order_month 
    y=sales
    series=channel
    yAxisTitle="calls to Austin 311 per day"
/>

