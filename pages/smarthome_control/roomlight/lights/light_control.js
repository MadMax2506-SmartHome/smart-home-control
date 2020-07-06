import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native';

import Status from './control_elements/status.js';
import ColorContent from './control_elements/color_content.js';
import Orientation from './control_elements/orientation.js'
import AnimationType from './control_elements/animation_type.js';
import AnimationTime from './control_elements/animation_time.js';

import STYLE from '../../../../data/config/style.js'

export default class Light extends Component {
  constructor(props) {
    super(props);

    this.data         = this.props.data;
    this.mqtt         = this.props.mqtt;
    this.contentData  = this.props.contentData;
  }

  setData(controlElem, value, msg) {
    this.data[controlElem] = value;
    this.mqtt.connection.publish(this.mqtt.topic.lightConf, msg, this.mqtt.retained);
  }

  setStripStatus(status) {
    let msg = status ? "active" : "idle";
    this.setData("status", status, msg);
  }

  setColor(color) {
    let msg = "color: " + color.red + ";" + color.green + ";" + color.blue;
    this.setData("color", color, msg);
  }

  setOrientation(orientation) {
    let msg = "orientation: " + orientation;
    this.setData("orientation", orientation, msg);
  }

  setAnimationType(type) {
    let msg = "animation-typ: " + type;
    this.setData("type", type, msg);
  }

  setAnimationTime(time) {
    let msg = "animation-time: " + time;
    this.setData("time", time, msg);
  }

  render() {
    return(
      <ScrollView style={STYLE.SCREEN.main}>
        <View>
          <Status status={this.data.status} onChange={(status) => this.setStripStatus(status)}/>
        </View>

        <View style={style.controlElem}>
          <ColorContent colors={this.data.color} onChange={(color) => this.setColor(color)}/>
        </View>

        <View style={style.controlElem}>
          <Orientation labels={this.contentData.orientation.labels} values={this.contentData.orientation.values} selectedValue={this.data.orientation} onChange={(orientation) => this.setOrientation(orientation)}/>
        </View>

        <View style={style.controlElem}>
          <AnimationType labels={this.contentData.animationTyp.labels} values={this.contentData.animationTyp.values} selectedValue={this.data.type} onChange={(type) => this.setAnimationType(type)}/>
        </View>

        <View style={style.controlElem}>
          <AnimationTime time={this.data.time} onChange={(time) => this.setAnimationTime(time)}/>
        </View>

        <View style={style.controlPanel}>
          <View style={style.btn}>
            <Button
              color="black"
              title="Animation neustarten"
              onPress={() => this.mqtt.connection.publish(this.mqtt.topic.lightConf, "restart-animation", this.mqtt.retained)}
            />
          </View>
          <View style={style.btn}>
            <Button
              color="black"
              title="Konfiguration zurücksetzen"
              onPress={() => {
                this.setLight(this.light);
                this.mqtt.connection.publish(this.mqtt.topic.lightConf, "reload-conf", this.mqtt.retained);
              }}
            />
          </View>
          <View style={style.btn}>
            <Button
              color="black"
              title="Konfiguration übernehmen"
              onPress={() => this.mqtt.connection.publish(this.mqtt.topic.lightConf, "save-conf", this.mqtt.retained)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  controlElem: {
    marginTop: 20,
  },
  controlPanel: {
    alignItems: 'center',
    height: 400,
    marginTop: 30
  },
  btn: {
    width: 150,
    marginTop: 10,
  },
});
