import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

// Globales
import STYLE from '../../../data/config/style.js'

export default class Nas_tab extends Component  {
  constructor(props) {
    super(props);

    this.style = this.props.style
    this.state = {
      values: this.props.values
    }
  }

  render() {
    return (
      <View style={STYLE.SCREEN.centerPanel}>
        <View style={this.style.inputPanel}>
          <View style={this.style.label}>
            <Text>IP-Adresse</Text>
          </View>
          <View style={this.style.inputContent}>
            <TextInput
              style={this.style.input}
              keyboardType="number-pad"
              placeholder="192.168.178.1"
              onChangeText={(value) => {
                this.props.onChangeText("nas", "ipaddress", value)
              }}
              value={this.state.values.ipaddress}
            />
          </View>
        </View>

        <View style={this.style.inputPanel}>
          <View style={this.style.label}>
            <Text>Mac-Adresse</Text>
          </View>
          <View style={this.style.inputContent}>
            <TextInput
              style={this.style.input}
              placeholder="0123456789AB"
              onChangeText={(value) => {
                this.props.onChangeText("nas", "macaddress", value)
              }}
              value={this.state.values.macaddress}
            />
          </View>
        </View>

        <View style={this.style.inputPanel}>
          <View style={this.style.label}>
            <Text>Benutzername</Text>
          </View>
          <View style={this.style.inputContent}>
            <TextInput
              style={this.style.input}
              placeholder="Benutzername"
              onChangeText={(value) => {
                this.props.onChangeText("nas", "username", value)
              }}
              value={this.state.values.username}
            />
          </View>
        </View>

        <View style={this.style.inputPanel}>
          <View style={this.style.label}>
            <Text>Passwort</Text>
          </View>
          <View style={this.style.inputContent}>
            <TextInput
              style={this.style.input}
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
