import React, {Component} from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';

import LoadData from "../../../madmax_modules/loadData/LoadData.js"

import STYLE from '../../../data/config/style.js'
import MQTT from './mqtt/mqtt_roomlight.js'

export default class RoomlightScreen extends Component {
  constructor(props) {
    super(props);

    const { params }  = this.props.route;
    const { mqtt }    = params;

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
      uri: mqtt.uri,
      topic: {
        devices: "devices",
        globalConf: "",
        lightConf: "",
        globalStatus: "",
        lightStatus: "",
      },
      qos: mqtt.qos,
      retained: mqtt.retained,
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

  setDeviceInfo(device) {
    this.device = device;
    this.checkConfigInfo();
  }

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
    var content;
    if(this.state.dataIsLoadedFromMqttBrocker) {
      content = (
        <View>
          <View style={STYLE.SCREEN.centerPanel}>
            <View style={STYLE.SCREEN.btn}>
              <Button
                title="Tastaturbeleuchtung"
                onPress={() => {
                  const value = this.contentData.lights.values[0];
                  this.props.navigation.navigate('KeyboardLight', {value: value, contentData: this.contentData, data: this.data[value], mqtt: this.mqtt})
                }}
                color="#000000"
              />
            </View>
          </View>
          <View style={STYLE.SCREEN.centerPanel}>
            <View style={STYLE.SCREEN.btn}>
              <Button
                title="Bettbeleuchtung - Wand"
                onPress={() => {
                  const value = this.contentData.lights.values[1];
                  this.props.navigation.navigate('BedWallLight', {value: value, contentData: this.contentData, data: this.data[value], mqtt: this.mqtt})
                }}
                color="#000000"
              />
            </View>
          </View>
          <View style={STYLE.SCREEN.centerPanel}>
            <View style={STYLE.SCREEN.btn}>
              <Button
                title="Bettbeleuchtung - Seitlich"
                onPress={() => {
                  const value = this.contentData.lights.values[2];
                  this.props.navigation.navigate('BedSideLight', {value: value, contentData: this.contentData, data: this.data[value], mqtt: this.mqtt})
                }}
                color="#000000"
              />
            </View>
          </View>
        </View>
      );
    } else {
      content = (
        <View>
          <LoadData text="Daten werden geladen" navigation={this.props.navigation} />
        </View>);
      this.checkDeviceInfo();
    }

    return (
      <View>
        {content}
      </View>
    );
  }
};
