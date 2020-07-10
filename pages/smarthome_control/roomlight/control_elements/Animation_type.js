import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Allgemein
import Item_picker from '../../../../madmax_modules/item_picker/Item_picker.js'

export default class Animation_type extends Component  {
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
        <View style={style.header}>
          <Text>Animationstyp</Text>
        </View>
        <View style={style.main}>
          <Item_picker labels={this.state.labels} values={this.state.values} selectedValue={this.state.selectedValue} onChange={(type) => this.props.onChange(type)}/>
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
