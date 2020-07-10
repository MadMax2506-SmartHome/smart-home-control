import React, {Component} from 'react';
import { View, ToastAndroid } from 'react-native';

import LoadData from "../../madmax_modules/loadData/LoadData.js"

// Global
import MQTT_AVAILABLE from './mqtt/Mqtt_available.js'
import MQTT_DATA from './mqtt/Mqtt_data.js'
import STYLE from '../../data/config/style.js'

export default class Smart_home_connect_tab extends Component  {
  constructor(props) {
    super(props);

		this.db = this.props.db;

    this.mqtt     = {
      uri: null,
      connection: {
        available: null,
        data: null
      },
      topic: {
        devices: "devices",
        globalConf: "",
        globalStatus: "",
      },
      qos: 0,
      retained: false,
    };
    this.devices  = {
      count_devices: 0,
      current_device_name_index: 0,
      device_names: ["roomlight"],
      roomlight: []
    };
    this.data     = {
      roomlight: {
        static: {
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
        },
        dynamic: {
          "keyboard": [],
          "bedWall": [],
          "bedSide": [],
        },
      }
    }

    this.state = {
      available: {
        is_loading: true,
        is_true: false,
      },
      data: {
        is_loading: false,
        is_loaded: false,
      }
    }
  }

  abort_loading() {
    this.state.available.is_loading   = true
    this.state.available.is_true = false

    if(this.mqtt.connection.available != null) {
      this.mqtt.connection.available.disconnect()
      this.mqtt.connection.available = delete this.mqtt.connection.available
    }

    if(this.mqtt.connection.data != null) {
      this.mqtt.connection.data.disconnect()
      this.mqtt.connection.data = delete this.mqtt.connection.data
    }

    this.props.navigation_tab.jumpTo("Home_tab")
  }

  init_global_brocker_connection() {
    let uri = this.db.get_mqtt_uri()
    if(uri != this.mqtt.uri) {
      this.mqtt.uri = uri

      if(this.mqtt.connection.available != null) {
        this.mqtt.connection.available.disconnect()
      }
      this.mqtt.connection.available = new MQTT_AVAILABLE(this, this.mqtt.uri);

      this.state.available.is_loading   = true
      this.state.available.is_true = false
    }
  }

  // called by mqtt listener
  set_mqtt_brocker_to_available() {
    if(this.props.navigation_tab.isFocused()) {
      let {available} = this.state
      available.is_loading  = false
      available.is_true     = true

      this.setState({
        available: available
      })
    } else {
      this.state.available.is_loading   = true
      this.state.available.is_true = false

      this.mqtt.connection.available.disconnect()
      this.mqtt.connection.available = delete this.mqtt.connection.available
    }
  }

  are_all_devices_set() {
    if(this.devices.count_devices == this.devices.device_names.length) {
      return true
    }
    return false
  }

  check_device_info() {
    if(!this.are_all_devices_set()
      && !this.state.data.is_loaded) {
      this.mqtt.connection.data = new MQTT_DATA(this, this.mqtt.uri, this.mqtt.qos);

      this.mqtt.connection.data.delete_device_listener();
      this.mqtt.connection.data.set_device_listener(this.mqtt.topic.devices);

      this.mqtt.connection.data.publish(this.mqtt.topic.devices, "list-devices", this.mqtt.retained);
    } else if(this.state.data.is_loaded) {
      this.check_config_info();
    }
  }

  check_config_info() {
    if(!this.state.data.is_loaded
      && this.state.data.is_loading) {
      let device = this.devices[this.devices.device_names[this.devices.current_device_name_index]]

      this.mqtt.topic.globalConf   = device.topic.conf;
      this.mqtt.topic.globalStatus = device.topic.status;

      this.mqtt.connection.data.delete_global_status_listener();
      this.mqtt.connection.data.set_global_status_listener(this.mqtt.topic.globalStatus);

      this.mqtt.connection.data.publish(this.mqtt.topic.globalConf, "get-conf", this.mqtt.retained);
    }
  }

  // called by mqtt listener
  set_device_info(device, device_info) {
    this.devices[device] = device_info;
    this.devices.count_devices++;

    if(this.are_all_devices_set()) {
      this.state.data.is_loading = true;
      this.check_config_info();
    }
  }

  // called by mqtt listener
  set_config_info(config_data) {
    if(config_data == "end") {
      if(this.devices.current_device_name_index < (this.devices.count_devices - 1)) {
        this.devices.current_device_name_index++
        this.check_config_info()
      } else {
        let { data } = this.state
        data.is_loading = false
        data.is_loaded = true

        this.setState({
          data: data
        });
      }
    } else {
      let device_name = this.devices.device_names[this.devices.current_device_name_index]
      if(device_name == "roomlight") {
        var place = "";
        for(var i = 0; i < this.data.roomlight.static.lights.values.length; i++) {
          if(config_data[this.data.roomlight.static.lights.indices[i]] != undefined) {
            place = i;
            break;
          }
        }
        this.data.roomlight.dynamic[this.data.roomlight.static.lights.values[place]] = config_data[this.data.roomlight.static.lights.indices[place]];
      }
    }
  }

  render() {
    if(this.props.navigation_tab.isFocused()) {
      if(this.state.available.is_loading) {
        this.init_global_brocker_connection()
      } else if(this.state.available.is_true) {
        if(this.state.data.is_loaded) {
          this.props.navigation.navigate("Smart_home_control_screen", {mqtt: this.mqtt, devices: this.devices, data: this.data})
        } else {
          this.check_device_info();
        }
      }
    }

    return (
      <View style={STYLE.SCREEN.main}>
        <LoadData text="Verbindung zum Server wird aufgebaut" abort={() => this.abort_loading()}/>
      </View>
    );
  }
};
