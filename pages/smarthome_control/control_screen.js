import React, {Component} from 'react';

// Icons
import FoundationIcons from 'react-native-vector-icons/Foundation';

// Tab Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Roomlight_tab from "./roomlight/roomlight_tab.js"

// Allgemein
import STYLE from '../../data/config/style.js'

export default class MenuScreen extends Component  {
  constructor(props) {
    super(props);

    const { params }  = this.props.route;
    this.mqtt = params.mqtt;
    this.tab_navigation = {
      options: null,
      static_tabs: {
        roomlight: null,
      },
    }
  }

  set_tab_navigation() {
    this.tab_navigation.options = {
      showLabel: true,
      labelPosition: 'below-icon',
      labelStyle: { marginBottom: 5, fontSize: 12},
      activeTintColor : {backgroundColor: "black"},
      style: {height: 60},
    }

    this.tab_navigation.static_tabs.roomlight = (
      <Tab.Screen
        name="Roomlight_tab"
        children={({navigation})=> <Roomlight_tab mqtt={this.mqtt} navigation={this.props.navigation} navigation_tab={navigation}/>}
        options={() => ({
          tabBarLabel: "Beleuchtung",
          tabBarIcon: props => (<FoundationIcons name="lightbulb" size={30} color={props.color}/>)
        })}
      />
    );
  }

  render() {
    this.set_tab_navigation()
    
    return (
      <Tab.Navigator initialRouteName={"Roomlight_tab"} tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.roomlight}
      </Tab.Navigator>
    );
  }
};
