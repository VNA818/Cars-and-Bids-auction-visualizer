import './Chart.css'
import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Scatter, getElementAtEvent } from 'react-chartjs-2';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const Chart = (data) => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    onClick: (event, element) => {
      if(element.length > 0) {
        console.log(element[0].element.$context.raw);
        data.selected(element[0].element.$context.raw);
      } else {
        data.selected(null);
      }
    },
    plugins: {
      tooltip: {
          callbacks: {
              label: function(event) {
                //console.log(context);
                return event.raw.Model + ' $' + event.raw.ResultMin[1];
              }
            
            }
          }
        },
    scales: {
      y: {
        beginAtZero: true,
        //max: 100000,
        ticks: {
          callback: function(value, index, ticks) {
              return '$' + value;
          }
        }
      },
      x: {
        ticks: {
          callback: function(value, index, ticks) {
            let date = new Date(value);
            return  (date.getMonth() + 1) + "/" + date.getDate() + "/" + String(date.getFullYear()).substring(2);
          }
        }
    }
  },
  responsive: true,
  maintainAspectRatio: false
  });

  const setupChart = (plots) => {
    var sold = [];
    var bid = [];
    var cancelled = [];
    plots.forEach(x => {
      if(x.ResultMin[0] == "Sold"){
        let date = new Date(x['Date-Ended'] + ' 01:00:00').getTime();
        x.x = date;
        x.y = x.ResultMin[1];
        sold.push(x);
      } else if(x.ResultMin[0] == "Bid"){
        let date = new Date(x['Date-Ended'] + ' 01:00:00').getTime();
        x.x = date;
        x.y = x.ResultMin[1];
        bid.push(x);
      } else if(x.ResultMin[0] == "Cancelled"){
        let date = new Date(x['Date-Ended'] + ' 01:00:00').getTime();
        x.x = date;
        x.y = x.ResultMin[1];
        cancelled.push(x);
      }
    });
    console.log(sold);
    console.log(bid);
    console.log(cancelled);
    setChartData({
      datasets : [
        {
          label: `Sold (${sold.length})`,
          data: sold,
          backgroundColor: '#72fc9e'
        },
        {
          label: `Bid (${bid.length})`,
          data: bid,
          backgroundColor: '#007794'
        },
        {
          label: `Cancelled (${cancelled.length})`,
          data: cancelled,
          backgroundColor: 'red'
        },
      ],
    });
  }
  
  useEffect(() => {
    setupChart(data.plots);
  }, [data.plots]);

  return ( 
    <>
      <div className="chart">
        {chartData != null ? <Scatter options={chartOptions} data={chartData} /> : null}
      </div>
    </>
  ); 
}
 
export default Chart;