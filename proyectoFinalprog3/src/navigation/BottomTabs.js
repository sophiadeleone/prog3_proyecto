import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { FontAwesome } from '@expo/vector-icons'

const Tab= createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
          name='Home' 
          component={Home}
          options={{
            tabBarIcon: () => <FontAwesome name='home' size={24} color={'red'} />
          }}
          />
        
        <Tab.Screen 
          name='Profile' 
          component={Profile}
          options={{
            tabBarIcon: () => <FontAwesome name='user' size={24} color={'black'} />
          }}
          />

    </Tab.Navigator>
  )
}

//falta el de crear posteo Y HACER UN COMPONENTE DE ESTO