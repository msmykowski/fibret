const marketApi = require('./app/api/market_data_api');
marketApi.fetchChartData(
  {Normalized: false, NumberOfDays: 365, DataPeriod: "Day", Elements: [{Symbol: "POT", Type: "price", Params: ["ohlc"]}]
})
.then(data => data.json())
.then(data => {
  fs = require('fs');
  fs.writeFile('helloworld.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
});
