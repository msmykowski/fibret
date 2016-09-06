const {fetchChartData} = require('../api/market_data_api');

function formatChartData(data) {
  const {Dates, Elements} = data;
  const {values} = Elements[0].DataSeries.open;
  return Dates.map((date, i) => [Date.parse(date), values[i]]);
}

const ChartDispatcher = {
  chartDataFetch({data: {symbol: Symbol, numberOfDays: NumberOfDays}}) {
    const Elements = [{Symbol, Type: 'price', Params: ['ohlc']}];
    fetchChartData({Symbol, Elements, NumberOfDays}).then(data => console.log(data) || this.$store.refine('chartData').set(formatChartData(data)));
  },

  chartInfoUpdate({data: {symbol, numberOfDays}}) {
    this.$store.refine('symbol').set(symbol);
    this.$store.refine('numberOfDays').set(numberOfDays);
  }
};

module.exports = ChartDispatcher;
