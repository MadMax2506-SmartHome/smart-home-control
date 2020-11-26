// MQTT
import MqttConnection from "./MqttConnection.js";
import Listener from './listener/roomlight_listener.js'

export default class Roomlight extends MqttConnection {
  constructor(_class, uri, topic) {
    super(_class, uri, topic);

    Listener.roomlight( this, this.get_client(), this.topic["status"], this.qos);
    this.load_config()
  }

  disconnect() {
    Listener.disconnect();
  }

  load_config() {
    this.publish(this.topic["conf"], "get-conf");
  }

  start_subdivision() {}

  stop_subdivision() {}

  add_subdivision(subdivision_config_info) {
    console.log(subdivision_config_info);
    this._class.set_subdivision(subdivision_config_info);
  }
}
