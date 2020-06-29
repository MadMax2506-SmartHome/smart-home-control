import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native';

import DropDownMenu from '../../madmax_modules/item-picker/ItemPicker.js'

import Status from './Status.js';
import ColorContent from './ColorContent.js';
import Orientation from './Orientation.js'
import AnimationType from './AnimationType.js';
import AnimationTime from './AnimationTime.js';

import STYLE from '../../data/config/style.js'

export default class ControlView extends Component {
  constructor(props) {
    super(props);

    this.data         = this.props.data;
    this.controlView  = {
      lights: {
        values: ["Keyboard", "Bed"],
      },
      animationTyp: {
        labels: ["Fade", "Rainbow", "to Color"],
        values: ["fade", "rainbow", "toColor"],
      },
      orientation: {
        labels: ["nach Links", "nach Rechts", "von der Mitte"],
        values: ["l", "r", "c"],
      }
    }

    this.light  = this.controlView.lights[0].toLowerCase();
    this.mqtt   = this.props.mqtt;
    this.mqtt.topic.lightConf   = this.device.topic.conf + "/" + this.light;
    this.mqtt.topic.lightStatus = this.device.topic.status + "/" + this.light;

    this.state = {
      currentData: null,
    }
  }

  setLight(light) {
    this.light = light.toLowerCase();

    this.mqtt.topic.lightConf   = this.device.topic.conf + "/" + this.light;
    this.mqtt.topic.lightStatus = this.device.topic.status + "/" + this.light;

    this.state.currentData = null;
    this.setState({currentData: this.data[this.light]});
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
      <View>
        <View style={STYLE.SCREEN.header}>
          <DropDownMenu
            values={this.lights}
            onChange={(light) => this.setLight(light)}
          />
        </View>
        <ScrollView style={STYLE.SCREEN.main}>
        <View>
          <View>
            <Status status={this.state.currentData.status} onChange={(status) => this.setStripStatus(status)}/>
          </View>

          <View style={style.controlElem}>
            <ColorContent colors={this.state.currentData.color} onChange={(color) => this.setColor(color)}/>
          </View>

          <View style={style.controlElem}>
            <Orientation labels={this.orientation.labels} values={this.orientation.values} selectedValue={this.state.currentData.orientation} onChange={(orientation) => this.setOrientation(orientation)}/>
          </View>

          <View style={style.controlElem}>
            <AnimationType labels={this.animationTyp.labels} values={this.animationTyp.values} selectedValue={this.state.currentData.type} onChange={(type) => this.setAnimationType(type)}/>
          </View>

          <View style={style.controlElem}>
            <AnimationTime time={this.state.currentData.time} onChange={(time) => this.setAnimationTime(time)}/>
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
        </View>
        </ScrollView>
      </View>
    );
  }
}
