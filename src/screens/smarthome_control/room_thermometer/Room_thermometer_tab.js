import React, {Component} from 'react';
import { Text, View } from 'react-native';

// Tab-Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

// Global
import STYLE from '../../../res/style.js'

export default class Room_thermometer_tab extends Component {
  constructor(props) {
    super(props);

    this.mqtt               = this.props.mqtt
    this.room_thermometer   = this.props.room_thermometer
  }

  render() {
    return (
      <></>
    );
  }
};
