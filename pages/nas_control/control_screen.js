import React, {Component} from 'react';
import { ScrollView, View, Text, Button } from 'react-native';

import STYLE from '../../data/config/style.js'

export default class MenuScreen extends Component  {
  constructor(props) {
    super(props);

    this.nas = this.props.nas;
    this.state = {
      is_online: false
    }
    this.getStatus()
  }

  async getStatus() {

  }

  wakeOnLan() {

  }

  render() {
    this.statusText = ""
    if(this.state.is_online) {
      this.statusText = "NAS ist online"
    } else {
      this.statusText = "NAS ist offline"
    }
    return (
      <ScrollView style={STYLE.SCREEN.main}>
        <View style={STYLE.SCREEN.centerPanel}>
          <View>
            <Text>
              {this.statusText}
            </Text>
          </View>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Starten"
              onPress={() => {this.wakeOnLan();}}
              color="#000000"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};
