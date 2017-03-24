import React, { Component } from 'react';
import { 
  View,
  Button,
  TextInput,
  ListView,

 } from 'react-native';

const reposURL = 'https://api.github.com/search/repositories';
import RepoCell from './repoCell';
import {connect} from 'react-redux';
import Settings from './settings';

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
    alert('did mount')
    this.fetchLocal();

  }

  componentWillReceiveProps(nextProps) {
    this.fetchData();
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
      order: 'desc',
      stars: this.props.minStars,
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

  _applySearch = (value) => {
    console.log('searching for ' + value);
    if (value.length == 0) {
      this.fetchData('react');
    } else {
      this.fetchData(value);
    }
  }

  _goToSettings = (navigator) => {
    navigator.push({title: 'Settings', component: Settings});
  }

  render() {
    const {navigator} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{height: 40, flex: 1, padding: 8}} placeholder='Search... (e.g. react)'
            onChangeText={(value) => this._applySearch(value)}
          />
          <View style={{justifyContent: 'center'}}>
            <Button onPress={() => this._goToSettings(navigator)} title="Settings" />
          </View>
        </View>
        <ListView
          style={{paddingTop: 20}}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  minStars: state.minStars,
});

export default connect(mapStateToProps)(ReposTable);