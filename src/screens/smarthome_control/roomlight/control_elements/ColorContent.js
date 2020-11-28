import React, {Component} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { StyleText } from '../../../../res/style/style.js'
import { StyleInput, StyleGroup } from '../../../../res/style/input.js'

import RgbColorSlider from '../../../../components/slider/RgbColorSlider.js';

export default class ColorContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color_array: this.props.colors,
      color_rgb: this.set_rgb(this.props.colors),
      color_is_change: false,
    }
  }

  set_rgb(color_array) {
    const red   = color_array.red > 0 ? color_array.red.toString(16) : "00";
    const green = color_array.green > 0 ? color_array.green.toString(16) : "00";
    const blue  = color_array.blue > 0 ? color_array.blue.toString(16) : "00";
    return ("#" + red + green + blue).toUpperCase();
  }

  change_color(elem, value) {
    let color = this.state.color_array;
    color[elem] = value;
    this.setState({
      color_array: color,
      color_rgb: this.set_rgb(color),
      color_is_change: true,
    });
  }

  render() {
    return (
      <View>
        <View style={StyleGroup.header}>
          <Text style={StyleText()}>
            Streifenfarbe
          </Text>
        </View>
        <View style={StyleGroup.main}>
          <View style={{backgroundColor: this.state.color_rgb}}>
            <Text style={StyleInput.color_elem}>
              {this.state.color_rgb}
              </Text>
          </View>

          <View style={StyleInput.elem}>
            <RgbColorSlider
              for="red"
              value={this.state.color_array.red}
              sliderColor="red"
              onChange={(sliderColor, value) => this.change_color(sliderColor, value)}
              onComplete={() => this.save_color()}
            />
          </View>
          <View style={StyleInput.elem}>
            <RgbColorSlider
              for="green"
              value={this.state.color_array.green}
              sliderColor="green"
              onChange={(sliderColor, value) => this.change_color(sliderColor, value)}
              onComplete={() => this.save_color()}
            />
          </View>
          <View style={StyleInput.elem}>
            <RgbColorSlider
              for="blue"
              value={this.state.color_array.blue}
              sliderColor="blue" onChange={(sliderColor, value) => this.change_color(sliderColor, value)}
              onComplete={() => this.save_color()}
            />
          </View>
        </View>
      </View>
    );
  }

  save_color() {
    if(this.state.color_is_change) {
      this.setState({color_is_change: false})
      this.props.onChange(this.state.color_array)
    }
  }
}
