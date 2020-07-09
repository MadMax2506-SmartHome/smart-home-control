import React, { Component } from 'react'
import { View } from 'react-native';

import Light from "./light_control.js"

export default class KeyboardScreen extends Light {
  constructor(props) {
    super(props);

		this.value 				= this.props.value;
    this.contentData  = this.props.contentData;

		this.data	= this.props.data;
		this.mqtt = this.props.mqtt;

		this.mqtt.topic.lightStatus = this.mqtt.topic.globalStatus + this.contentData.lights.topics[this.value];
		this.mqtt.topic.lightConf = this.mqtt.topic.globalConf + this.contentData.lights.topics[this.value];
  }

  render() {
    console.log("-------------");
    console.log(this.mqtt);
    console.log("-------------");
    return(
      <View>
        <Light data={this.data} mqtt={this.mqtt} contentData={this.contentData} />
      </View>
    );
  }
}
