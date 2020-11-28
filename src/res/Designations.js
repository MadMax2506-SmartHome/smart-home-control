import I18n from '../i18n/i18n';

export default {
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
