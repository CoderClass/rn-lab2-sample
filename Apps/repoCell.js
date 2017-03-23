import React, { Component } from 'react';
import { View, Text, Image, 
  StyleSheet,
} from 'react-native';

class RepoCell extends Component {
  state = {  }
  render() {
    const {item} = this.props;

    return (
      <View style={{flex: 1, padding: 8, borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <Text style={styles.repoName}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.by}>by</Text>
              <Text>{item.owner.login}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Image style={styles.icon} source={require('../images/star@2x.png')} />
            <Text style={styles.count}>{item.stargazers_count}</Text>
            <Image style={styles.icon} source={require('../images/fork@2x.png')} />
            <Text style={styles.count}>{item.forks_count}</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image style={styles.image} source={{uri: item.owner.avatar_url}} />
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  count: {
    marginLeft: 8,
    marginTop: 8,
    fontSize: 16,
  },
  by: {
    color: '#666',
    marginRight: 8,
    marginBottom: 8,
  },
  repoName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 64,
    height: 64,
  },
  icon: {
    width: 24,
    height: 24,
    margin: 8,
  },
  description: {
    paddingHorizontal: 8,
  }
})

export default RepoCell;