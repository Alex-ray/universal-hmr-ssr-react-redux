import React, {Component, PropTypes} from 'react';

class Html extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    assets: PropTypes.object,
    renderProps: PropTypes.object
  }

  render () {
    const PROD = process.env.NODE_ENV === 'production';

    const {
      title,
      store,
      assets,
      renderProps
    } = this.props;

    const {
      manifest,
      app,
      vendor
    } = assets || {};

    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`;

    const root = PROD && renderToString(
      <Provider store={store}>
       <RouterContext {...renderProps}/>
      </Provider>
    );

    return (
     <html>
       <head>
         <meta charSet="utf-8"/>
         {PROD && <link rel="stylesheet" href="/static/prerender.css" type="text/css"/>}
         <title>{title}</title>
       </head>
       <body>
         <script dangerouslySetInnerHTML={{__html: initialState}}/>
         {PROD ? <div id="root" dangerouslySetInnerHTML={{__html: root}}></div> : <div id="root"></div>}
         {PROD && <script dangerouslySetInnerHTML={{__html: manifest.text}}/>}
         {PROD && <script src={vendor.js}/>}
         <script src={PROD ? app.js : '/static/app.js'}/>
       </body>
     </html>
    );
  }

}

export default Html;
