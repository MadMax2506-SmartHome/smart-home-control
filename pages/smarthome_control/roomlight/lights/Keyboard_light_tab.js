import React, { Component } from 'react'
import { View } from 'react-native';

import Light_control from "./Light_control.js"

export default class Keyboard_light_tab extends Component {
  constructor(props) {
    super(props);

		this.value 				= this.props.value;
    this.contentData  = this.props.contentData;

		this.data	= this.props.data;
		this.mqtt = this.props.mqtt;

		this.mqtt.topic.light_status = this.mqtt.topic.global_status + this.contentData.lights.topics[this.value];
		this.mqtt.topic.light_conf   = this.mqtt.topic.global_conf + this.contentData.lights.topics[this.value];
  }

  render() {
    return(
      <View>
        <Light_control data={this.data} mqtt={this.mqtt} contentData={this.contentData} />
      </View>
    );
  }
}
