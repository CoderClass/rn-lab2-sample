import React, { Component } from 'react';
import { 
  StyleSheet,
  ListView,

 } from 'react-native';

const reposURL = 'https://api.github.com/search/repositories';
import RepoCell from './repoCell';
import {connect} from 'react-redux';

class ReposTable extends Component {
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
    const json = require('../repositories.json');
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
    const items = json.items;
    this.setState({dataSource: this.state.dataSource.cloneWithRows(items)});
    console.log('items', items);
  }

  _renderRow = (rowData) => {
    return (
      <RepoCell item={rowData} />
    );
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

const mapStateToProps = (state) => ({
  minStars: state.minStars,
});

export default connect(mapStateToProps)(ReposTable);