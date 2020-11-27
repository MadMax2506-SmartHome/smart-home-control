// MQTT
import MqttConnection from "./MqttConnection.js";
import Listener from './listener/availability_listener.js'

export default class Availability extends MqttConnection {
  constructor(_class, uri) {
    super(_class, uri);

    Listener.check(this, this.get_client(uri));
  }

  disconnect() {
    Listener.disconnect()
  }

  set_mqtt_brocker_to_available() {
    this._class.set_mqtt_brocker_to_available();
  }
}
