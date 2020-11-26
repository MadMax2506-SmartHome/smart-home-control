import React, {Component} from 'react';
import { View, ToastAndroid } from 'react-native';

// MQTT
/*import MQTT_AVAILABLE from '../../res/data/mqtt/Availability.js'
import MQTT_DATA from '../../res/data/mqtt/Mqtt_data.js'
*/
// Allgemein
import STYLE from '../../res/style.js'
import LoadData from "../../components/Load_data.js"

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
      connection: {
        global: null,
        roomlight: null,
      },
      topic: {
        devices: "devices",
        roomlight: {
          conf: "",
          status: "",
        },
        room_thermometer: {
          temperature: ""
        },
      },
      qos: 0,
      retained: false,
    };

    this.devices = {
      count: 0,
      names: ["roomlight", "room_thermometer"],
      roomlight: [],
      room_thermometer: [],
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
      },
      room_thermometer: {
        static: {

        }
      }
    }
  }

  async abort_loading() {
    if(this.mqtt.connection.global != null) {
      this.mqtt.connection.global.disconnect();
    }

    this.reset_data();
  }

  init_global_brocker_connection() {
    let uri = this.db.get_mqtt_uri()
    if(uri != this.mqtt.uri || this.mqtt.connection.global == null) {
      this.mqtt.uri = uri

      if(this.mqtt.connection.global != null) {
        this.mqtt.connection.global.disconnect()
      }
      this.mqtt.connection.global = new MQTT_AVAILABLE(this, this.mqtt.uri);

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

      this.mqtt.connection.global.disconnect()
      this.mqtt.connection.global = delete this.mqtt.connection.global
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
      var { mqtt } = this;

      this.mqtt.connection.global           = new MQTT_DATA(this, mqtt.uri, mqtt.qos, mqtt.retained);
      this.mqtt.connection.roomlight        = new MQTT_DATA(this, mqtt.uri, mqtt.qos, mqtt.retained);

      this.mqtt.connection.global.delete_device_listener();
      this.mqtt.connection.global.set_device_listener(mqtt.topic.devices);

      this.mqtt.connection.global.publish(mqtt.topic.devices, "list-devices");
    } else if(this.state.data.is_loaded) {
      this.check_roomlight_config_info();
    }
  }

  check_roomlight_config_info() {
    if(!this.state.data.is_loaded && this.state.data.is_loading) {
      var { mqtt }  = this;
      let device    = this.devices[this.devices.names[0]]

      this.mqtt.topic.roomlight.conf   = device.topic.conf;
      this.mqtt.topic.roomlight.status = device.topic.status;

      this.mqtt.connection.roomlight.delete_global_status_listener();
      this.mqtt.connection.roomlight.set_global_status_listener(mqtt.topic.roomlight.status);

      this.mqtt.connection.roomlight.publish(mqtt.topic.roomlight.conf, "get-conf");
    }
  }

  check_room_thermometer_config_info() {
    if(!this.state.data.is_loaded && this.state.data.is_loading) {
      var { mqtt }  = this;
      let device    = this.devices[this.devices.names[1]]

      this.mqtt.topic.room_thermometer.temperature = device.topic.temperature;
    }
  }

  // called by mqtt listener
  set_device_info(device, device_info) {
    this.devices[device] = device_info;
    this.devices.count++;

    if(this.are_all_devices_set()) {
      this.state.data.is_loading = true;

      // roomlight
      this.check_roomlight_config_info();

      // room thermometer
      this.check_room_thermometer_config_info()
    }
  }

  // called by mqtt listener
  set_roomlight_config_info(config_data) {
    if(config_data == "end") {
      let { data } = this.state
      data.is_loading = false
      data.is_loaded = true

      this.setState({
        data: data
      });
    } else {
      var { data } = this;

      var place = "";
      for(var i = 0; i < data.roomlight.static.lights.values.length; i++) {
        if(config_data[data.roomlight.static.lights.indices[i]] != undefined) {
          place = i;
          break;
        }
      }
      this.data.roomlight.dynamic[data.roomlight.static.lights.values[place]] = config_data[data.roomlight.static.lights.indices[place]];
    }
  }

  loaded_data() {
    // filter mqtt
    let { mqtt, devices }  = this

    console.log(this.mqtt);
    console.log(this.devices);
    /*// filter devices
    let {devices} = this
    this.devices  = {}

    for(var i = 0; i < devices.names.length; i++) {
      this.devices[devices.names[i]] = devices[devices.names[i]]
    }*/
    mqtt_compact = {
      connection: mqtt.connection,
      data: {
        uri: mqtt.uri,
        topic: mqtt.topic,
        qos: mqtt.qos
      }
    }

    this.props.navigation.navigate("Smart_home_control_screen", {mqtt: mqtt_compact, devices: devices, data: this.data})

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
