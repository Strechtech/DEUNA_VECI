import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export const LoginScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#351078', '#5F14CC']} style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Image
          source={require('../../assets/Images/deunaletras.png')}
          resizeMode="contain"
          style={styles.logo}
        />

        <View style={styles.hero}>
          <View style={styles.orbit}>
            <View style={styles.storeIcon}>
              <Ionicons name="storefront" size={42} color="#351078" />
            </View>
            <View style={styles.neighborhoodIcon}>
              <Ionicons name="heart" size={17} color="#fff" />
            </View>
          </View>
          <Text style={styles.title}>Tu barrio,{'\n'}más cerca.</Text>
          <Text style={styles.description}>
            Paga en tus tiendas y descubre los beneficios de Mi Veci.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('HomeNav')}
          >
            <Text style={styles.buttonText}>Entrar</Text>
            <Ionicons name="arrow-forward" size={19} color="#351078" />
          </TouchableOpacity>
          <Text style={styles.note}>Prototipo de demostración · sin pagos reales</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 66, paddingBottom: 34, justifyContent: 'space-between' },
  logo: { width: 150, height: 64, alignSelf: 'center', tintColor: '#fff' },
  hero: { alignItems: 'center', marginTop: -10 },
  orbit: {
    width: 188, height: 188, borderRadius: 94,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.24)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 28,
  },
  storeIcon: {
    width: 116, height: 116, borderRadius: 38,
    backgroundColor: '#C7F0DD', alignItems: 'center', justifyContent: 'center',
    transform: [{ rotate: '-6deg' }],
  },
  neighborhoodIcon: {
    position: 'absolute', right: 9, bottom: 14,
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#57B993', alignItems: 'center', justifyContent: 'center',
  },
  title: { color: '#fff', fontSize: 38, lineHeight: 43, fontWeight: '700', textAlign: 'center' },
  description: {
    color: '#E0D6F0', fontSize: 15, lineHeight: 23,
    textAlign: 'center', marginTop: 13, maxWidth: 285,
  },
  footer: { alignItems: 'center' },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#C7F0DD', borderRadius: 15, paddingVertical: 16,
    width: '100%',
  },
  buttonText: { color: '#351078', fontSize: 16, fontWeight: '700' },
  note: { color: '#C8B1F2', fontSize: 11, marginTop: 13 },
});
