import React, {Component} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Slider from '@react-native-community/slider';

export default class RgbColorSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startValue: this.props.value == undefined ? 0 : this.props.value,
      currentValue: this.props.value == undefined ? 0 : this.props.value,
    }
  }

  render() {
    return(
      <View style={style.content}>
        <View style={style.sliderContent}>
          <Slider
            value={this.state.startValue}
            minimumValue={0}
            maximumValue={255}
            thumbTintColor={this.props.sliderColor}
            minimumTrackTintColor={this.props.sliderColor}
            maximumTrackTintColor="#000000"
            onSlidingComplete={() => {
              if(this.props.onComplete != undefined) {
                this.props.onComplete();
              }
            }}
            onValueChange={(value) => {
              this.setState({currentValue: Math.round(value)});
              if(this.props.onChange != undefined) {
                this.props.onChange(this.props.for, Math.round(value))
              }
            }}
          />
        </View>
        <View style={style.sliderValueContent}>
          <Text style={style.sliderValue}>
            {this.state.currentValue}
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
    width: "85%",
  },
  sliderValue: {
    textAlign: 'right',
  },
  sliderValueContent: {
    textAlign: 'right',
    width: "10%",
  },
});
