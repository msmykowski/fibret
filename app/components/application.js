require('babel-polyfill');
const Bootstrap = require('../bootstrap');
const React = require('react');
const types = React.PropTypes;
const {useStore} = require('p-flux');
const {useRouter} = require('./use_router');
const Router = require('./router');
const MainPage = require('./main_page');
const Header = require('./header');

class Application extends React.Component {
  static propTypes = {
    config: types.object.isRequired,
    store: types.object.isRequired,
    router: types.oneOfType([types.object, types.func])
  };

  render() {
    const {config, store, router} = this.props;
    if (global.FibRet) global.FibRet.store = store;
    return (
      <div>
        <Header {...{symbol: store.symbol}}/>
        <MainPage {...store}/>
        <Router {...{config, router}} {...store}/>
      </div>
    );
  }
}

const EnhancedApplication = useStore(useRouter(Application),
  {
    store: require('../store'),
    actions: [],
    dispatcherHandlers: [
      require('../dispatchers/market_dispatcher'),
      require('../dispatchers/main_dispatcher')
    ],
    /* eslint-disable no-console */
    onDispatch: (event) => {console.info('dispatching event', event);}
    /* eslint-enable no-console */
  }
);

Bootstrap.init(EnhancedApplication);

module.exports = EnhancedApplication;
