import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

import { StyleMain } from '../../../res/style/style.js'
import { StyleInput, StyleGroupElem } from '../../../res/style/input.js'

export default class NasTab extends Component  {
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
              IP-Adresse
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              keyboardType="number-pad"
              placeholder="192.168.178.1"
              onChangeText={(value) => {
                this.props.onChangeText("nas", "ipaddress", value)
              }}
              value={this.state.values.ipaddress}
            />
          </View>
        </View>

        <View style={StyleInput.panel}>
          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              Mac-Adresse
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder="0123456789AB"
              onChangeText={(value) => {
                this.props.onChangeText("nas", "macaddress", value)
              }}
              value={this.state.values.macaddress}
            />
          </View>
        </View>

        <View style={StyleInput.panel}>
          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              Benutzername
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder="Benutzername"
              onChangeText={(value) => {
                this.props.onChangeText("nas", "username", value)
              }}
              value={this.state.values.username}
            />
          </View>
        </View>

        <View style={StyleInput.panel}>
          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              Passwort
            </Text>
          </View>
          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder="Passwort"
              secureTextEntry={true}
              onChangeText={(value) => {
                this.props.onChangeText("nas", "password", value)
              }}
              value={this.state.values.password}
            />
          </View>
        </View>
      </View>
    );
  }
};
