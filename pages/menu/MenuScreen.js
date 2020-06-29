import React, {Component} from 'react';
import { ScrollView, View, Text, Button } from 'react-native';

import STYLE from '../../data/config/style.js'

export default class MenuScreen extends Component  {
  constructor(props) {
    super(props);

    const { params } = this.props.route;
    this.mqtt = params.mqtt;
  }

  render() {
    return (
      <ScrollView style={STYLE.SCREEN.main}>
        <View style={STYLE.SCREEN.centerPanel}>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Roomlight"
              onPress={() => this.props.navigation.navigate('Roomlight', {mqtt: this.mqtt})}
              color="#000000"
            />
          </View>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Temperatur"
              onPress={() => this.props.navigation.navigate('Temperature')}
              color="#000000"
            />
          </View>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Musik"
              onPress={() => this.props.navigation.navigate('Music')}
              color="#000000"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};
