import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login"
import Profile from "../screens/Profile"
import Register from "../screens/Register";
const Stack = createNativeStackNavigator();

function StackNavigation() {
    return(
        <Stack.Navigator>
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
                name='Login'
                component={Login}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='Tab'
                component={BottomTabs}
                options={{
                    headerShown:false
                }}
            />
            
        </Stack.Navigator>
    )
}

export default StackNavigation

