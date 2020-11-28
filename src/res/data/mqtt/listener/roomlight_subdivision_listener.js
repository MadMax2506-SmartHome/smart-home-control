import _ from 'underscore';

module.exports = {
  roomlight_subdivision(_class, mqttClient, channel, qos) {
    if (!mqttClient) {
      return;
    }
    this.onConnect    = this.onConnect.bind(this);
    this.onClosed     = this.onClosed.bind(this);
    this.onError      = this.onError.bind(this);
    this.onMessage    = this.onMessage.bind(this);
    this.disconnect   = this.disconnect.bind(this);

    this.config = _.extend({
      channel: channel,
      qos: qos,
      _class: _class,
    });

    mqttClient.then((client) => {
      this.client = client;
      client.on('closed', this.onClosed);
      client.on('error', this.onError);
      client.on('message', this.onMessage);
      client.on('connect', this.onConnect);
      client.connect();
    }).catch();

  },
  disconnect() {
    if(this.client) {
      console.log('Now killing open roomlight subdivision listener manager.');
      this.client.disconnect();
    }
  },
  onError(error) {},
  onConnect() {
    if(this.config.channel != null) {
      this.client.subscribe(this.config.channel, this.config.qos);
    }
  },
  onClosed(err) {},
  onMessage(msg) {
    var topic = msg.topic;
    var data  = msg.data;

    this.config._class.set_new_config(data);
  },
};
