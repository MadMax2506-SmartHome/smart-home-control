import React, {Component} from 'react';
import { View, ToastAndroid } from 'react-native';

// MQTT
import MQTT_AVAILABLE from './mqtt/Mqtt_available.js'
import MQTT_DATA from './mqtt/Mqtt_data.js'

// Allgemein
import STYLE from '../../data/config/style.js'
import LoadData from "../../madmax_modules/load_data/Load_data.js"

export default class Smart_home_connect_tab extends Component  {
  constructor(props) {
    super(props);

    const {params} = this.props.route;
		this.db = params.db;

    this.state = {
      available: {
        is_loading: false,
        is_true: false,
      },
      data: {
        is_loading: false,
        is_loaded: false,
      }
    }
    this.reset_data();
  }

  reset_data() {
    this.state.available.is_loading   = true
    this.state.available.is_true      = false

    this.state.data.is_loading        = false
    this.state.data.is_loaded         = false

    this.mqtt = {
      uri: null,
      connection: null,
      topic: {
        devices: "devices",
        conf: "",
        status: "",
      },
      qos: 0,
      retained: false,
    };

    this.devices = {
      count: 0,
      index: 0,
      names: ["roomlight"],
      roomlight: []
    };

    this.data = {
      roomlight: {
        static: {
          lights: {
            values: ["keyboard", "bed_wall", "bed_side"],
            indices: ["keyboard", "bed-wall", "bed-side"],
            topics: {
              keyboard: "/keyboard",
              bed_wall: "/bed/wall",
              bed_side: "/bed/side",
            },
          },
          animationTyp: {
            labels: ["Fade", "Rainbow", "to Color"],
            values: ["fade", "rainbow", "to_color"],
          },
          orientation: {
            labels: ["nach Links", "nach Rechts", "von der Mitte"],
            values: ["l", "r", "c"],
          }
        },
        dynamic: {
          "keyboard": [],
          "bed_wall": [],
          "bed_side": [],
        },
      }
    }
  }

  async abort_loading() {
    if(this.mqtt.connection != null) {
      this.mqtt.connection.disconnect();
    }

    this.reset_data();
  }

  init_global_brocker_connection() {
    let uri = this.db.get_mqtt_uri()
    if(uri != this.mqtt.uri || this.mqtt.connection == null) {
      this.mqtt.uri = uri

      if(this.mqtt.connection != null) {
        this.mqtt.connection.disconnect()
      }
      this.mqtt.connection = new MQTT_AVAILABLE(this, this.mqtt.uri);

      this.state.available.is_loading   = true
      this.state.available.is_true = false
    }
  }

  // called by mqtt listener
  set_mqtt_brocker_to_available() {
    if(this.props.navigation.isFocused()) {
      let {available} = this.state
      available.is_loading  = false
      available.is_true     = true

      this.setState({
        available: available
      })
    } else {
      this.state.available.is_loading  = true
      this.state.available.is_true     = false

      this.mqtt.connection.disconnect()
      this.mqtt.connection = delete this.mqtt.connection
    }
  }

  are_all_devices_set() {
    if(this.devices.count == this.devices.names.length) {
      return true
    }
    return false
  }

  check_device_info() {
    if(!this.are_all_devices_set() && !this.state.data.is_loaded) {
      this.mqtt.connection = new MQTT_DATA(this, this.mqtt.uri, this.mqtt.qos, this.mqtt.retained);

      this.mqtt.connection.delete_device_listener();
      this.mqtt.connection.set_device_listener(this.mqtt.topic.devices);

      this.mqtt.connection.publish(this.mqtt.topic.devices, "list-devices");
    } else if(this.state.data.is_loaded) {
      this.check_config_info();
    }
  }

  check_config_info() {
    if(!this.state.data.is_loaded && this.state.data.is_loading) {
      let device = this.devices[this.devices.names[this.devices.index]]

      this.mqtt.topic.conf   = device.topic.conf;
      this.mqtt.topic.status = device.topic.status;

      this.mqtt.connection.delete_global_status_listener();
      this.mqtt.connection.set_global_status_listener(this.mqtt.topic.status);

      this.mqtt.connection.publish(this.mqtt.topic.conf, "get-conf");
    }
  }

  // called by mqtt listener
  set_device_info(device, device_info) {
    this.devices[device] = device_info;
    this.devices.count++;

    if(this.are_all_devices_set()) {
      this.state.data.is_loading = true;
      this.check_config_info();
    }
  }

  // called by mqtt listener
  set_config_info(config_data) {
    if(config_data == "end") {
      if(this.devices.index < (this.devices.count - 1)) {
        this.devices.index++
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
      let device_name = this.devices.names[this.devices.index]
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

  loaded_data() {
    // filter mqtt
    let {mqtt}  = this
    this.mqtt   = mqtt.connection;

    // filter devices
    let {devices} = this
    this.devices  = {}

    for(var i = 0; i < devices.names.length; i++) {
      this.devices[devices.names[i]] = devices[devices.names[i]]
    }

    this.props.navigation.navigate("Smart_home_control_screen", {mqtt: this.mqtt, devices: this.devices, data: this.data})

    // reset
    this.abort_loading();
  }

  render() {
    if(this.props.navigation.isFocused()) {
      if(this.state.available.is_loading) {
        this.init_global_brocker_connection()
      } else if(this.state.available.is_true) {
        if(this.state.data.is_loaded) {
          this.loaded_data();
        } else {
          this.check_device_info();
        }
      }
    }

    return (
      <View style={STYLE.SCREEN.main}>
        <LoadData
          text="Verbindung zum Server wird aufgebaut"
          abort={() => {
            this.props.navigation.navigate("Home_control_screen");
            this.abort_loading();
          }}
        />
      </View>
    );
  }
};
