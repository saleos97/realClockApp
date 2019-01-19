import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
// import StopwatchScreen from './StopwatchScreen';
import WordClockScreen from './WorldClockScreen';
import TimerScreen from './TimerScreen';
import Exchange from './Exchange';


import {createBottomTabNavigator,createAppContainer} from 'react-navigation';



const TabNavigator = createBottomTabNavigator({
  WorldClock: {screen: WordClockScreen,
    navigationOptions:{
      tabBarLabel:'WorldClock',
    tabBarIcon: ({tintColor}) =>(
      <Entypo name='clock' size ={22}/>
      )      
    }
  },
  
  Timer: {screen:TimerScreen,
    navigationOptions:{
    tabBarLabel:'Timer',
  tabBarIcon: ({tintColor}) =>(
    <Ionicons name='md-timer' size={24}/>
    )      
  }},
  Exchange: {screen:Exchange,
    navigationOptions:{
    tabBarLabel:'Currency',
  tabBarIcon: ({tintColor}) =>(
    <Ionicons name='md-cash' size={24}/>
    )      
  }}
  // ,

  // Stopwatch: {screen:StopwatchScreen,
  //   navigationOptions:{
  //   tabBarLabel:'Stopwatch',
  // tabBarIcon: ({tintColor}) =>(
  //   <Entypo name='stopwatch' size ={24}/>
  //   )      
  // }}
}

);
export default createAppContainer(TabNavigator);
