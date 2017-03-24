import React, { Component } from 'react';
import {
  Text,
  Slider,
  View,
  StyleSheet,
  Button,
} from 'react-native';

import {actionCreators} from './settingRedux';
import {connect} from 'react-redux';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minStars: (this.props && this.props.minStars) || 1,
    };
  }

  _updateMinStars = (minStars) => {
    this.setState({minStars});
  }

  _save = () => {
    const { dispatch, navigator } = this.props;
    dispatch(actionCreators.setMinStars(this.state.minStars));
    navigator.pop();
  }

  render() {
    const {navigator} = this.props;
    
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button title="Back" onPress={() => navigator.pop()} />
            <Button title="Save" onPress={this._save} />
          </View>
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 24, justifyContent: 'space-between'}}>
            <Text style={styles.paddedText}>Minimum Stars</Text>
            <Slider
              style={{flex: 1}}
              minimumValue={0}
              step={1}
              value={this.props.minStars}
              maximumValue={10000}
              onValueChange={this._updateMinStars} 
            />
            <Text style={[styles.paddedText, {minWidth: 48, textAlign: 'right'}]}>
              {this.state.minStars}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paddedText: {padding: 8},
});

const mapStateToProps = (state) => ({
  minStars: state.minStars,
});

export default connect(mapStateToProps)(Settings);
