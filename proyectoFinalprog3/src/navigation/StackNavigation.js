import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login"
import BottomTabs from "../navigation/BottomTabs"
import Register from "../screens/Register";
import Home from "../screens/Home"
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown:false //checkear que quieran que ocultemos esto
                }}
            />

             <Stack.Screen 
            name='Register' 
            component={Register}
            options={
                {
                    headerShown: false
                }
            }
            />
           
            <Stack.Screen
                name='Tab'
                component={BottomTabs}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown:false
                }}
            />
            
        </Stack.Navigator>
    )
}

export default StackNavigation

