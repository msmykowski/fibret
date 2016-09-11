const invariant = require('invariant');
const React = require('react');
const ReactDOM = require('react-dom');

module.exports = {
  init(Entry, props = {}) {
    if (typeof document === 'undefined') return;
    require('./stylesheets/application.scss');
    require('babel!pui-react-tools/assets/entry-loader?name=index.html!./components/application');
    invariant(global.FibRet,
      `globalNamespace in application.json has been changed without updating global variable name bootstrap.js.
      Please change "FibRet" in bootstrap.js to your current globalNamespace`
    );
    const {config} = global.FibRet;
    ReactDOM.render(<Entry {...props} {...{config}}/>, root);
  }
};
