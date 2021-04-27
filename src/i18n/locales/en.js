export default {
  title: 'Smart Home',

  btn: {
    exit: 'Exit',
  },

  home: {
    welcome: {
      title: 'Welcome to your smart home control',
    },

    menu: {
      home: 'Home',
      smart_devices: 'Devices',
      door_opener: 'Door opener',
      settings: 'Settings',
    },

    actions: {
      error: 'Timeout! \nThe MQTT broker was not reached',
    },
  },

  door_opener: {
    actions: {
      call: 'Call',
    },
  },

  settings: {
    actions: {
      will_save: 'Data are stored...',
      has_save: 'Data was saved!',
    },

    labels: {
      features: {
        smart_home: 'Smart home control',
        door_opener: 'Door opener',
      },
      user: {
        first_name: 'First name',
        surname: 'Surname',
      },
      mqtt: {
        ipaddress: 'IP-Address',
        port: 'Port',
      },
      door_opener: {
        phone_number: 'Phone Number',
        phone_key: 'Key',
      },
    },

    menu: {
      feature: 'Features',
      user: 'User',
      mqtt: 'MQTT Brocker',
      door_opener: 'Door Opener',
    },
  },

  smart_home: {
    menu: {
      thermometer: 'Thermometer',
      light: 'Lighting',
    },

    thermometer: {
      room: 'Room thermometer',

      labels: {
        temperature: 'Temperature',
        humidity: 'Humidity',
      },

      units: {
        temperature: '° Celsius',
        humidity: '%',
      },
    },

    light: {
      typs: {
        keyboard: 'Keyboard',
        bed_wall: 'Wall',
        bed_side: 'sideways',
      },

      units: {
        time: 'ms',
      },

      control: {
        status: 'status',
        color: 'color',
        orientation: 'orientation',
        animationTyp: 'animation typ',
        animationTime: 'animation time',

        restart_animation: 'restart animation',
        reset_config: 'reset configuration',
        submit_config: 'submit config',
      },
    },

    actions: {
      error: 'There are no devices available.',
    },
  },
};
