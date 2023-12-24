import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const Home = (props) => {
  const pieChartContainer = useRef(null);
  const barChartContainer = useRef(null);

  useEffect(() => {
    const pieChart = Highcharts.chart(pieChartContainer.current, {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Books Management'
      },
      tooltip: {
        valueSuffix: '%'
      },
      subtitle: {
        text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: [
            {
              name: 'Fiction',
              y: 55.02
            },
            {
              name: 'Autobiography',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'Non-fiction',
              y: 1.09
            },
            {
              name: 'Biography',
              y: 15.5
            },
            {
              name: 'Science',
              y: 1.68
            }
          ]
        }
      ]
    });

    const barChart = Highcharts.chart(barChartContainer.current, {
      chart: {
        type: 'column',
        width: 400,  // Adjust the width here
        height: 300  // Adjust the height here
        
      },
      title: {
        text: 'Corn vs wheat estimated production for 2020',
        align: 'left'
      },
      subtitle: {
        text: 'Source:<a target="_blank" href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
        align: 'left'
      },
      xAxis: {
        categories: ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia'],
        crosshair: true,
        accessibility: {
          description: 'Countries'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '1000 metric tons (MT)'
        }
      },
      tooltip: {
        valueSuffix: ' (1000 MT)'
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Corn',
          data: [406292, 260000, 107000, 68300, 27500, 14500]
        },
        {
          name: 'Wheat',
          data: [51086, 136000, 5500, 141000, 107180, 77000]
        }
      ]
    });

    return () => {
      if (pieChart) {
        pieChart.destroy();
      }
      if (barChart) {
        barChart.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div ref={pieChartContainer} />
      <div ref={barChartContainer} style={{ width: '400px', height: '300px' , margin: '0 auto'}}/>
    </div>
  );
};
