
## Custom Component: echarts - Simple Treemap
For this simple **Treemap** to work, the **query** output format should have **two main** columns. 
- Categorical column:`name`
- Numeric column:`value`

**query** can have more columns to display in the tooltip or label, but for calculations
to work well with the viz itself we have to keep to the format as explained above.

```sales_by_channel_group
SELECT channel_group AS name,
		((SUM(sales)*10000)::integer) AS value,
		CAST(sum(sales) / sum(sum(sales)) OVER () * 100 AS INTEGER) AS pct
from orders 
group by 1
order by 2 DESC 
```
<!-- formattedValue=fmt(params.data.value, 'num1b') -->
<!-- {JSON.stringify(sales_by_channel_group[0].value, null, 2)} -->
<ECharts config={
    {title: {
            text: 'Sales by Channel Group',
            left: 'center'
        },
        tooltip: {
        formatter: function (params) {
                    let value = params.data.value;
                    let formattedValue = '';
                    if (value >= 1e9) {
                        formattedValue = (value / 1e9).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'B';
                    } else if (value >= 1e6) {
                        formattedValue = (value / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M';
                    } else {
                        formattedValue = value.toLocaleString('en-US', { maximumFractionDigits: 2 });
                    }
                    return `$${formattedValue}`;
                },
    },
        series: [
        {name: 'All Channel Groups',
            type: 'treemap',
            data: sales_by_channel_group,
            label: {
                fontWeight: 'bold',
            position: 'insideTopLeft',
            show: true,
            formatter:  function (params) {      
                const formattedValue = params.data.value.toLocaleString('en-US', {
                maximumFractionDigits: 2
                    });
                return `${params.name}\n${params.data.pct}%`;
                        }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '14',
                    fontWeight: 'bold'
                }
            },
            itemStyle: {
                gapWidth: 3,
                borderColor: 'white',
            },
        }
        ]
    }
}/>


