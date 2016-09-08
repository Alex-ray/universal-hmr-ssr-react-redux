import AppContainer from 'universal/containers/App/AppContainer';

export default (store) => {
  return {
    component: AppContainer,
    childRoutes: [
      require('./landing'),
      require('./counter')
    ]
  }
}
