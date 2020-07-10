import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Item_picker from '../../../../madmax_modules/item_picker/Item_picker.js'

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
        <View style={style.header}>
          <Text>
            Richtung:
          </Text>
        </View>
        <View style={style.main}>
          <Item_picker labels={this.state.labels} values={this.state.values} selectedValue={this.state.selectedValue} onChange={(orientation) => this.props.onChange(orientation)}/>
        </View>
      </View>
    );
  }
};

const style = StyleSheet.create({
  header: {
    width: "100%",
  },
  main: {
    width: "100%",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
});
