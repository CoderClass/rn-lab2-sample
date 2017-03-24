import React from 'react';
import {
  Navigator,
} from 'react-native';


import Settings from './settings';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {settingReducer} from './settingRedux';
import ReposTable from './reposTable';

const store = createStore(settingReducer);

export default class App extends React.Component {
  _renderScene = (route, navigator) => {
    return (
      <route.component navigator={navigator}/>
    );
  }

  render() {
    const defaultRoute = {
      title: 'Repos',
      component: ReposTable,
    };
    return (
      <Provider store={store}>
        <Navigator 
          initialRoute={defaultRoute}
          renderScene={this._renderScene}
          style={{paddingTop: 40}}
        />
      </Provider>
    );
  }
}