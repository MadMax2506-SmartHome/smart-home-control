import React, {Component} from 'react';
import { View, Text, Switch } from 'react-native';

// STyle
import { StyleMain } from '../../../res/style/style.js'
import { StyleInput, StyleGroupElem } from '../../../res/style/input.js'

//I18n
import I18n from '../../../i18n/i18n.js';

export default class FeatureTab extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      values: this.props.values
    }
  }

  render() {
    return (
      <View style={StyleMain.container}>
        <View style={StyleInput.panel}>

          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              {I18n.t("settings.labels.features.smart_home")}
            </Text>
          </View>

          <View style={StyleInput.wrapper}>
            <Switch
              style={StyleGroupElem.input}
              value={this.state.values.is_smart_home_control_active}
              onValueChange={(value) => {
                this.props.onValueChange("feature", "is_smart_home_control_active", value)
              }}
            />
          </View>
        </View>
      </View>
    );
  }
};
