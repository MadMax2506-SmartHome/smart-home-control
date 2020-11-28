import React, {Component} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { StyleText } from '../../../../res/style/style.js'
import { StyleInput, StyleGroup, StyleGroupElem } from '../../../../res/style/input.js'

import ValueSlider from '../../../../components/slider/ValueSlider.js';

export default class AnimationTime extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
    }
  }

  render() {
    return (
      <View>
        <View style={StyleGroup.header}>
          <Text style={StyleText()}>
            Animationszeit (in ms)
          </Text>
        </View>
        <View style={StyleGroup.main}>
          <View style={StyleGroupElem.input_slider}>
            <ValueSlider
              value={this.state.time}
              sliderColor="black"
              onComplete={() => this.props.onChange(this.state.time)}
              onChange={(time) => this.setState({time: time})}
            />
          </View>
        </View>
      </View>
    );
  }
};
