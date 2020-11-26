import * as Storage from "./Storage.js"
import Availability from "./mqtt/Availability.js"
//import Availability as Mqtt_Availability from "./mqtt/Availability.js"

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
  #check_mqtt_brocker;
  #is_available;
  #data;

  constructor() {
    this.#check_mqtt_brocker = false;
    this.#is_available       = false;
  }

  async load_data() {
    this.#data = {
      ipaddress: await Storage.get_str_entry("ipaddress"),
      port: await Storage.get_int_entry("port"),
      devices: [],
    }
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

  has_check_mqtt_brocker() {
    return this.#check_mqtt_brocker;
  }

  is_available() {
    return this.#is_available;
  }

  get_uri() {
    var data = this.get_data();

    if(data.ipaddress == null || data.port == null) {
      return null;
    } else {
      return "mqtt://" + data.ipaddress + ":" + data.port;
    }
  }

  async init_devices() {
    var uri = this.get_uri();

    if(uri == null) {
      this.#check_mqtt_brocker = true;
      return;
    }

    // general
    new Availability( this, uri );
  }

  // methods which called by the mqtt client
  set_mqtt_brocker_to_available() {
    this.#check_mqtt_brocker = true;
    this.#is_available       = true;

    console.log("available");
  }
}

export class Device {
  #data;

  constructor() {
    this.#data = {}
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
