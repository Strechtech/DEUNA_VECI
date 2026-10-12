import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LoginScreen } from './app/login';
import { HomeNavigation } from './app/homeNavigation';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginNavigation" component={LoginScreen}   options={{ headerShown: false }}/>
        <Stack.Screen name="HomeNav" component={HomeNavigation}   options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}