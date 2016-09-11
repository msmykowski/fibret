require('../spec_helper');

describe('MarketDataApi', () => {
  let subject;
  beforeEach(() => {
    subject = require('../../../app/api/market_data_api');
  });

  describe('#fetchChartData', () => {
    const Symbol = 'AAPL';
    it('fetches chartData', () => {
      subject.fetchChartData({Symbol, NumberOfDays: 365, Elements: [{Symbol, Type: 'price', Params: ['ohlc']}]});
      
    });
  });

});
