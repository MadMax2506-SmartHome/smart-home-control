import * as Storage from './Storage.js';

import {TemperatureClient, RoomlightClient} from './DeviceClient.js';

import Availability from './mqtt/Availability.js';
import Devices from './mqtt/Devices.js';

export class Feature {
  #data;

  async load_data() {
    this.#data = {
      is_smart_home_control_active: await Storage.get_bool_entry(
        'is_smart_home_control_active',
      ),
      is_door_opener_active: await Storage.get_bool_entry(
        'is_door_opener_active',
      ),
    };
  }

  async set_data(is_smart_home_control_active, is_door_opener_active) {
    await Storage.set_entry(
      'is_smart_home_control_active',
      is_smart_home_control_active,
    );
    await Storage.set_entry('is_door_opener_active', is_door_opener_active);

    await this.load_data();
  }

  get_data() {
    var copy = Object.assign({}, this.#data);
    return copy;
  }
}

export class User {
  #data;

  async load_data() {
    this.#data = {
      first_name: await Storage.get_str_entry('first_name'),
      surname: await Storage.get_str_entry('surname'),
    };
  }

  async set_data(first_name, surname) {
    await Storage.set_entry('first_name', first_name);
    await Storage.set_entry('surname', surname);

    await this.load_data();
  }

  get_data() {
    var copy = Object.assign({}, this.#data);
    return copy;
  }
}

export class DoorOpener {
  #data;

  async load_data() {
    this.#data = {
      phone_number: await Storage.get_str_entry('phone_number'),
      phone_key: await Storage.get_str_entry('phone_key'),
    };
  }

  async set_data(phone_number, phone_key) {
    await Storage.set_entry('phone_number', phone_number);
    await Storage.set_entry('phone_key', phone_key);

    await this.load_data();
  }

  get_data() {
    var copy = Object.assign({}, this.#data);
    return copy;
  }
}

export class Mqtt {
  #availability_listener;
  #device_listener;

  #is_mqtt_brocker_is_already_checked;
  #is_available;
  #is_data_loaded;

  #data;
  #device_clients;

  constructor() {
    this.#is_mqtt_brocker_is_already_checked = false;
    this.#is_available = false;
    this.#is_data_loaded = false;
  }

  // data
  async load_data() {
    this.#data = {
      ipaddress: await Storage.get_str_entry('ipaddress'),
      port: await Storage.get_int_entry('port'),
    };

    this.disconnect();
    this.#device_clients = {
      roomlight: null,
      room_thermometer: null,
    };
  }

  async set_data(ipaddress, port) {
    await Storage.set_entry('ipaddress', ipaddress);
    await Storage.set_entry('port', port);

    await this.load_data();
  }

  get_data() {
    var copy = Object.assign({}, this.#data);
    return copy;
  }

  // getter
  get_if_mqtt_is_already_checked() {
    return this.#is_mqtt_brocker_is_already_checked;
  }

  get_if_mqtt_is_available() {
    return this.#is_available;
  }

  get_if_data_loaded() {
    return this.#is_data_loaded;
  }

  get_uri() {
    var data = this.get_data();

    if (data.ipaddress == null || data.port == null) {
      return null;
    } else {
      return 'mqtt://' + data.ipaddress + ':' + data.port;
    }
  }

  get_devices() {
    var copy = Object.assign({}, this.#device_clients);
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

    if (uri == null) {
      this.#is_mqtt_brocker_is_already_checked = true;
      return;
    }

    // general
    this.#availability_listener = new Availability(this, uri);
  }

  disconnect() {
    if (this.#availability_listener) {
      this.#availability_listener.disconnect();
      this.#availability_listener = null;
    }

    if (this.#device_listener) {
      this.#device_listener.disconnect();
      this.#device_listener = null;
    }

    if (this.#device_clients) {
      var keys = Object.keys(this.#device_clients);
      var length = keys.length;
      for (var i = 0; i < length; i++) {
        if (this.#device_clients[keys[i]] != null) {
          this.#device_clients[keys[i]].disconnect();
          this.#device_clients[keys[i]] = null;
        }
      }
    }
  }

  // methods which called by the mqtt client
  async set_mqtt_brocker_to_available() {
    this.#is_mqtt_brocker_is_already_checked = true;
    this.#is_available = true;

    this.#availability_listener.disconnect();
    this.#availability_listener = null;

    this.#device_listener = new Devices(this, this.get_uri());
  }

  add_device_client(device_info) {
    if (device_info.name === 'roomlight') {
      this.#device_clients.roomlight = new RoomlightClient(
        this.get_uri(),
        device_info.name,
        device_info.topic,
        device_info['mac-address'],
      );
    } else if (device_info.name === 'room_thermometer') {
      this.#device_clients.room_thermometer = new TemperatureClient(
        this.get_uri(),
        device_info.name,
        device_info.topic,
        device_info['mac-address'],
      );
    }

    this.#is_data_loaded =
      this.#device_clients.roomlight != null &&
      this.#device_clients.room_thermometer != null;
  }
}
