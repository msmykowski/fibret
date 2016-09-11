require('../spec_helper');

describe('MarketDispatcher', () => {
  let subject, Cursor, cursorSpy;

  const symbol = 'AAPL';
  const numberOfDays = 365;

  beforeEach(() => {
    Cursor = require('pui-cursor');
    cursorSpy = jasmine.createSpy('callback');
    subject = Dispatcher;
    subject.dispatch.and.callThrough();
    spyOn(subject, 'onDispatch');
  });

  describe('chartInfoUpdate', () => {
    beforeEach(() => {
      subject.$store = new Cursor({symbol: null, numberOfDays: null}, cursorSpy);
      subject.dispatch({type: 'chartInfoUpdate', data: {symbol, numberOfDays}});
    });

    it('makes an api request to posts', () => {
      expect(cursorSpy).toHaveBeenCalledWith({symbol, numberOfDays});
    });
  });

  describe('chartDataFetch', () => {
    let marketApi, fetchPromise;
    beforeEach(() => {
      marketApi = require('../../../app/api/market_data_api');
      fetchPromise = new Deferred();
      spyOn(marketApi, 'fetchChartData').and.returnValue(fetchPromise);
      subject.$store = new Cursor({chartData: null, retracementLevels: {}}, cursorSpy);
      subject.dispatch({type: 'chartDataFetch', data: {symbol, numberOfDays}});
      const Dates = [
        '2002-12-30T00:00:00',
        '2002-12-31T00:00:00',
        '2003-01-02T00:00:00',
        '2003-01-03T00:00:00',
        '2003-01-06T00:00:00'
      ];
      const values = [1,2,3, 4, 5];
      const Elements = [{DataSeries: {open: {values}, high: {max: 100}, low: {min: 0}}}];
      const data = {Dates, Elements};
      fetchPromise.resolve(data);
    });

    it('fetches the chartData', () => {
      expect(marketApi.fetchChartData).toHaveBeenCalledWith({symbol, numberOfDays});
    });

    it('sets the chartData in the cursor', () => {
      const formattedData = [[ 1041206400000, 1 ], [ 1041292800000, 2 ], [ 1041465600000, 3 ], [ 1041552000000, 4 ], [ 1041811200000, 5 ]];
      const retracementLevels = { 50: 50, 100: 100, 61.8: 61.8, 38.2: 38.2, 23.6: 23.6 };
      expect(cursorSpy).toHaveBeenCalledWith({chartData: formattedData, retracementLevels});
    });
  });
});
