import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';

// Style
import { StyleText } from '../../../../res/style/style.js'
import { StyleInput, StyleGroup, StyleGroupElem } from '../../../../res/style/input.js'

// Component
import ValueSlider from '../../../../components/slider/ValueSlider.js';

//I18n
import I18n from '../../../../i18n/i18n.js';

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
            {I18n.t("smart_home.light.control.animationTime")}
          </Text>
        </View>

        <View style={StyleGroup.main}>
          <View style={StyleGroupElem.input_slider}>
            <ValueSlider
              value={this.state.time}
              sliderColor="black"
              typ="animationTime"
              onComplete={() => this.props.onChange(this.state.time)}
              onChange={(time) => this.setState({time: time})}
            />
          </View>
        </View>
      </View>
    );
  }
};
