import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native';

import Light from "./Light.js"

import STYLE from '../../../data/config/style.js'

export default class BedScreen extends Component {
	constructor(props) {
    super(props);

		const { params }  = this.props.route;

		this.value 				= params.value;
    this.contentData  = params.contentData;

		this.data	= params.data[this.value];
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
