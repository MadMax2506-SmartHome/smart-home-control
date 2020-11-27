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

export const StyleHeader = {
  container: {
    width: "100%",
    minHeigth: "10%",
    heigth: "10%",

    paddingLeft: "1%",
    paddingTop: "2%",
    paddingRight: "1%",
    paddingBottom: "2%",

    flexDirection: "row",
    backgroundColor: Color.white,
    color: Color.black,
  },
  left: {
    width: "10%",
    heigth: "100%",

    paddingLeft: "2%",
    justifyContent: "center",
  },
  leftButton: {
    width: "100%",
    heigth: "100%",

    alignItems: "flex-start",
  },
  body: {
    width: "80%",
    heigth: "100%",

    alignItems: 'center',
    justifyContent: "center",
  },
  title: {
    color: 'black',
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: Font.size.headline.one,
  },
  right: {
    width: "10%",
    heigth: "100%",

    paddingRight: "2%",
    justifyContent: "center",
  },
  rightButton: {
    width: "100%",
    heigth: "100%",

    alignItems: "flex-end",
  },
};

export function StyleHeadline(color=Color.black, padding=0, marginBottom=0, textAlign='auto', fontSize=Font.size.headline.one) {
  return {
    fontSize: fontSize,
    color: color,
    padding: padding,
    marginBottom: marginBottom,
    textAlign: textAlign,
    fontWeight: 'bold',
  }
}

export function StyleWrapper(color=Color.black, size=5, flex=false) {
  if(flex) {
    return {
      flexDirection: 'row',
      width: "100%",
      height: "auto",
      padding: 200,
      borderColor: color,
      borderTopWidth: size,
      borderBottomWidth: size,
    }
  } else {
    return {
      width: "100%",
      height: "auto",
      padding: 200,
      borderColor: color,
      borderTopWidth: size,
      borderBottomWidth: size,
    }
  }
}

export function StyleFlexBox(width="100%", height="auto", padding="0%", margin="0%", backgroundColor=Color.current, alignItems='stretch', justifyContent='flex-start') {
  return {
    flexDirection: 'row',
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    alignItems: alignItems,
    justifyContent: justifyContent,
    backgroundColor: backgroundColor,
    fontSize: Font.size.text,
  }
}

export function StyleBox(width="100%", height="auto", padding="0%", margin="0%", backgroundColor=Color.current, alignItems='center', justifyContent='center') {
  return {
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    alignItems: alignItems,
    justifyContent: justifyContent,
    backgroundColor: backgroundColor,
  }
};

export function StyleButtonWrapper(width="auto", height='auto', backgroundColor=Color.current) {
  return {
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export function StyleButton(width="auto", height='auto', color=Color.black) {
  return {
    width: width,
    height: height,
    backgroundColor: Color.current,
    color: color,
    alignItems: 'center',
    justifyContent: 'center',
  }
}
