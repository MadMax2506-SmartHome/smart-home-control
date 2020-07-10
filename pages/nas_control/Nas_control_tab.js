import React, {Component} from 'react';
import { ScrollView, View, Text, Button } from 'react-native';

// Allgemein
import STYLE from '../../data/config/style.js'

export default class Nas_control_tab extends Component  {
  constructor(props) {
    super(props);

    this.nas = this.props.nas;
    this.state = {
      is_online: false
    }
    this.getStatus()
  }

  async getStatus() {}

  wakeOnLan() {}

  render() {
    let statusText = this.state.is_online ? "NAS ist online" : "NAS ist offline"
    return (
      <ScrollView style={STYLE.SCREEN.main}>
        <View style={STYLE.SCREEN.centerPanel}>
          <View>
            <Text>
              {statusText}
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
