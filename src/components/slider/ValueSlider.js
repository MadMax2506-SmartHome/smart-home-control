import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Component
import Slider from '@react-native-community/slider';

//I18n
import I18n from '../../i18n/i18n.js';
import DESIGNATIONS from '../../res/Designations.js';

export default class ValueSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minValue: this.props.minValue == undefined ? 0 : this.props.minValue,
      maxValue: this.props.maxValue == undefined ? 255 : this.props.maxValue,
      startValue: this.props.value == undefined ? 0 : this.props.value,
      currentValue: this.props.value == undefined ? 0 : this.props.value,
    }
  }

  render() {
    var value;
    if(this.props.typ == "animationTime") {
      value = DESIGNATIONS.roomlight.animationTime(this.state.currentValue);
    } else {
      value = this.state.currentValue;
    }

    return(
      <View style={style.content}>
        <View style={style.sliderContent}>
          <Slider
            value={this.state.startValue}
            minimumValue={this.state.minValue}
            maximumValue={this.state.maxValue}
            thumbTintColor={this.props.sliderColor}
            minimumTrackTintColor={this.props.sliderColor}
            maximumTrackTintColor="#000000"
            onSlidingComplete={() => {
              if(this.props.onComplete != undefined) {
                this.props.onComplete();
              }
            }}
            onValueChange={(value) =>{
              this.setState({currentValue: Math.round(value)});
              if(this.props.onChange != undefined) {
                this.props.onChange(Math.round(value))
              }
            }}
          />
        </View>
        <View style={style.sliderValueContent}>
          <Text style={style.sliderValue}>
            {value}
          </Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  content: {
    flexDirection: 'row'
  },
  sliderContent: {
    width: "75%",
  },
  sliderValue: {
    textAlign: 'right',
  },
  sliderValueContent: {
    textAlign: 'right',
    width: "20%",
  },
});
