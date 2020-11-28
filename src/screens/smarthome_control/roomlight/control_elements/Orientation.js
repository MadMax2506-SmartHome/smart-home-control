import React, {Component} from 'react';
import { View, Text } from 'react-native';

// Style
import { StyleText } from '../../../../res/style/style.js'
import { StyleInput, StyleGroup } from '../../../../res/style/input.js'

// Component
import ItemPicker from '../../../../components/ItemPicker.js'

//I18n
import I18n from '../../../../i18n/i18n.js';

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
            {I18n.t("smart_home.light.control.orientation")}
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
