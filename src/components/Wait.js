import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

import { Color, StyleMain } from '../res/style/style.js';

export default class Wait extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={StyleMain.containerCenter}>
        <ActivityIndicator size={120} color={Color.blue} />
      </View>
    );
  }
}
