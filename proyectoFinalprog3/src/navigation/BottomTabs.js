import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { FontAwesome } from '@expo/vector-icons'
import CrearPosts from '../screens/CrearPosts';

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

        <Tab.Screen 
          name='CrearPosts' 
          component={CrearPosts}
          options={{
            tabBarIcon: () => <FontAwesome name='plus' size={24} color={'black'} />
          }}
          />

    </Tab.Navigator>
  )
}

