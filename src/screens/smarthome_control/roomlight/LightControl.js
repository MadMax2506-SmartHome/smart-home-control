import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native';

import Status from './control_elements/Status.js';
import ColorContent from './control_elements/ColorContent.js';
import Orientation from './control_elements/Orientation.js'
import AnimationType from './control_elements/AnimationType.js';
import AnimationTime from './control_elements/AnimationTime.js';

import STYLE from '../../../res/style.js'

export default class LightControl extends Component {
  #light;

  constructor(props) {
    super(props);

    this.#light = this.props.light;

    this.state = {
      status: this.#light.get_status(),
      color: this.#light.get_color(),
      orientation: this.#light.get_orientation(),
      animationTyp: this.#light.get_type(),
      animationTime: this.#light.get_time(),
    }

    this.form_data = {
      orientation: {
        labels: ["nach Links", "nach Rechts", "von der Mitte"],
        values: ["l", "r", "c"],
      },
      animationTyp: {
        labels: ["Fade", "Rainbow", "to Color"],
        values: ["fade", "rainbow", "to_color"],
      },
    }
  }

  get_filtered_data() {
    var {form_data, state} = this;
    var values = Object.assign({}, state)

    var orientation_labels = form_data.orientation.labels.slice(0);
    var orientation_values = form_data.orientation.values.slice(0);
    if(values.animationTyp == "rainbow") {
      orientation_labels.splice(2, 1)
      orientation_values.splice(2, 1)
    }

    var data = {
      status: {
        visible: true,
        value: values.status,
      },
      color: {
        visible: ( values.animationTyp != "rainbow" ),
        value: values.color,
      },
      orientation: {
        visible: true,
        value: values.orientation,
        labels: orientation_labels,
        values: orientation_values,
      },
      animationTyp: {
        visible: true,
        value: values.animationTyp,
        labels: form_data.animationTyp.labels,
        values: form_data.animationTyp.values,
      },
      animationTime: {
        visible: ( values.animationTyp != "to_color" ),
        value: values.animationTime,
      },
    }

    return data
  }

  render() {
    var data = this.get_filtered_data();

    // check the visibility of the elements
    // status
    var status = null;
    if(data.status.visible) {
      status = (
        <View style={style.control_elem}>
          <Status
            status={data.status.value}
            onChange={(status) => this.set_strip_status(status)}
          />
          </View>
      );
    }

    // color
    var color = null;
    if(data.color.visible) {
      color = (
        <View style={style.control_elem}>
          <ColorContent
            colors={data.color.value}
            onChange={(color) => this.set_color(color)}
          />
          </View>
      );
    }

    // orientation
    var orientation = null;
    if(data.orientation.visible) {
      orientation = (
        <View style={style.control_elem}>
          <Orientation
            labels={data.orientation.labels}
            values={data.orientation.values}
            selectedValue={data.orientation.value}
            onChange={(orientation) => this.set_orientation(orientation)}
          />
        </View>
      );
    }

    // animationTyp
    var typ = null;
    if(data.animationTyp.visible) {
      typ = (
        <View style={style.control_elem}>
          <AnimationType
            labels={data.animationTyp.labels}
            values={data.animationTyp.values}
            selectedValue={data.animationTyp.value}
            onChange={(type) => this.set_animation_type(type)}
          />
        </View>
      );
    }

    // animationTime
    var time = null;
    if(data.animationTime.visible) {
      time = (
        <View style={style.control_elem}>
          <AnimationTime
            time={data.animationTime.value}
            onChange={(time) => this.set_animation_time(time)}
          />
        </View>
      );
    }

    return(
      <ScrollView style={STYLE.SCREEN.main}>
        <View>
          {status}
          {color}
          {orientation}
          {typ}
          {time}
        </View>

        <View style={style.controlPanel}>
          <View style={style.btn}>
            <Button
              color="black"
              title="Animation neustarten"
              onPress={() => this.#light.restart_animation()}
            />
          </View>
          <View style={style.btn}>
            <Button
              color="black"
              title="Konfiguration zurücksetzen"
              onPress={() => this.#light.reload_conf()}
            />
          </View>
          <View style={style.btn}>
            <Button
              color="black"
              title="Konfiguration übernehmen"
              onPress={() => this.#light.save_conf()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  set_strip_status(status) {
    this.#light.set_status(status);

    this.setState({
      status: status,
    });
  }

  set_color(color) {
    this.#light.set_color(color);

    this.setState({
      color: color,
    });
  }

  set_orientation(orientation) {
    this.#light.set_orientation(orientation);

    this.setState({
      orientation: orientation,
    });
  }

  set_animation_type(animationTyp) {
    this.#light.set_type(animationTyp);

    this.setState({
      animationTyp: animationTyp,
    });
  }

  set_animation_time(animationTime) {
    this.#light.set_time(animationTime);

    this.setState({
      animationTime: animationTime,
    });
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
