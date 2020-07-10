import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Allgemein
import STYLE from '../../../data/config/style.js'

export default class Home_tab extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={STYLE.SCREEN.main}>
        <View style={STYLE.SCREEN.centerPanel}>
          <View style={STYLE.SCREEN.panel}>
            <Text>Wilkommen in ihrem Smart-Home</Text>
          </View>
        </View>
      </View>
    );
  }
};
