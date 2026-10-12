import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import { CodigoPago } from './screens/CodigoPago';

const Stack = createNativeStackNavigator();

export const ClienteNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={Tabs} />
      <Stack.Screen name="CodigoPago" component={CodigoPago} />
    </Stack.Navigator>
  );
};
