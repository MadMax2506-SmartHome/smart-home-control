import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

import { StyleMain } from '../../../res/style/style.js'
import { StyleInput, StyleGroupElem } from '../../../res/style/input.js'

//I18n
import I18n from '../../../i18n/i18n.js';

export default class UserTab extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      values: this.props.values
    }
  }

  render() {
    return (
      <View style={StyleMain.container}>
        <View style={StyleInput.panel}>

          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              {I18n.t("settings.labels.user.first_name")}
            </Text>
          </View>

          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder={I18n.t("settings.labels.user.first_name")}
              onChangeText={(value) => {
                this.props.onChangeText("user", "first_name", value)
              }}
              value={this.state.values.first_name}
            />
          </View>

        </View>

        <View style={StyleInput.panel}>

          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              {I18n.t("settings.labels.user.surname")}
            </Text>
          </View>

          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder={I18n.t("settings.labels.user.surname")}
              onChangeText={(value) => {
                this.props.onChangeText("user", "surname", value)
              }}
              value={this.state.values.surname}
            />
          </View>
        </View>
      </View>
    );
  }
};
