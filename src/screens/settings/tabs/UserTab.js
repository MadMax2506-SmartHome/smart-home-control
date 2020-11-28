import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

import { StyleMain } from '../../../res/style/style.js'
import { StyleInput, StyleGroupElem } from '../../../res/style/input.js'

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
              Vorname
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder="Vorname"
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
              Nachname
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder="Nachname"
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
