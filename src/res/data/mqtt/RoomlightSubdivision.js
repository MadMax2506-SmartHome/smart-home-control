// MQTT
import MqttConnection from "./MqttConnection.js";
import Listener from './listener/roomlight_subdivision_listener.js'

export default class RoomlightSubdivision extends MqttConnection {
  constructor(_class, uri, topic) {
    super(_class, uri, topic);
    Listener.roomlight_subdivision( this, this.get_client(), this.topic, this.qos);
  }

  disconnect() {
    Listener.disconnect();
  }

  set_new_config(config) {
    console.log(config);
  }
}
