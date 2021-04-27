export default {
  title: 'Smart Home',

  btn: {
    exit: 'Verlassen',
  },

  home: {
    welcome: {
      title: 'Herzlich Wilkommen in deiner Smart Home Steuerung',
    },

    menu: {
      home: 'Home',
      smart_devices: 'Geräte',
      door_opener: 'Türöffner',
      settings: 'Einstellungen',
    },

    actions: {
      error: 'Timeout! \nDer MQTT-Brocker wurde nicht erreicht',
    },
  },

  settings: {
    actions: {
      will_save: 'Daten werden gespeichert...',
      has_save: 'Daten wurden gespeichert!',
    },

    labels: {
      features: {
        smart_home: 'Smart Home Steuerung',
        door_opener: 'Türöffner',
      },
      user: {
        first_name: 'Vorname',
        surname: 'Nachname',
      },
      mqtt: {
        ipaddress: 'IP-Adresse',
        port: 'Port',
      },
      door_opener: {
        phone_number: 'Telefonnr.',
        phone_key: 'Key',
      },
    },

    menu: {
      feature: 'Features',
      user: 'Benutzer',
      mqtt: 'MQTT Brocker',
      door_opener: 'Türöffner',
    },
  },

  smart_home: {
    menu: {
      thermometer: 'Thermometer',
      light: 'Beleuchtung',
    },

    thermometer: {
      room: 'Raumthermometer',

      labels: {
        temperature: 'Temperatur',
        humidity: 'Luftfeuchtigkeit',
      },

      units: {
        temperature: '° Celsius',
        humidity: '%',
      },
    },

    light: {
      typs: {
        keyboard: 'Tastatur',
        bed_wall: 'Wand',
        bed_side: 'seitlich',
      },

      units: {
        time: 'ms',
      },

      control: {
        status: 'Zustand',
        color: 'Farbe',
        orientation: 'Animationsrichtung',
        animationTyp: 'Animationstyp',
        animationTime: 'Animationszeit',

        restart_animation: 'Animation neustarten',
        reset_config: 'Konfiguration zurücksetzen',
        submit_config: 'Konfiguration übernehmen',
      },
    },

    actions: {
      error: 'Es sind keine Geräte verfügbar.',
    },
  },
};
