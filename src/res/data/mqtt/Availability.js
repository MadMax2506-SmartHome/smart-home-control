// MQTT
import MQTT from 'sp-react-native-mqtt';

import Listener from './listener/availability_listener.js'

export default class Availability {
  constructor(_class, uri) {
    this._class = _class;
    Listener.check(this, this.getClient(uri));
  }

  disconnect() {
    Listener.disconnect()
  }

  getClient(uri) {
    return MQTT.createClient({
      uri: uri,
      clientId: "SmartHomeApp_" + (((1+Math.random())*0x1000000)|0).toString(16).substring(1),
    });
  }

  set_mqtt_brocker_to_available() {
    this._class.set_mqtt_brocker_to_available();
    this.disconnect();
  }
}
