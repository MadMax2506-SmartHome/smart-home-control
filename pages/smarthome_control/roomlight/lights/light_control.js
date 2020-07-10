import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native';

import Status from '../control_elements/Status.js';
import ColorContent from '../control_elements/Color_content.js';
import Orientation from '../control_elements/Orientation.js'
import AnimationType from '../control_elements/Animation_type.js';
import AnimationTime from '../control_elements/Animation_time.js';

import STYLE from '../../../../data/config/style.js'

export default class Light extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.data;
    this.mqtt = this.props.mqtt;
  }

  set_data(controlElem, value, msg) {
    this.data.dynamic[controlElem] = value;
    this.mqtt.connection.publish(this.mqtt.topic.lightConf, msg, this.mqtt.retained);
  }

  set_strip_status(status) {
    let msg = status ? "active" : "idle";
    this.set_data("status", status, msg);
  }

  set_color(color) {
    let msg = "color: " + color.red + ";" + color.green + ";" + color.blue;
    this.set_data("color", color, msg);
  }

  set_orientation(orientation) {
    let msg = "orientation: " + orientation;
    this.set_data("orientation", orientation, msg);
  }

  set_animation_type(type) {
    let msg = "animation-typ: " + type;
    this.set_data("type", type, msg);
  }

  set_animation_time(time) {
    let msg = "animation-time: " + time;
    this.set_data("time", time, msg);
  }

  render() {
    return(
      <ScrollView style={STYLE.SCREEN.main}>
        <View>
          <Status status={this.data.dynamic.status} onChange={(status) => this.set_strip_status(status)}/>
        </View>

        <View style={style.controlElem}>
          <ColorContent colors={this.data.dynamic.color} onChange={(color) => this.set_color(color)}/>
        </View>

        <View style={style.controlElem}>
          <Orientation labels={this.data.static.orientation.labels} values={this.data.static.orientation.values} selectedValue={this.data.dynamic.orientation} onChange={(orientation) => this.set_orientation(orientation)}/>
        </View>

        <View style={style.controlElem}>
          <AnimationType labels={this.data.static.animationTyp.labels} values={this.data.static.animationTyp.values} selectedValue={this.data.dynamic.type} onChange={(type) => this.set_animation_type(type)}/>
        </View>

        <View style={style.controlElem}>
          <AnimationTime time={this.data.dynamic.time} onChange={(time) => this.set_animation_time(time)}/>
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
