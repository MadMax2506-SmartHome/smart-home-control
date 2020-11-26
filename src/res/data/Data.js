import Storage from "./Storage.js"

export class Feature {
  constructor() {
    this.load_data();
  }

  async load_data() {
    this.data = {
      is_smart_home_control_active: await Storage.get_bool_entry("is_smart_home_control_active"),
      is_nas_control_active: await Storage.get_bool_entry("is_nas_control_active"),
    }
  }

  async set_data(is_smart_home_control_active, is_nas_control_active) {
    await Storage.set_entry("is_smart_home_control_active", is_smart_home_control_active);
    await Storage.set_entry("is_nas_control_active", is_nas_control_active);

    this.load_data();
  }

  get_data() {
    return this.data;
  }
}

export class User {
  constructor() {
    this.load_data();
  }

  async load_data() {
    this.data = {
      first_name: await Storage.get_str_entry("first_name"),
      surname: await Storage.get_str_entry("surname"),
    }
  }

  async set_data(first_name, surname) {
    await Storage.set_entry("first_name", first_name);
    await Storage.set_entry("surname", surname);

    this.load_data();
  }

  get_data() {
    return this.data;
  }
}

export class Mqtt {
  constructor() {
    this.load_data();
  }

  async load_data() {
    this.data = {
      typ: await Storage.get_str_entry("typ"),
      ipaddress: await Storage.get_str_entry("ipaddress"),
      port: await Storage.get_int_entry("port"),
      devices: [],
    }
  }

  async set_data(typ, ipaddress, port) {
    await Storage.set_entry("typ", typ);
    await Storage.set_entry("ipaddress", ipaddress);
    await Storage.set_entry("port", port);

    this.load_data();
  }

  get_data() {
    return this.data;
  }
}

class Device {
  constructor() {
    this.data = {}
  }
}

export class Nas {
  constructor() {
    this.load_data();
  }

  async load_data() {
    this.data = {
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

    this.load_data();
  }

  get_data() {
    return this.data;
  }
}
