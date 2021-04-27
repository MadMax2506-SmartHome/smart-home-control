import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Style
import {
  Color,
  Font,
  StyleHeader,
  StyleButtonWrapper,
} from '../res/style/style.js';

//I18n
import I18n from '../i18n/i18n.js';

export default class HeaderBack extends Component {
  constructor(props) {
    super(props);
  }

  getEmptyElement() {
    return <></>;
  }

  getBackButtonElement() {
    if (this.props.back !== undefined) {
      return (
        <View style={[StyleButtonWrapper('100%')]}>
          <TouchableOpacity
            style={StyleHeader.leftButton}
            onPress={() => this.props.back()}>
            <FontAwesome
              name="arrow-left"
              size={Font.size.normal_icon}
              color={Color.black}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return <></>;
    }
  }

  getRefreshButtonElement() {
    if (this.props.refresh === undefined) {
      return <></>;
    } else {
      return (
        <View style={StyleButtonWrapper('100%')}>
          <TouchableOpacity
            style={StyleHeader.rightButton}
            onPress={() => this.props.refresh()}>
            <FontAwesome
              name="refresh"
              size={Font.size.normal_icon}
              color={Color.black}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  getTitleElement(title) {
    return <Text style={StyleHeader.title}>{title}</Text>;
  }

  render() {
    var name = this.props.screenName;
    var title, leftButton, rightButton;

    switch (name) {
      case 'HomeScreen':
        title = this.getTitleElement(I18n.t('title'));
        leftButton = this.getEmptyElement();
        rightButton = this.getRefreshButtonElement();
        break;
      default:
        title = this.getTitleElement(I18n.t('title'));
        leftButton = this.getBackButtonElement();
        rightButton = this.getRefreshButtonElement();
    }

    return (
      <View style={StyleHeader.container}>
        <View style={StyleHeader.left}>{leftButton}</View>
        <View style={StyleHeader.body}>{title}</View>
        <View style={StyleHeader.right}>{rightButton}</View>
      </View>
    );
  }
}
