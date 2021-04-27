import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//I18n
import I18n from '../../i18n/i18n.js';

// Style
import {
  StyleMain,
  Color,
  StyleButton,
  StyleBox,
} from '../../res/style/style.js';

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

export default class DoorOpenerTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone_key: this.props.data.get_data().phone_key,
      phone_number: this.props.data.get_data().phone_number,
    };
  }

  render() {
    return (
      <View style={StyleMain.container}>
        <View style={StyleBox('100%', 'auto', '0%', '15%')}>
          <TouchableOpacity
            style={StyleButton()}
            onPress={() =>
              RNImmediatePhoneCall.immediatePhoneCall('024068034049')
            }>
            <MaterialCommunityIcons
              name="door-open"
              size={30}
              color={Color.black}
            />
            <Text>{I18n.t('door_opener.actions.call')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
