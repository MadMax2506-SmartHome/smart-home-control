import * as Storage from "./Storage.js";

import { TemperatureClient, RoomlightClient } from "./DeviceClient.js"

import Availability from "./mqtt/Availability.js";
import Devices from "./mqtt/Devices.js";

export class Feature {
  #data;

  async load_data() {
    this.#data = {
      is_smart_home_control_active: await Storage.get_bool_entry("is_smart_home_control_active"),
    }
  }

  async set_data(is_smart_home_control_active, is_nas_control_active) {
    await Storage.set_entry("is_smart_home_control_active", is_smart_home_control_active);

    await this.load_data();
  }

  get_data() {
    var copy = Object.assign({}, this.#data)
    return copy;
  }
}

export class User {
  #data;

  async load_data() {
    this.#data = {
      first_name: await Storage.get_str_entry("first_name"),
      surname: await Storage.get_str_entry("surname"),
    }
  }

  async set_data(first_name, surname) {
    await Storage.set_entry("first_name", first_name);
    await Storage.set_entry("surname", surname);

    await this.load_data();
  }

  get_data() {
    var copy = Object.assign({}, this.#data)
    return copy;
  }
}

export class Mqtt {
  #availability_client;
  #device_client;

  #check_mqtt_brocker;
  #is_available;
  #data_is_loaded;

  #data;
  #device_clients;

  constructor() {
    this.#check_mqtt_brocker = false;
    this.#is_available       = false;
    this.#data_is_loaded     = false;
  }

// data
  async load_data() {
    this.#data = {
      ipaddress: await Storage.get_str_entry("ipaddress"),
      port: await Storage.get_int_entry("port"),
    }

    this.#device_clients = {
      roomlight: null,
      room_thermometer: null,
    };
  }

  async set_data(ipaddress, port) {
    await Storage.set_entry("ipaddress", ipaddress);
    await Storage.set_entry("port", port);

    await this.load_data();
  }

  get_data() {
    var copy = Object.assign({}, this.#data)
    return copy;
  }

// getter
  has_check_mqtt_brocker() {
    return this.#check_mqtt_brocker;
  }

  is_available() {
    return this.#is_available;
  }

  has_data_loaded() {
    return this.#data_is_loaded;
  }

  get_uri() {
    var data = this.get_data();

    if(data.ipaddress == null || data.port == null) {
      return null;
    } else {
      return "mqtt://" + data.ipaddress + ":" + data.port;
    }
  }

  get_devices() {
    var copy = Object.assign({}, this.#device_clients)
    return copy;
  }

  get_roomlight_device() {
    var devices = this.get_devices();
    return devices.roomlight;
  }

  get_room_thermometer_device() {
    var devices = this.get_devices();
    return devices.room_thermometer;
  }

// mqtt
  async init_devices() {
    var uri = this.get_uri();

    if(uri == null) {
      this.#check_mqtt_brocker = true;
      return;
    }

    // general
    this.#availability_client = new Availability( this, uri );
  }

  disconnect() {
    if(this.#availability_client) {
      this.availability_client.disconnect();
      this.#availability_client = null;
    }

    if(this.#device_client) {
      this.device_client.disconnect();
      this.#device_client = null;
    }

    var keys    = Object.keys(this.#device_clients);
    var length  = keys.length;
    for(var i = 0; i < length; i++) {
      if(this.#device_clients[keys[i]] != null) {
        this.#device_clients[keys[i]].disconnect();
        this.#device_clients[keys[i]] = null;
      }
    }
  }

// methods which called by the mqtt client
  async set_mqtt_brocker_to_available() {
    this.#check_mqtt_brocker  = true;
    this.#is_available        = true;

    this.#device_client = new Devices( this, this.get_uri() );

    await new Promise((resolve) => setTimeout(() => { resolve('result') }, 5000));
    this.#data_is_loaded = true;
  }

  add_device_client(device_info) {
    if(device_info["name"] == "roomlight") {
      var device_client = new RoomlightClient( this.get_uri(),
                                                  device_info["name"],
                                                  device_info["topic"],
                                                  device_info["mac-address"],);
      this.#device_clients["roomlight"] = device_client;

    } else if(device_info["name"] == "room_thermometer") {
      var device_client = new TemperatureClient( this.get_uri(),
                                                  device_info["name"],
                                                  device_info["topic"],
                                                  device_info["mac-address"],);
      this.#device_clients["room_thermometer"] = device_client;
    }
  }
}
