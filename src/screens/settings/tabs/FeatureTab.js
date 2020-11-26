import React, {Component} from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

// Allgemein
import STYLE from '../../../res/style.js'

export default class Feature_tab extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      values: this.props.values
    }
  }

  render() {
    return (
      <View style={STYLE.SCREEN.centerPanel}>
        <View style={style.inputPanel}>
          <View style={style.label}>
            <Text>Smart Home Steuerung</Text>
          </View>
          <View style={style.inputContent}>
            <Switch
              style={style.input}
              value={this.state.values.is_smart_home_control_active}
              onValueChange={(value) => {
                this.props.onValueChange("feature", "is_smart_home_control_active", value)
              }}
            />
          </View>
        </View>
        <View style={style.inputPanel}>
          <View style={style.label}>
            <Text>NAS-Steuerung</Text>
          </View>
          <View style={style.inputContent}>
            <Switch
              style={style.input}
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

const style = StyleSheet.create({
  inputPanel: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    justifyContent: 'center',
    width: "55%",
    marginLeft: "15%",
  },
  inputContent: {
    justifyContent: 'center',
    width: "15%",
    marginRight: "15%",
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
