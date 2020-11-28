import { StyleSheet } from 'react-native';
import { Color, Font } from "./style.js"

export const StyleInput = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  wrapper: {
    justifyContent: 'center',
    width: "50%",
    marginRight: "10%",
    padding: 5,
  },
  label_wrapper: {
    justifyContent: 'center',
    width: "30%",
    marginLeft: "10%",
  },

  elem: {
    marginTop: 15,
  },
  color_elem: {
    margin: 5,
    textAlign: 'center'
  },
});

export const StyleGroupElem = StyleSheet.create({
  input_slider: {
    paddingTop: "3%",
    paddingBottom: "3%",
  },
  input: {
    height: 40,
    padding: 0,
    paddingLeft: 5,

    fontSize: Font.size.text,

    borderColor: Color.black,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: Font.size.headline.four,
  },
  btn: {
    width: "80%",
    height: "auto",
    backgroundColor: Color.black,
    alignItems: 'center',
    justifyContent: 'center',

    padding: "3%",

    marginLeft: "10%",
    marginTop: "2%",
    marginRight: "10%",
    marginBottom: "2%",
  },
});

export const StyleGroup = StyleSheet.create({
  header: {
    width: "100%",
  },
  main: {
    width: "100%",
    padding: "3%",
  },
});
