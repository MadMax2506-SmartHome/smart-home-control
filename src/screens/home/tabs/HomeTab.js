import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { StyleMain } from '../../../res/style/style.js'

export default class HomeTab extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={StyleMain.containerCenter}>
        <View style={StyleMain.containerCenter}>
          <View style={StyleMain.containerCenter}>
            <Text>Wilkommen in Ihrem Smart Home Client</Text>
          </View>
        </View>
      </View>
    );
  }
};
