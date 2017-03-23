import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';

const reposURL = 'https://api.github.com/search/repositories';

import RepoCell from './repoCell';

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

  async fetchData() {
    const json = await this.searchRepos({
      q: 'react',
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
    )
  }

  render() {
    return (
      <ListView 
        style={{paddingTop: 20}}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }
}
