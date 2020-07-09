import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native';

import Light from "./light_control.js"

import STYLE from '../../../../data/config/style.js'

export default class Bed_side_screen extends Component {
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
