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
import NasTab from "./tabs/NasTab.js"

// Allgemein
import STYLE from '../../res/style.js'
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
        nas: null,
      }
    }

    var {feature, user, mqtt, nas} = this.data
    this.state = {
      values: {
        feature: feature.get_data(),
        user: user.get_data(),
        mqtt: mqtt.get_data(),
        nas: nas.get_data(),
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
    var {feature, user, mqtt, nas} = this.data;

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

    // nas
    if(is_valid.nas) {
      var nas_values = this.state.values.nas;
      await nas.set_data( nas_values.ipaddress,
                          nas_values.macaddress,
                          nas_values.username,
                          nas_values.password);
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
    var { user, mqtt, nas } = this.state.values

    var is_valid = {
      user: true,
      mqtt: true,
      nas: true
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

    // nas
    if((nas.ipaddress == null || nas.ipaddress.length < 7 || nas.ipaddress.length > 15)
      || (nas.macaddress == null || nas.macaddress.length != 12)
      || (nas.username == null)
      || (nas.password == null)) {
        is_valid.nas = false
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
            style={style_tab_input}
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
            style={style_tab_input}
            onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: (props) => (<Text style={this.get_style(props.color)}>MQTT Brocker</Text>)
        }}
      />
    );

    this.tab_navigation.dynamic_tabs.nas = (
      <Tab.Screen
        name="NasTab"
        children={({navigation}) =>
          <NasTab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.nas}
            style={style_tab_input}
            onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: (props) => (<Text style={this.get_style(props.color)}>NAS</Text>)
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
        {feature.is_nas_control_active ? this.tab_navigation.dynamic_tabs.nas : null}
        {this.tab_navigation.static_tabs.save}
      </Tab.Navigator>
    );
  }
};

const style_tab_input = StyleSheet.create({
  inputPanel: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    justifyContent: 'center',
    width: "30%",
    marginLeft: "10%",
  },
  inputContent: {
    justifyContent: 'center',
    width: "50%",
    marginRight: "10%",
    padding: 5,
  },
  input: {
    height: 25,
    padding: 0,
    paddingLeft: 5,

    borderColor: '#000000',
    borderBottomWidth: 1,
  },
});