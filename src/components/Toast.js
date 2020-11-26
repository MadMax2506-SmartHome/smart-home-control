import React from 'react';
import {Platform, ToastAndroid} from 'react-native';

const DURATION = 500

module.exports = {
  notification(msg, duration=DURATION) {
    Platform.OS === 'android' ? ToastAndroid.show(msg, duration) : null
  }
}
