const fetchJsonP = require('fetch-jsonp');
const {compactObj} = require('../../helpers/application_helper');
const apiUrl = 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp?parameters=';

const MarketDataApi = {
  fetchChartData(params) {
    const {
      Symbol='AAPL',
      Normalized=false,
      NumberOfDays=365,
      DataPeriod='Day',
      DataInterval,
      LabelPeriod,
      LabelInterval,
      Elements
    } = params;

    const validParams = compactObj({
      Symbol,
      Normalized,
      NumberOfDays,
      DataPeriod,
      DataInterval,
      LabelPeriod,
      LabelInterval,
      Elements
    });
     
    const parameters = `%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A${NumberOfDays}0%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22${Symbol}%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22ohlc%22%5D%7D%2C%7B%22Symbol%22%3A%22${Symbol}%22%2C%22Type%22%3A%22price%22%7D%5D%7D`;
    return fetchJsonP(`${apiUrl}${parameters}`).then(res => res.json()).then(json => json).catch(e => console.log(e));
  }
};

module.exports = MarketDataApi;
