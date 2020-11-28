import React, {Component} from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

import { StyleMain } from '../../../res/style/style.js'
import { StyleInput, StyleGroupElem } from '../../../res/style/input.js'

export default class FeatureTab extends Component  {
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
              Smart Home Steuerung
              </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <Switch
              style={StyleGroupElem.input}
              value={this.state.values.is_smart_home_control_active}
              onValueChange={(value) => {
                this.props.onValueChange("feature", "is_smart_home_control_active", value)
              }}
            />
          </View>
        </View>
        <View style={StyleInput.panel}>
          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              NAS-Steuerung
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <Switch
              style={StyleGroupElem.input}
              value={this.state.values.is_nas_control_active}
              onValueChange={(value) => {
                this.props.onValueChange("feature", "is_nas_control_active", value)
              }}
            />
          </View>
        </View>
      </View>
    );
  }
};
