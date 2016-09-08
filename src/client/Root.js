import React, {Component, PropTypes} from 'react';
import {Router} from 'react-router';
import routes from '../universal/routes/index';


class Root extends Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  }

  render () {
    const {
      history,
      store
    } = this.props;

    return (
      <Router history={history} routes={routes(store)} />
    );
  }
}

export default Root;
