import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Tab - Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import FeatureTab from "./tabs/FeatureTab.js"
import UserTab from "./tabs/UserTab.js"
import MqttTab from "./tabs/MqttTab.js"

import TOAST from '../../components/Toast.js'

export default class SettingsTab extends Component  {
  constructor(props) {
    super(props);

    this.data = this.props.data;

    this.tab_navigation = {
      options: null,
      static_tabs: {
        feature: null,
        user: null,
        save: null,
      },
      dynamic_tabs: {
        mqtt: null,
      }
    }

    var {feature, user, mqtt} = this.data
    this.state = {
      values: {
        feature: feature.get_data(),
        user: user.get_data(),
        mqtt: mqtt.get_data(),
      },
    }
  }

  get_style(color) {
    return {
        color: color,
        textAlign: "center",
    }
  }

  set_data_from_tab(category, elem, value) {
    let values              = this.state.values
    values[category][elem]  = value

    this.setState({
      values: values
    });
  }

  async save_data() {
    TOAST.notification("Daten werden gespeichert...", 200);
    var {feature, user, mqtt} = this.data;

    let is_valid = this.is_data_valid()

    // features
    var feature_values = this.state.values.feature;
    await feature.set_data( feature_values.is_smart_home_control_active,
                            feature_values.is_nas_control_active);

    // user
    if(is_valid.user) {
      var user_values = this.state.values.user;
      await user.set_data( user_values.first_name,
                            user_values.surname);
    }

    // mqtt
    if(is_valid.mqtt) {
      var new_mqtt_values = this.state.values.mqtt;
      var old_mqtt_values = mqtt.get_data();

      if(new_mqtt_values.ipaddress != old_mqtt_values.ipaddress || new_mqtt_values.port != old_mqtt_values.port) {
        await mqtt.set_data( new_mqtt_values.ipaddress,
                              new_mqtt_values.port);

        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "FetchDataScreen", params: {} }],
        });
      }
    }

    this.setState({});
    this.props.update_root();
    TOAST.notification("Daten wurden gespeichert!", 200);
  }

  is_data_valid() {
    var { user, mqtt } = this.state.values

    var is_valid = {
      user: true,
      mqtt: true,
    }

    // user
    if((user.first_name == null)
      || (user.surname == null)) {
        is_valid.user = false
    }

    // mqtt
    if((mqtt.port == null || mqtt.port.length < 1 || mqtt.port.length > 4)
      || (mqtt.ipaddress == null || mqtt.ipaddress.length < 7 || mqtt.ipaddress.length > 15)) {
        is_valid.mqtt = false
    }

    return is_valid;
  }

  set_tab_navigation() {
    this.tab_navigation.options = {
      showLabel: true,
      labelStyle: { fontSize: 12 },
      indicatorStyle: {backgroundColor: "black"},
    }

    this.tab_navigation.static_tabs.feature = (
      <Tab.Screen
        name="FeatureTab"
        children={({navigation}) =>
          <FeatureTab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.feature}
            onValueChange={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: (props) => (<Text style={this.get_style(props.color)}>Features</Text>)
        }}
      />
    );

    this.tab_navigation.static_tabs.user = (
      <Tab.Screen
        name="UserTab"
        children={({navigation}) =>
          <UserTab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.user}
            onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: (props) => (<Text style={this.get_style(props.color)}>Benutzer</Text>)
        }}
      />
    );

    this.tab_navigation.dynamic_tabs.mqtt = (
      <Tab.Screen
        name="MqttTab"
        children={({navigation}) =>
          <MqttTab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.mqtt}
            onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: (props) => (<Text style={this.get_style(props.color)}>MQTT Brocker</Text>)
        }}
      />
    );

    this.tab_navigation.static_tabs.save = (
      <Tab.Screen
        name="Save_tab"
        children={({navigation}) => (null)}
        options={{
          tabBarLabel: (props) => (<Ionicons style={this.get_style("black")} name="save" size={25}/>)
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            this.save_data()
          }
        }}
      />

    );
  }

  render() {
    var { feature } = this.state.values;

    if(this.props.navigation_tab.isFocused()) {
      this.set_tab_navigation()
    }

    return (
      <Tab.Navigator initialRouteName="FeatureTab" tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.feature}
        {this.tab_navigation.static_tabs.user}
        {feature.is_smart_home_control_active ? this.tab_navigation.dynamic_tabs.mqtt : null}
        {this.tab_navigation.static_tabs.save}
      </Tab.Navigator>
    );
  }
};
