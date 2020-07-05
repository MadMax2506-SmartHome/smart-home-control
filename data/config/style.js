import { StyleSheet } from 'react-native';

const screenStyle = StyleSheet.create({
  header: {
    width: "100%",
  },
  main: {
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  panel: {
    marginBottom: 40,
  },
  centerPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  btn: {
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default {
  SCREEN: screenStyle,
};
