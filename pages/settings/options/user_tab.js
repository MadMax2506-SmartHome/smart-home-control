import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

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
            <Text>Vorname</Text>
          </View>
          <View style={this.style.inputContent}>
            <TextInput
              style={this.style.input}
              placeholder="Vorname"
              onChangeText={(value) => {
                this.props.onChangeText("user", "first_name", value)
              }}
              value={this.state.values.first_name}
            />
          </View>
        </View>
        <View style={this.style.inputPanel}>
          <View style={this.style.label}>
            <Text>Nachname</Text>
          </View>
          <View style={this.style.inputContent}>
            <TextInput
              style={this.style.input}
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
