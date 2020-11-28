import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { StyleText } from '../../../../res/style/style.js'
import { StyleInput, StyleGroup } from '../../../../res/style/input.js'

import ItemPicker from '../../../../components/ItemPicker.js'

export default class Orientation extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      labels: this.props.labels,
      values: this.props.values,
      selectedValue: this.props.selectedValue,
    }
  }

  render() {
    return (
      <View>
        <View style={StyleGroup.header}>
          <Text style={StyleText()}>
            Richtung
          </Text>
        </View>
        <View style={StyleGroup.main}>
          <ItemPicker
            labels={this.state.labels}
            values={this.state.values}
            selectedValue={this.state.selectedValue}
            onChange={(orientation) => this.props.onChange(orientation)}
          />
        </View>
      </View>
    );
  }
};
