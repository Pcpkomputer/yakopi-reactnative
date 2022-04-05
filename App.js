import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import DashboardScreen from './screen/DashboardScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen 
      options={{
        headerShown:false
      }}
      name="Home" component={DashboardScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

