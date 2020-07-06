import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

// Globales
import STYLE from '../../../data/config/style.js'

export default class SettingsScreen extends Component  {
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
              onChangeText={(value) => {this.props.onChangeText("mqtt", "ipaddress", value)}}
              value={this.state.values.ipaddress}
            />
            </View>
        </View>
        <View style={this.style.inputPanel}>
          <View style={this.style.label}>
            <Text>Port</Text>
          </View>
          <View style={this.style.inputContent}>
            <TextInput
              style={this.style.input}
              keyboardType="number-pad"
              placeholder="1883"
              onChangeText={(value) => {this.props.onChangeText("mqtt", "port", value)}}
              value={this.state.values.port}
            />
          </View>
        </View>
      </View>
    );
  }
};
