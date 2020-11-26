// MQTT
import MqttConnection from "./MqttConnection.js";
import Listener from './listener/temperature_listener.js'

export default class Temperature extends MqttConnection {
  constructor(_class, uri, topic) {
    super(_class, uri, topic);

    Listener.temperature( this, this.get_client(), this.topic, this.qos);
  }

  disconnect() {
    Listener.disconnect();
  }

  set_temperature(temperature) {
    this._class.refresh(temperature["temperature"], temperature["humidity"]);
  }
}
