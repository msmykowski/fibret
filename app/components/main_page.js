const React = require('react');
const MarketChart = require('./market_chart');
const {Actions} = require('p-flux');

function onEnter({keyCode}, ref) {
  if (keyCode === 13) {
    Actions.setRoute(`/${ref.input.value}/365`);
  }
}

function MainPage(props) {
  const ref = {};
  const {symbol, numberOfDays, chartData} = props;
  return (
    <div>
      <input onKeyDown={(e) => onEnter(e, ref)} ref={(c) => ref.input = c}/>
      <MarketChart {...{symbol, numberOfDays, chartData}}/>
    </div>
  );
}

module.exports = MainPage;
