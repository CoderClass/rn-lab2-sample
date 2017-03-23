import React from 'react';
import {
  StyleSheet,
  Text, View, ListView,
  Navigator,
  TextInput,
  Button,
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

  _goToSettings = (navigator) => {
    navigator.push({title: 'Settings', component: Settings});
  }

  _renderSettingButton = (route, navigator) => {
    switch(route.title) {
      case 'Repos': 
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button onPress={() => this._goToSettings(navigator)} title="Settings" />
          </View>
        );
      case 'Settings': 
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button onPress={() => navigator.pop()} title="Back" />
          </View>
        );
    } 
  }

  _applySearch = (value) => {
    console.log('searching for ' + value);
    if (value.length == 0) {
      this.fetchData('react');
    } else {
      this.fetchData(value);
    }
  }

  _renderSearchField = () => {
    return (
      <View style={{flex: 1}}>
        <TextInput
          style={{height: 40, width: 300, padding: 8}} placeholder='Search... (e.g. react)'
          onChangeText={(value) => this._applySearch(value)}
        />
      </View>
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
          navigationBar={
            <Navigator.NavigationBar
              style = {{flex: 1, flexDirection: 'row', backgroundColor: '#eee'}}
              routeMapper={{
                LeftButton: this._renderSearchField,
                Title: () => null,
                RightButton: (route, navigator,) => this._renderSettingButton(route, navigator),
              }}
            />
          }
        />
      </Provider>
    );
  }
}