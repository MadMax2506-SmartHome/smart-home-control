import React, {Component} from 'react';
import { StyleSheet, View, Button, Text, ToastAndroid } from 'react-native';

import SplashScreen from 'react-native-splash-screen'

import STYLE from '../../data/config/style.js'

export default class HomeScreen extends Component  {
  constructor(props) {
    super(props);
    SplashScreen.show();

    this.state = {
      showScreenTime: 1500,
    }
  }
  render() {
    return (
      <View style={STYLE.SCREEN.main}>
        <View style={STYLE.SCREEN.centerPanel}>
          <View style={STYLE.SCREEN.panel}>
            <Text>Wilkommen in ihrem Smart-Home</Text>
          </View>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Smart Home Steuerung"
              color="#000000"
              onPress={() => this.props.navigation.navigate("SmartHomeControlConnect")}
            />
          </View>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="NAS Steuerung"
              color="#000000"
              onPress={() => this.props.navigation.navigate("NasControlConnect")}
            />
          </View>
        </View>
      </View>
    );
  }

  async UNSAFE_componentWillMount() {
    await new Promise((resolve) => setTimeout(() => { resolve('result') }, this.state.showScreenTime));
    SplashScreen.hide();
  }
};
