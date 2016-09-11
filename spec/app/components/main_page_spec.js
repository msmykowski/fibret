require('../spec_helper');

describe('MainPage', () => {
  const symbol = 'AAPL';
  const numberOfDays = 365;

  let props;
  beforeEach(() => {
    const chartData = {};
    const retracementLevels = {};
    props = {symbol, numberOfDays, chartData, retracementLevels};
    const MainPage = require('../../../app/components/main_page');
    ReactDOM.render(<MainPage {...props}/>, root);
  });

  xdescribe('when a symbol is entered into the input', () => {
    beforeEach(() => {
      const e = $.Event('keydown');
      e.which = 13;
      e.keyCode = 13;
      $('input').trigger(e);
    });

    it('sets the route', () => {
      expect('setRoute').toHaveBeenDispatchedWith('/GOOG/365');
    });
  });
});
