import Roomlight from "./mqtt/Roomlight.js";
import RoomlightSubdivision from "./mqtt/RoomlightSubdivision.js";
import Temperature from "./mqtt/Temperature.js";

class DeviceClient {
  _name;
  _topic;
  _macaddress;

  constructor(name, topic, macaddress) {
    this._name        = name;
    this._topic       = topic;
    this._macaddress  = macaddress;
  }

  get_name() {
    return this._name;
  }

  get_topic() {
    return this._topic;
  }

  get_macaddress() {
    return this._macaddress;
  }
}

export class TemperatureClient extends DeviceClient {
  #connection;

  #humidity;
  #temperature;

  constructor(uri, name, topic, macaddress) {
    super(name, topic, macaddress);

    this.#connection = new Temperature( this, uri, this._topic["temperature"] );
  }

  disconnect() {
    this.#connection.disconnect();
    this.#connection = null;
  }

// setter
  set_humidity(humidity) {
    this.#humidity = humidity;
  }

  set_temperature(temperature) {
    this.#temperature = temperature;
  }

// getter
  get_humidity() {
    return this.#humidity;
  }

  get_temperature() {
    return this.#temperature;
  }
}

export class RoomlightClient extends DeviceClient {
  #uri;
  #connection;
  #subdivision;

  constructor(uri, name, topic, macaddress) {
    super(name, topic, macaddress);

    this.#uri         = uri;
    this.#connection  = new Roomlight(this, uri, topic);
    this.#subdivision = {};
  }

  disconnect() {
    this.#connection.disconnect();
    this.#connection = null;

    var keys    = Object.keys(this.#subdivision);
    var length  = keys.length;
    for(var i = 0; i < length; i++) {
      this.#subdivision[keys[i]].disconnect();
      this.#subdivision[keys[i]] = null;
    }
  }

  reload_config() {
    this.#connection.load_config();
  }

  set_subdivision(subdivision) {
    var name  = Object.keys(subdivision)[0].replace("-", "/");
    var data  = subdivision[name];
    var topic = Object.assign({}, this._topic);

    topic["conf"]   += "/" + name;
    topic["status"] += "/" + name;

    this.#subdivision[name] = new RoomlightSubdivisionClient( this.#uri,
                                                              topic,
                                                              data["color"],
                                                              data["orientation"],
                                                              data["status"],
                                                              data["time"],
                                                              data["type"]);
  }

  get_subdivision() {
    var copy = Object.assign({}, this.#subdivision)
    return copy;
  }
}

class RoomlightSubdivisionClient {
  #connection;
  #topic;

  #color;
  #orientation;
  #status;
  #time;
  #type;

  constructor(uri, topic, color, orientation, status, time, type) {
    this.#topic       = topic;
    this.#color       = color;
    this.#orientation = orientation;
    this.#status      = status;
    this.#time        = time;
    this.#type        = type;

    this.#connection = new RoomlightSubdivision(this, uri, this.#topic["status"])
  }

  publish(msg) {
    this.#connection.publish(this.topic.conf, msg);
  }

  disconnect() {
    this.#connection.disconnect();
    this.#connection = null;
  }

// setter
  set_color(color) {
    this.publish("color: " + color.red + ";" + color.green + ";" + color.blue);
    this.#color = color;
  }

  set_orientation(orientation) {
    this.publish("orientation: " + orientation)
    this.#orientation = orientation;
  }

  set_status(status) {
    this.publish(status ? "active" : "idle")
    this.#status = status;
  }

  set_time(time) {
    this.publish("animation-time: " + time)
    this.#time = time;
  }

  set_type(type) {
    this.publish("animation-typ: " + type)
    this.#type = type;
  }

// getter
  get_color() {
    return this.#color;
  }

  get_orientation() {
    return this.#orientation;
  }

  get_status() {
    return this.#status;
  }

  get_time() {
    return this.#time;
  }

  get_type() {
    return this.#type;
  }
}
