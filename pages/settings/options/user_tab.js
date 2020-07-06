import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

// Globales
import STYLE from '../../../data/config/style.js'

export default class SettingsScreen extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        first_name: null,
        surname: null
      },
    }
  }

  render() {
    return (
      <View style={STYLE.SCREEN.centerPanel}>
        <View style={style.inputPanel}>
          <View style={style.label}>
            <Text>Vorname</Text>
          </View>
          <View style={style.inputContent}>
            <TextInput
              style={style.input}
              autoFocus={true}
              placeholder="Vorname"
              onChangeText={(value) => {this.onChangeText("user", "first_name", value)}}
              value={this.state.values.first_name}
            />
          </View>
          </View>
          <View style={style.inputPanel}>
          <View style={style.label}>
            <Text>Nachname</Text>
          </View>
          <View style={style.inputContent}>
            <TextInput
              style={style.input}
              placeholder="Nachname"
              onChangeText={(value) => {this.onChangeText("user", "surname", value)}}
              value={this.state.values.surname}
            />
          </View>
        </View>
      </View>
    );
  }
};

const style = StyleSheet.create({
  inputPanel: {
    flexDirection: 'row',
  },
  label: {
    justifyContent: 'center',
    width: "30%",
    marginLeft: "10%",
  },
  inputContent: {
    justifyContent: 'center',
    width: "50%",
    marginRight: "10%",
    padding: 5,
  },
  input: {
    height: 25,
    padding: 0,
    paddingLeft: 5,

    borderColor: '#000000',
    borderBottomWidth: 1,
  },
});
