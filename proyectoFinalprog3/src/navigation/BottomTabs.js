import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { FontAwesome } from '@expo/vector-icons'
import CrearPosts from '../screens/CrearPosts';



const Tab= createBottomTabNavigator();

export default function BottomTabs() {
  return (
//con tabBarShowLabel: false elimino los nombres que acompanian a los iconos. Con headerShown: false, elimino el header que en stacknavigation use headerShown:false. Sin headershown no se eliminaba. 
    <Tab.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false}} > 
        <Tab.Screen 
          name='Home' 
          component={Home}
          options={{
            tabBarIcon: () => <FontAwesome name='home' size={24} color={'#7371FC'} />,

          }}
          />
        
        <Tab.Screen 
          name='Profile' 
          component={Profile}
          options={{
            tabBarIcon: () => <FontAwesome name='user' size={24} color={'#A594F9'} />
          }}
          
          />

        <Tab.Screen 
          name='CrearPosts' 
          component={CrearPosts}
          options={{
            tabBarIcon: () => <FontAwesome name='plus' size={24} color={'#CDC1FF'} />
          }}
          />

    </Tab.Navigator>

  )
}

