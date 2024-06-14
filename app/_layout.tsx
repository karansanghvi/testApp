import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../app/index";
import YoungScreen from "../app/YoungScreen"; 
import VirtualTryScreen from "./VirtualTryScreen";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen 
        name="index" 
        component={Index}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="YoungScreen"
        component={YoungScreen} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="VirtualTryScreen"
        component={VirtualTryScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
