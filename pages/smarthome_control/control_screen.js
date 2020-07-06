import React, {Component} from 'react';
import { ScrollView, View, Text, Button } from 'react-native';

import STYLE from '../../data/config/style.js'

export default class MenuScreen extends Component  {
  constructor(props) {
    super(props);

    const { params } = this.props.route;
    if(params.mqtt == undefined) {
      this.props.navigation.navigate("Home");
    }
    this.mqtt     = params.mqtt;
    this.speaker  = params.speaker;
    this.name     = params.name;

    this.speaker.readText("Herzlich Willkommen " + this.name.split(" ")[0]);
  }

  render() {
    return (
      <ScrollView style={STYLE.SCREEN.main}>
        <View style={STYLE.SCREEN.centerPanel}>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Beleuchtung"
              onPress={() => this.props.navigation.navigate('Roomlight', {mqtt: this.mqtt})}
              color="#000000"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};
