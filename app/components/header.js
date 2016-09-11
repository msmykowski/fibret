const React = require('react');
const {Actions} = require('p-flux');

function Header({symbol}) {
  const onEnter = ({keyCode}) => {
    if (keyCode === 13) {
      Actions.setRoute(`/${onEnter.input.value}/365`);
      onEnter.input.value = '';
    }
  };

  const onClick = (e) => {
    Actions.setRoute(`/${symbol}/${e.target.dataset.days}`);
  };

  return (
    <div className="header">
      <input type="text" placeholder="search symbol..." onKeyDown={(e) => onEnter(e)} ref={(c) => onEnter.input = c}/>
      <div>
        <span className="time-selector" {...{onClick}} data-days="30">1M</span>
        <span className="time-selector" {...{onClick}} data-days="90">3M</span>
        <span className="time-selector" {...{onClick}} data-days="365">1Y</span>
      </div>
    </div>
  );
}

module.exports = Header;
