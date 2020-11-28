import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { StyleText } from '../../../../res/style/style.js'
import { StyleGroup } from '../../../../res/style/input.js'

import ItemPicker from '../../../../components/ItemPicker.js'

export default class AnimationType extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.selectedValue,
      labels: this.props.labels,
      values: this.props.values,
    }
  }

  render() {
    return (
      <View>
        <View style={StyleGroup.header}>
          <Text style={StyleText()}>
            Animationstyp
          </Text>
        </View>
        <View style={StyleGroup.main}>
          <ItemPicker labels={this.state.labels} values={this.state.values} selectedValue={this.state.selectedValue} onChange={(type) => this.props.onChange(type)}/>
        </View>
      </View>
    );
  }
};
