require('../spec_helper');

describe('Header', () => {
  const symbol = 'GOOG';
  let props;

  beforeEach(() => {
    props = {symbol};
    const Header = require('../../../app/components/header');
    ReactDOM.render(<Header {...props}/>, root);
  });

  describe('clicking on the time selectors', () => {
    it('sets the route', () => {
      $('div[data-days=30]').simulate('click');
      expect('setRoute').toHaveBeenDispatchedWith({data: `/${symbol}/30`});
    });

    it('sets the route', () => {
      $('div[data-days=90]').simulate('click');
      expect('setRoute').toHaveBeenDispatchedWith({data: `/${symbol}/90`});
    });

    it('sets the route', () => {
      $('div[data-days=365]').simulate('click');
      expect('setRoute').toHaveBeenDispatchedWith({data: `/${symbol}/365`});
    });
  });
});
