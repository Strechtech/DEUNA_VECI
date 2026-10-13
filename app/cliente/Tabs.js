import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Inicio } from './screens/Inicio';
import { Beneficios } from './screens/Beneficios';
import { Escanear } from './screens/Escanear';
import { Billetera } from './screens/Billetera';
import { Perfil } from './screens/Perfil';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6C3CE1',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Inicio: focused ? 'home' : 'home-outline',
            Beneficios: focused ? 'gift' : 'gift-outline',
            Escanear: focused ? 'qr-code' : 'qr-code-outline',
            Billetera: focused ? 'wallet' : 'wallet-outline',
            Perfil: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Beneficios" component={Beneficios} />
      <Tab.Screen
        name="Escanear"
        component={Escanear}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.scanBtn}>
              <Ionicons name="qr-code" size={26} color="#fff" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Billetera" component={Billetera} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scanBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C3CE1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#6C3CE1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});