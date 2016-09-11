const React = require('react');
const {Actions} = require('p-flux');

const MarketChart = require('./market_chart');

function MainPage(props) {
  const {symbol, numberOfDays, chartData, retracementLevels} = props;

  return (
    <div className="main-page">
      <MarketChart {...{symbol, numberOfDays, chartData, retracementLevels}}/>
    </div>
  );
}

module.exports = MainPage;
