import React, {Component} from 'react';
import { ScrollView, View, Text, Button } from 'react-native';

// Allgemein
import STYLE from '../../data/config/style.js'

export default class Nas_control_tab extends Component  {
  constructor(props) {
    super(props);

    const {params} = this.props.route;
		this.db = params.db;

    this.nas  = this.db.get_nas_data();

    this.state = {
      is_reachable: false
    }
  }

  async get_status() {
    var is_reachable = await true

    if(is_reachable != this.state.is_reachable) {
      this.setState({
        is_reachable: is_reachable
      });
    }
  }

  wake_on_lan() {}

  shutdown() {}

  render() {
    this.get_status()
    let statusText = this.state.is_reachable ? "NAS ist online" : "NAS ist offline"
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
              title="Wake on LAN"
              onPress={() => {this.wake_on_lan();}}
              color="#000000"
            />
          </View>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Shutdown"
              onPress={() => {this.shutdown();}}
              color="#000000"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};
