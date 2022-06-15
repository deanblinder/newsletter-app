import React from "react";
import {NativeBaseProvider} from 'native-base';
import MainPage from "./src/mainPage";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ArticlePage from "./src/articlePage";

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={MainPage}/>
          <Stack.Screen name='ArticlePage' component={ArticlePage}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
