import React from 'react';
import {Platform, ToastAndroid} from 'react-native';

const duration = 1500

module.exports = {
  notification(msg) {
    Platform.OS === 'android' ? ToastAndroid.show(msg, duration) : null
  }
}
