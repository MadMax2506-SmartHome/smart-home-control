import React, { Component } from 'react';
import {View} from 'react-native';

import { Feature, User, Mqtt, Nas } from "../res/data/Data.js"
import Wait from "../components/Wait.js"

export default class FetchDataScreen extends Component  {
  render() {
    return (
      <View>
        <Wait/>
      </View>
    );
  }
}
