import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native';

import Status from './control_elements/Status.js';
import ColorContent from './control_elements/ColorContent.js';
import Orientation from './control_elements/Orientation.js'
import AnimationType from './control_elements/AnimationType.js';
import AnimationTime from './control_elements/AnimationTime.js';

import STYLE from '../../../res/style.js'

export default class LightControl extends Component {
  constructor(props) {
    super(props);

    this.light = this.props.light;

    this.state = {
      status: this.light.get_status(),
      color: this.light.get_color(),
      orientation: {
        labels: ["nach Links", "nach Rechts", "von der Mitte"],
        values: ["l", "r", "c"],
        selected: this.light.get_orientation(),
      },
      animationTyp: {
        labels: ["Fade", "Rainbow", "to Color"],
        values: ["fade", "rainbow", "to_color"],
        selected: "",
      },
      animationTime: this.light.get_time(),
    }
  }

  set_strip_status(status) {
    this.light.set_status(status);
    this.setState({
      status: status,
    });
  }

  set_color(color) {
    this.light.set_color(color);
    this.setState({
      color: color,
    });
  }

  set_orientation(orientation_value) {
    this.light.set_orientation(orientation_value);

    var {orientation} = this.state;
    orientation.selected = orientation_value;
    this.setState({
      orientation: orientation,
    });
  }

  set_animation_type(type_value) {
    this.light.set_type(type_value);

    var {animationTyp} = this.state;
    animationTyp.selected = type_value;
    this.setState({
      animationTyp: animationTyp,
    });
  }

  set_animation_time(time) {
    this.light.set_time(time);
    this.setState({
      animationTime: time,
    });
  }

  render() {
    return(
      <ScrollView style={STYLE.SCREEN.main}>
        <View>
          <Status
            status={this.state.status}
            onChange={(status) => this.set_strip_status(status)}
          />
        </View>

        <View style={style.control_elem}>
          <ColorContent
            colors={this.state.color}
            onChange={(color) => this.set_color(color)}
          />
        </View>

        <View style={style.control_elem}>
          <Orientation
            labels={this.state.orientation.labels}
            values={this.state.orientation.values}
            selectedValue={this.state.orientation.selected}
            onChange={(orientation) => this.set_orientation(orientation)}
          />
        </View>

        <View style={style.control_elem}>
          <AnimationType
            labels={this.state.animationTyp.labels}
            values={this.state.animationTyp.values}
            selectedValue={this.state.animationTyp}
            onChange={(type) => this.set_animation_type(type)}
          />
        </View>

        <View style={style.control_elem}>
          <AnimationTime
            time={this.state.animationTime}
            onChange={(time) => this.set_animation_time(time)}
          />
        </View>

        <View style={style.controlPanel}>
          <View style={style.btn}>
            <Button
              color="black"
              title="Animation neustarten"
              onPress={() => this.light.restart_animation()}
            />
          </View>
          <View style={style.btn}>
            <Button
              color="black"
              title="Konfiguration zurücksetzen"
              onPress={() => this.light.reload_conf()}
            />
          </View>
          <View style={style.btn}>
            <Button
              color="black"
              title="Konfiguration übernehmen"
              onPress={() => this.light.save_conf()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  control_elem: {
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
