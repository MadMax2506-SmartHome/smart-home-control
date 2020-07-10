import React, {Component} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

// Allgemein
import Color_slider from '../../../../madmax_modules/slider/Rgb_color_slider.js';

export default class Color_content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorArr: this.props.colors,
      colorRGB: this.setRGB(this.props.colors),
      colorIsChange: false,
    }
  }

  setRGB(colorArr) {
    const red   = colorArr.red > 0 ? colorArr.red.toString(16) : "00";
    const green = colorArr.green > 0 ? colorArr.green.toString(16) : "00";
    const blue  = colorArr.blue > 0 ? colorArr.blue.toString(16) : "00";
    return ("#" + red + green + blue).toUpperCase();
  }

  changeColor(elem, value) {
    let color = this.state.colorArr;
    color[elem] = value;
    this.setState({
      colorArr: color,
      colorRGB: this.setRGB(color),
      colorIsChange: true,
    });
  }

  render() {
    return (
      <View>
        <View style={style.header}>
          <Text>Streifenfarbe</Text>
        </View>
        <View style={style.main}>
          <View style={{backgroundColor: this.state.colorRGB}}>
            <Text style={style.colorView}>{this.state.colorRGB}</Text>
          </View>

          <View style={style.elem}>
            <Color_slider for="red" value={this.state.colorArr.red} sliderColor="red" onChange={(sliderColor, value) => this.changeColor(sliderColor, value)}/>
          </View>
          <View style={style.elem}>
            <Color_slider for="green" value={this.state.colorArr.green} sliderColor="green" onChange={(sliderColor, value) => this.changeColor(sliderColor, value)}/>
          </View>
          <View style={style.elem}>
            <Color_slider for="blue" value={this.state.colorArr.blue} sliderColor="blue" onChange={(sliderColor, value) => this.changeColor(sliderColor, value)}/>
          </View>

          <View style={style.controlPanel}>
            <View style={style.saveBtn}>
              <Button
                title = "Übernehmen"
                color = "black"
                onPress={() => {
                  if(this.state.colorIsChange) {
                    this.setState({colorIsChange: false})
                    this.props.onChange(this.state.colorArr)
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  header: {
    width: "100%",
    height: 40,
  },
  main: {
    width: "100%",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  elem: {
    marginTop: 15,
  },
  colorView: {
    margin: 5,
    textAlign: 'center'
  },
  controlPanel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {
    width: 110,
    marginTop: 20,
  },
})
