import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login"
import BottomTabs from "../navigation/BottomTabs"
import Register from "../screens/Register";
import Auth from "../screens/Auth"

const Stack = createNativeStackNavigator();
//El primer Stack.Screen  es Auth, xq ahi se va a fijar si el usuario ya esta logueado o no. Si no esta logueado, 
//Se abre directamente LogIn , caso contrario, redirecciona automaticamente a Tab con this.props.navigation.navigate('Tab')
function StackNavigation() {
    return(
        <Stack.Navigator>


            <Stack.Screen 
                name="Auth" 
                component={Auth} 
                options={{ headerShown: false }} 
            />


            
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown:false
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

           


            
            
        </Stack.Navigator>
    )
}

export default StackNavigation

