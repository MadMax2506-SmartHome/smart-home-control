import _ from 'underscore';

module.exports = {
  roomlight(_class, mqttClient, channel, qos) {
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
      console.log('Now killing open mqtt notification manager.');
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

    if(data == "start") {
      this.config._class.start_subdivision();
    } else if(data == "end") {
      this.config._class.stop_subdivision();
    } else if(data == "power-on") {} else {
      try {
        let subdivision = JSON.parse(data);
        this.config._class.add_subdivision(subdivision);
      } catch (e) {}
    }
  },
};
