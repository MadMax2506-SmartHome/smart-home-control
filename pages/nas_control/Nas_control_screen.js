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

  get_status() {}

  wake_on_lan() {}

  shutdown() {}

  render() {
    return (
      <ScrollView style={STYLE.SCREEN.main}>
        <View style={STYLE.SCREEN.centerPanel}>
          <View>
            <Text>
              Demnächst verfügbar
            </Text>
          </View>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Exit"
              onPress={() => {this.props.navigation.navigate("Home_control_screen");}}
              color="#000000"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};
