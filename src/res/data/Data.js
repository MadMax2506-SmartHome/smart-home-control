import * as Storage from "./Storage.js"
import Availability from "./mqtt/Availability.js"
import Devices from "./mqtt/Devices.js"

export class Feature {
  #data;

  async load_data() {
    this.#data = {
      is_smart_home_control_active: await Storage.get_bool_entry("is_smart_home_control_active"),
      is_nas_control_active: await Storage.get_bool_entry("is_nas_control_active"),
    }
  }

  async set_data(is_smart_home_control_active, is_nas_control_active) {
    await Storage.set_entry("is_smart_home_control_active", is_smart_home_control_active);
    await Storage.set_entry("is_nas_control_active", is_nas_control_active);

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

    this.#device_clients = [];
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
    return this.#device_clients.slice(0)
  }

// mqtt
  async init_devices() {
    var uri = this.get_uri();

    if(uri == null) {
      this.#check_mqtt_brocker = true;
      return;
    }

    // general
    this.disconnect();
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
    var device_client = new DeviceClient( device_info["name"],
                                          device_info["topic"],
                                          device_info["mac-address"],);
    this.#device_clients.push( device_client );
  }
}

class DeviceClient {
  #connection;

  #name;
  #topic;
  #macaddress;

  constructor(name, topic, macaddress) {
    this.#name        = name;
    this.#topic       = topic;
    this.#macaddress  = macaddress;
  }

  get_name() {
    return this.#name;
  }
}

export class Nas {
  #data;

  async load_data() {
    this.#data = {
      ipaddress: await Storage.get_str_entry("ipaddress"),
      macaddress: await Storage.get_str_entry("macaddress"),
      username: await Storage.get_str_entry("username"),
      password: await Storage.get_str_entry("password"),
    }
  }

  async set_data(ipaddress, macaddress, username, password) {
    await Storage.set_entry("ipaddress", ipaddress);
    await Storage.set_entry("macaddress", macaddress);
    await Storage.set_entry("username", username);
    await Storage.set_entry("password", password);

    await this.load_data();
  }

  get_data() {
    var copy = Object.assign({}, this.#data)
    return copy;
  }
}
