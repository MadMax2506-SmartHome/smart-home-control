import { StyleSheet } from 'react-native';
import { Color, Font } from "./style.js"

export const StyleOutput = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  wrapper_label: {
    justifyContent: 'center',
    width: "50%",
    marginLeft: "10%",
    padding: 5,
  },
  wrapper_value: {
    justifyContent: 'center',
    width: "30%",
    marginRight: "10%",
    padding: 5,
  },

  label: {
    fontSize: Font.size.headline.four
  },
  value: {
    fontSize: Font.size.text
  }
});
