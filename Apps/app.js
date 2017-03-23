import React from 'react';
import {
  StyleSheet,
  Text, View, ListView,
  Navigator,
  TextInput,
  Button,
} from 'react-native';

const reposURL = 'https://api.github.com/search/repositories';

import RepoCell from './repoCell';
import Settings from './settings';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };

  }
  componentDidMount() {
    // this.fetchData().done();
    this.fetchLocal();
  }

  fetchLocal() {
    json = require('../repositories.json');
    this.setState({dataSource: this.state.dataSource.cloneWithRows(json.items)});
  }

  async searchRepos(params) {
    let queryStringArr = [];
    for(const key of Object.keys(params)) {
      queryStringArr.push(`${key}=${params[key]}`);
    }
    const queryString = queryStringArr.join('&');
    const url = `${reposURL}?${queryString}`;
    const response = await fetch(url);
    return response.json();
  }

  async fetchData(query = 'react') {
    const json = await this.searchRepos({
      q: query,
      sort: 'stars',
      desc: 'order',
    });
    items = json.items;
    this.setState({dataSource: this.state.dataSource.cloneWithRows(items)});
    console.log('items', items);
  }

  _renderRow = (rowData) => {
    return (
      <RepoCell item={rowData} />
    );
  }

  _renderScene = (route, navigator) => {
    switch(route.title) {
      case 'Repos': 
        return (
          <ListView
            style={{paddingTop: 20}}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        );
      case 'Settings': 
        return (
          <Settings />
        );
      default: 
        return null;
    } 
  }

  _goToSettings = (navigator) => {
    navigator.push({title: 'Settings'});
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
    };
    return (
      <Navigator initialRoute={defaultRoute}
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
    );
  }
}