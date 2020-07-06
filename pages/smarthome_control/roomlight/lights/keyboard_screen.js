import React, { Component } from 'react'
import { View } from 'react-native';

import Light from "./light_control.js"

export default class KeyboardScreen extends Light {
  constructor(props) {
    super(props);

		const { params }  = this.props.route;

		this.value 				= params.value;
    this.contentData  = params.contentData;

		this.data	= params.data;
		this.mqtt = params.mqtt;

		this.mqtt.topic.lightStatus = this.mqtt.topic.globalStatus + this.contentData.lights.topics[this.value];
		this.mqtt.topic.lightConf = this.mqtt.topic.globalConf + this.contentData.lights.topics[this.value];
  }

  render() {
    return(
      <View>
        <Light data={this.data} mqtt={this.mqtt} contentData={this.contentData} />
      </View>
    );
  }
}
