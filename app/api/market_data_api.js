const fetchJsonP = require('fetch-jsonp');

const apiUrl = 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp?parameters=';

const MarketDataApi = {
  fetchChartData({symbol: Symbol, numberOfDays: NumberOfDays}) {
    const parameters = {
      Normalized: false,
      NumberOfDays,
      DataPeriod: 'Day',
      Elements: [{Symbol, Type: 'price', Params: ['ohlc']}]
    };
    return fetchJsonP(`${apiUrl}${encodeURI(JSON.stringify(parameters))}`)
    .then(res => res.json())
    .then(json => json);
  }
};

module.exports = MarketDataApi;
