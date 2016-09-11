const React = require('react');
const ReactHighcharts = require('react-highcharts');

function MarketChart({symbol, chartData, retracementLevels}) {
  if (!symbol || !chartData || !retracementLevels) return null;
  const plotLines = Object.keys(retracementLevels).map((percent) => {
    return {
      value: retracementLevels[percent],
      color: '#6ABEDB',
      dashStyle: 'shortdash',
      width: 1,
      zIndex: 5,
      label: {
        style: {color: 'white'},
        text: `${retracementLevels[percent].toFixed(2)}`
      }
    };
  });

  const chartConfig = {
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    chart: {
      backgroundColor: '#000000'
    },
    xAxis: {
      title: {
        text: null
      },
      type: 'datetime',
      dateTimeLabelFormats: {
          day: '%e of %b'
      },
    },
    yAxis: {
      labels: {enabled: false},
      title: {
        text: null
      },
      gridLineWidth: 1,
      gridLineColor: '#1C1F24',
      plotLines
    },
    rangeSelector: {selected: 1},
    title: {text: ''},
    series: [{name: symbol, data: chartData, tooltip: {valueDecimals: 2}, color: '#B0ABA0', lineWidth: 1}]
  };

  return (<ReactHighcharts {...{config: chartConfig}}/>);
}

module.exports = MarketChart;
