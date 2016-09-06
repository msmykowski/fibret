const React = require('react');
const types = require('react').PropTypes;
const {Actions} = require('p-flux');

function isObject(obj) {
  return typeof obj === 'object';
}

function toFlattenedRoutes(routesHash) {
  return Object.keys(routesHash).reduce((paths, parent) => {
    if (isObject(routesHash[parent])) {
      const children = toFlattenedRoutes(routesHash[parent]);
      Object.keys(children).forEach(child => paths[parent + child] = children[child]);
    } else {
      paths[parent] = routesHash[parent];
    }
    return paths;
  }, {});
}

const routes = {
  '/': 'root',
  '/:symbol/:numberOfDays': 'updateChartInfo'
};

function parseParams(route, fn) {
  return () => {
    const {pathname} = global.location;
    const urlParams = pathname.split('/');
    const params = route.split('/').reduce((memo, param, i) => {
      memo[param.slice(1)] = urlParams[i];
      return memo;
    }, {});
    fn(params);
  };
}

class Router extends React.Component {
  static propTypes = {
    router: types.oneOfType([types.object, types.func])
  };

  componentDidMount() {
    const {router} = this.props;
    Object.entries(toFlattenedRoutes(routes)).map(([path, callbackName]) => {
      router.get(path, parseParams(path, this[callbackName]));
    });
  }

  root = () => {
    const {symbol, numberOfDays} = this.props;
    Actions.chartDataFetch({symbol, numberOfDays});
  }

  updateChartInfo = ({symbol, numberOfDays}) => {
    Actions.chartInfoUpdate({symbol, numberOfDays});
    Actions.chartDataFetch({symbol, numberOfDays});
  }

  render() {
    return null;
  }
}

module.exports = Router;
