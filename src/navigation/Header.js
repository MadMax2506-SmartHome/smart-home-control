import React, { Component } from "react"
import { TouchableOpacity, Text, View, Button } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Color, Font, StyleHeader, StyleButtonWrapper } from '../res/style/style.js';

export default class HeaderBack extends Component {
  constructor(props) {
    super(props);
  }

  getEmptyElement() {
    return (<></>);
  }

  getBackButtonElement() {
    if(this.props.back != undefined){
      return (
        <View style={[StyleButtonWrapper("100%")]}>
          <TouchableOpacity
            style={StyleHeader.leftButton}
            onPress={() => this.props.back()}
          >
            <FontAwesome
              name="arrow-left"
              size={Font.size.normal_icon}
              color={Color.black}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <></>
      );
    }
  }

  getTitleElement(title) {
    return (
      <Text style={StyleHeader.title}>
        {title}
      </Text>
    );
  }

  render() {
    var name = this.props.screenName;
    var title, leftButton, rightButton;

    switch (name) {
      case "HomeScreen":
        title       = this.getTitleElement("Smart Home");
        leftButton  = this.getEmptyElement();
        rightButton = this.getEmptyElement();
        break;
      case "SmartHomeScreen":
        title       = this.getTitleElement("Smart Home");
        leftButton  = this.getBackButtonElement();
        rightButton = this.getEmptyElement();
        break;
      case "NasScreen":
        title       = this.getTitleElement("Smart Home");
        leftButton  = this.getBackButtonElement();
        rightButton = this.getEmptyElement();
        break;
      default:
        title       = this.getTitleElement(name);
        leftButton  = this.getEmptyElement();
        rightButton = this.getEmptyElement();
    }

    return (
      <View style={StyleHeader.container}>
        <View style={StyleHeader.left}>
          {leftButton}
        </View>
        <View style={StyleHeader.body}>
          {title}
        </View>
        <View style={StyleHeader.right}>
          {rightButton}
        </View>
      </View>
    );
  }
}
