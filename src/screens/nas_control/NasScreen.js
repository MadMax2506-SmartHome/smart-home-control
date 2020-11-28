import React, {Component} from 'react';
import { ScrollView, View, Text, Button } from 'react-native';

import { StyleMain } from '../../res/style/style.js'

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
      <ScrollView style={StyleMain.containerCenter}>
        <View style={StyleMain.containerCenter}>
          <View>
            <Text>
              Demnächst verfügbar
            </Text>
          </View>
          <View style={StyleMain.StyleButtonWrapper}>
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
