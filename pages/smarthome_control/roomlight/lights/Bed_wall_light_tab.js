import React, { Component } from 'react'
import { View } from 'react-native';

import Light_control from "./Light_control.js"

export default class Bed_wall_light_tab extends Component {
	constructor(props) {
    super(props);

    this.mqtt   = this.props.mqtt;
    this.data   = this.props.data;
  }

  render() {
		return(
      <View>
        <Light_control data={this.data} mqtt={this.mqtt} contentData={this.contentData} />
      </View>
    );
  }
}
