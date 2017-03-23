import React, { Component } from 'react';
import {
  Text,
  Slider,
  View,
} from 'react-native';

class Settings extends Component {
  state = { minStars: 1 }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', paddingTop: 24}}>
        <Text>Minimum Stars</Text>
        <Slider
          style={{backgroundColor: 'red', width: 200}}
          minimumValue={0}
          step={1}
          maximumValue={100}
          onValueChange={(minStars) => this.setState({minStars})} 
         />
        <Text>
          {this.state.minStars && + this.state.minStars.toFixed(3)}
        </Text>
      </View>
    );
  }
}

export default Settings;
