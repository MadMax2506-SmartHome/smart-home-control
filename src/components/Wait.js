import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

// Style
import { Color, StyleMain } from '../res/style/style.js';

// Components
import Logo from "./Logo.js"

export default class Wait extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={StyleMain.containerCenter}>
        <Logo/>

        <ActivityIndicator
          size={120}
          color={Color.black}
        />
      </View>
    );
  }
}
