import React, {Component} from 'react';
import {View, Image} from 'react-native';

import { StyleLogo } from '../res/style/style.js';

export default class Logo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={StyleLogo.container}>
        <Image
          style={StyleLogo.size}
          source={require('../res/img/logo.png')}
        />
      </View>
    );
  }
}
