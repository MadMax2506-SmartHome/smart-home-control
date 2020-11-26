import { StyleSheet, Dimensions } from 'react-native';

export const Color = {
  current: "rgba(0,0,0,0)",

  white: 'white',
  green: 'green',
  black: 'black',
  red: 'red',
  grey: "rgb(128,128,128)",
  yellow: "#FFDE00",
  orange: '#FF4000',
  blue: '#0066CC',

  light_yellow: 'rgba(255, 200, 0, 0.1)',
  light_red: 'rgba(255, 0, 0, 0.2)',
  light_green: 'rgba(0, 255, 0, 0.1)',
  white_blue: '#E9EBE7',
  light_blue: '#EBF0FA',
  light_grey: "rgba(128,128,128,0.1)",
  light_grey_2: "rgba(128,128,128,0.5)",

  dark_red: '#800000',
  dark_blue: '#004080',
  dark_light_blue: '#D6E0F5',
}

export const Font = {
  size: {
    headline: {
      one: 30,
      two: 27,
      three: 24,
      four: 20,
    },
    text: 20,
    dialogText: 18,
    normal_icon: 30,
    table: {
      head: 22,
      body: 20,
    }
  }
}

export const StyleMain = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  containerCenter: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
});
