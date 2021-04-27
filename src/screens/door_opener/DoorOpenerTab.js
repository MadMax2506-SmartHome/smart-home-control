import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Style
import {StyleMain, StyleText, Color} from '../../res/style/style.js';

export default class DoorOpenerTab extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.data;
  }

  render() {
    return (
      <View style={StyleMain.container}>
        <Text style={StyleText(Color.black, '2%', 'center')}>A</Text>
      </View>
    );
  }
}
