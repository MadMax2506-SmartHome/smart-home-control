import I18n from '../i18n/i18n';

export default {
  welcome: (data) => {
    var { first_name, surname } = data;
    var text;

    text = I18n.t("home.welcome.title")
    if(first_name != null && surname != null) {
      text+= " " + first_name;
    }
    text+= "."

    return text
  },

  thermometer: {
    temperature: (temperature) => {
      return temperature + I18n.t("smart_home.thermometer.units.temperature");
    },
    humidity: (humidity) => {
      return humidity + I18n.t("smart_home.thermometer.units.humidity");
    },
  },

  roomlight: {
    animationTime: (animationTime) => {
      return animationTime + " " + I18n.t("smart_home.light.units.time");
    }
  },
}
