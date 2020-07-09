import React, {Component} from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';

// Menu
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

// Tab
import Keyboard_light_tab from "./lights/keyboard_tab.js"
import Bed_wall_light_tab from "./lights/bed_wall_tab.js"
import Bed_side_light_tab from "./lights/bed_side_tab.js"

import LoadData from "../../../madmax_modules/loadData/LoadData.js"

// Global
import STYLE from '../../../data/config/style.js'
import MQTT from './mqtt/mqtt_roomlight.js'

export default class RoomlightTab extends Component {
  constructor(props) {
    super(props);

    this.contentData  = {
      lights: {
        values: ["keyboard", "bedWall", "bedSide"],
        indices: ["keyboard", "bed-wall", "bed-side"],
        topics: {
          keyboard: "/keyboard",
          bedWall: "/bed/wall",
          bedSide: "/bed/side",
        },
      },
      animationTyp: {
        labels: ["Fade", "Rainbow", "to Color"],
        values: ["fade", "rainbow", "toColor"],
      },
      orientation: {
        labels: ["nach Links", "nach Rechts", "von der Mitte"],
        values: ["l", "r", "c"],
      }
    };

    this.device = [];
    this.data   = {
      "keyboard": [],
      "bedWall": [],
      "bedSide": [],
    };
    this.mqtt   = {
      connection: null,
      uri: this.props.mqtt.uri,
      topic: {
        devices: "devices",
        globalConf: "",
        lightConf: "",
        globalStatus: "",
        lightStatus: "",
      },
      qos: this.props.mqtt.qos,
      retained: this.props.mqtt.retained,
    };

    this.state = {
      dataIsLoadedFromMqttBrocker: false,
      isLoadingData: false,
    }
  }

  checkDeviceInfo() {
    if(this.device.length == 0
      && !this.state.dataIsLoadedFromMqttBrocker) {
      this.mqtt.connection = new MQTT(this, this.mqtt.uri, this.mqtt.qos);

      this.mqtt.connection.deleteDeviceListener();
      this.mqtt.connection.setDeviceListener(this.mqtt.topic.devices);

      this.mqtt.connection.publish(this.mqtt.topic.devices, "list-devices", this.mqtt.retained);
    } else if(this.state.dataIsLoadedFromMqttBrocker) {
      this.checkConfigInfo();
    }
  }

  checkConfigInfo() {
    if(!this.state.dataIsLoadedFromMqttBrocker
      && !this.isLoadingData) {
      this.mqtt.topic.globalConf   = this.device.topic.conf;
      this.mqtt.topic.globalStatus = this.device.topic.status;

      this.state.isLoadingData = true;

      this.mqtt.connection.deleteGlobalStatusListener();
      this.mqtt.connection.setGlobalStatusListener(this.mqtt.topic.globalStatus);

      this.mqtt.connection.publish(this.mqtt.topic.globalConf, "get-conf", this.mqtt.retained);
    }
  }

  // called by mqtt
  setDeviceInfo(device) {
    this.device = device;
    this.checkConfigInfo();
  }

  // called by mqtt
  setConfigInfo(data) {
    if(data == "end") {
      this.setState({
        dataIsLoadedFromMqttBrocker: true,
        isLoadingData: false,
      });
    } else {
      var place = "";
      for(var i = 0; i < this.contentData.lights.values.length; i++) {
        if(data[this.contentData.lights.indices[i]] != undefined) {
          place = i;
          break;
        }
      }
      this.data[this.contentData.lights.values[place]] = data[this.contentData.lights.indices[place]];
    }
  }

  render() {
    if(this.state.dataIsLoadedFromMqttBrocker) {
      return (
        <Tab.Navigator
          tabBarOptions={{
            showLabel: true,
            labelStyle: { fontSize: 12 },
            indicatorStyle : {backgroundColor: "black"}
          }}
        >
          <Tab.Screen
            name="Tastatur"
            children={() =>
              <Keyboard_light_tab
                value       = {this.contentData.lights.values[0]}
                contentData = {this.contentData}
                data        = {this.data[this.contentData.lights.values[0]]}
                mqtt        = {this.mqtt}
              />
            }
          />
          <Tab.Screen
            name="Bett-Wand"
            children={() =>
              <Bed_wall_light_tab
                value       = {this.contentData.lights.values[1]}
                contentData = {this.contentData}
                data        = {this.data[this.contentData.lights.values[1]]}
                mqtt        = {this.mqtt}
              />
            }
          />
          <Tab.Screen
            name="Bett-seitlich"
            children={() =>
              <Bed_side_light_tab
                value       = {this.contentData.lights.values[2]}
                contentData = {this.contentData}
                data        = {this.data[this.contentData.lights.values[2]]}
                mqtt        = {this.mqtt}
              />
            }
          />
        </Tab.Navigator>
      );
    } else {
      this.checkDeviceInfo();
      return (
        <View>
          <LoadData text="Daten werden geladen" navigation={this.props.navigation} />
        </View>
      );
    }
  }
};
