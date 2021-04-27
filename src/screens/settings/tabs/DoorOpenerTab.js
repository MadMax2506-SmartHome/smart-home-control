import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

import {StyleMain} from '../../../res/style/style.js';
import {StyleInput, StyleGroupElem} from '../../../res/style/input.js';

//I18n
import I18n from '../../../i18n/i18n.js';

export default class DoorOpenerTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: this.props.values,
    };
    console.log(this.state.values);
  }

  render() {
    return (
      <View style={StyleMain.container}>
        <View style={StyleInput.panel}>
          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              {I18n.t('settings.labels.door_opener.phone_number')}
            </Text>
          </View>

          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder={I18n.t('settings.labels.door_opener.phone_number')}
              onChangeText={value => {
                this.props.onChangeText('door_opener', 'phone_number', value);
              }}
              value={this.state.values.phone_number}
            />
          </View>
        </View>

        <View style={StyleInput.panel}>
          <View style={StyleInput.label_wrapper}>
            <Text style={StyleGroupElem.label}>
              {I18n.t('settings.labels.door_opener.phone_key')}
            </Text>
          </View>

          <View style={StyleInput.wrapper}>
            <TextInput
              style={StyleGroupElem.input}
              placeholder={I18n.t('settings.labels.door_opener.phone_key')}
              onChangeText={value => {
                this.props.onChangeText('door_opener', 'phone_key', value);
              }}
              value={this.state.values.door_opener}
            />
          </View>
        </View>
      </View>
    );
  }
}
