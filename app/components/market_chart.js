const React = require('react');
const ReactHighcharts = require('react-highcharts');

function MarketChart({symbol, chartData}) {
  const chartConfig = {
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
          day: '%e of %b'
      }
    },
    rangeSelector: {selected: 1},
    title: {text: `${symbol} Stock Price`},
    series: [{name: symbol, data: chartData, tooltip: {valueDecimals: 2}}]
  };
  return (<ReactHighcharts {...{config: chartConfig}}/>);
}

module.exports = MarketChart;
