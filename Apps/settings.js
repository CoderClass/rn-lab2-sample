import React, { Component } from 'react';
import {
  Text,
  Slider,
  View,
  StyleSheet,
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
    const {dispatch} = this.props;
    this.setState({minStars});
    dispatch(actionCreators.setMinStars(minStars));
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', paddingTop: 24, justifyContent: 'space-between'}}>
        <Text style={styles.paddedText}>Minimum Stars</Text>
        <Slider
          style={{flex: 1}}
          minimumValue={0}
          step={1}
          value={this.props.minStars}
          maximumValue={100}
          onValueChange={this._updateMinStars} 
        />
        <Text style={[styles.paddedText, {minWidth: 48, textAlign: 'right'}]}>
          {this.state.minStars}
        </Text>
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
