import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

import { StyleMain } from '../../../res/style/style.js'
import { StyleInput, StyleGroupElem } from '../../../res/style/input.js'

//I18n
import I18n from '../../../i18n/i18n.js';

export default class MqttTab extends Component  {
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
              {I18n.t("settings.labels.mqtt.ipaddress")}
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder="192.168.178.1"
              onChangeText={(value) => {
                this.props.onChangeText("mqtt", "ipaddress", value)
              }}
              value={this.state.values.ipaddress}
            />
            </View>
        </View>

        <View style={StyleInput.panel}>
          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              {I18n.t("settings.labels.mqtt.port")}
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              keyboardType="number-pad"
              placeholder="1883"
              onChangeText={(value) => {
                this.props.onChangeText("mqtt", "port", value)
              }}
              value={this.state.values.port == 0 ? '' : this.state.values.port}
            />
          </View>
        </View>

      </View>
    );
  }
};
