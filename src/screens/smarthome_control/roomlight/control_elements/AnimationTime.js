import React, {Component} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

// Allgemein
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
        <View style={style.header}>
          <Text>Animationszeit (in ms):</Text>
        </View>
        <View style={style.main}>
          <View style={style.input}>
            <ValueSlider value={this.state.time} sliderColor="black" onChange={(time) => this.setState({time: time})}/>
          </View>
          <View style={style.controlPanel}>
            <View style={style.saveBtn}>
              <Button
                color="#000000"
                title = "Übernehmen"
                onPress={() => this.props.onChange(this.state.time)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const style = StyleSheet.create({
  header: {
    width: "100%",
  },
  main: {
    width: "100%",
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingTop: "4%"
  },
  controlPanel: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveBtn: {
    width: 120,
    height: 40,
    alignItems: 'center'
  }
});
