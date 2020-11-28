import React, {Component} from 'react';
import { View, Text } from 'react-native';

// Style
import { StyleMain, StyleText } from '../../../res/style/style.js'

//I18n
import I18n from '../../../i18n/i18n.js';

export default class HomeTab extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={StyleMain.containerCenter}>
        <View style={StyleMain.containerCenter}>
          <View style={StyleMain.containerCenter}>
            <Text style={StyleText()}>
              {I18n.t("home.welcome")}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};
