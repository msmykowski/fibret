const MarketApi = require('../api/market_data_api');

function formatChartData(data) {
  console.log(data);
  const {Dates, Elements} = data;
  const {values} = Elements[0].DataSeries.open;
  return Dates.map((date, i) => [Date.parse(date), values[i]]);
}

function calculateRetracementLevels(data) {
  const {Elements} = data;
  const {high: {max}, low: {min}} = Elements[0].DataSeries;
  const diff = max - min;

  return [100, 61.8, 50, 38.2, 23.6].reduce((memo, percent) => {
    memo[percent] = ((percent/100) * diff) + min;
    return memo;
  }, {});
}

const ChartDispatcher = {
  async chartDataFetch({data: {symbol, numberOfDays}}) {
    const data = await MarketApi.fetchChartData({symbol, numberOfDays});
    this.$store.refine('chartData').set(formatChartData(data));
    this.$store.refine('retracementLevels').set(calculateRetracementLevels(data));
  },

  chartInfoUpdate({data: {symbol, numberOfDays}}) {
    this.$store.refine('symbol').set(symbol);
    this.$store.refine('numberOfDays').set(numberOfDays);
  }
};

module.exports = ChartDispatcher;
