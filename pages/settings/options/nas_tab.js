import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, BackHandler } from 'react-native';

// Globales
import STYLE from '../../../data/config/style.js'

export default class SettingsScreen extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        ipaddress: null,
        macaddress: null,
        username: null,
        password: null,
      },
    }
  }

  render() {
    return (
      <View style={STYLE.SCREEN.centerPanel}>
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
