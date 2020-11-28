import React, {Component} from 'react';
import { View, Text } from 'react-native';

// Style
import { StyleText } from '../../../../res/style/style.js'
import { StyleGroup } from '../../../../res/style/input.js'

// Component
import ItemPicker from '../../../../components/ItemPicker.js'

//I18n
import I18n from '../../../../i18n/i18n.js';

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
            {I18n.t("smart_home.light.control.animationTyp")}
          </Text>
        </View>

        <View style={StyleGroup.main}>
          <ItemPicker
            labels={this.state.labels}
            values={this.state.values}
            selectedValue={this.state.selectedValue}
            onChange={(type) => this.props.onChange(type)}
          />
        </View>

      </View>
    );
  }
};
