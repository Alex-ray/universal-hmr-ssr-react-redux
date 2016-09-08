import React, {Component, PropTypes} from 'react';
import Counter from 'universal/modules/counter/components/Counter/Counter';
import {connect} from 'react-redux';
import {
  incrementCount,
  decrementCount
} from 'universal/modules/counter/ducks/counter';


@connect(mapStateToProps, mapDispatchToProps)
class CounterContainer extends Component {
  static propTypes = {
    // State
    count: PropTypes.number.isRequired,

    // Dispatchers
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired
  }

  render () {
    return (
      <div>
        <Counter {...this.props} />
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const auth = state.get('counter');
  return {
    count: auth.get('count')
  };
}


function mapDispatchToProps(dispatch, props) {
  return {
    incrementCount: () => {
      dispatch(incrementCount());
    },
    decrementCount: () => {
      dispatch(decrementCount());
    }
  };
}

export default CounterContainer;
