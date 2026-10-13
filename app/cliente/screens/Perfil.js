import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Perfil = ({ navigation }) => {
  const switchProfile = () => navigation.getParent()?.getParent()?.navigate('HomeScreen');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#351078', '#5F14CC']} style={styles.header}>
        <Text style={styles.eyebrow}>DEUNA! · MI BARRIO</Text>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color="#5F14CC" />
        </View>
        <Text style={styles.name}>Karina López</Text>
        <Text style={styles.email}>karina@email.com</Text>
        <View style={styles.levelPill}>
          <Ionicons name="trophy" size={14} color="#F8C65A" />
          <Text style={styles.levelText}>Cliente Mi Veci</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={19} color="#5F14CC" />
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Nombre</Text>
              <Text style={styles.infoValue}>Karina López</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={19} color="#5F14CC" />
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Correo</Text>
              <Text style={styles.infoValue}>karina@email.com</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          style={styles.switchButton}
          activeOpacity={0.85}
          onPress={switchProfile}
        >
          <Ionicons name="swap-horizontal-outline" size={20} color="#5F14CC" />
          <Text style={styles.switchText}>Cambiar tipo de usuario</Text>
          <Ionicons name="chevron-forward" size={18} color="#91899D" />
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          Perfil de demostración. La edición de datos y configuración todavía no están disponibles.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F5FA' },
  header: { paddingTop: 55, paddingBottom: 30, alignItems: 'center' },
  eyebrow: { color: '#C8B1F2', fontSize: 10, fontWeight: '700', letterSpacing: 1.2, marginBottom: 19 },
  avatar: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: '#F0E9FC', alignItems: 'center', justifyContent: 'center', marginBottom: 11,
  },
  name: { color: '#fff', fontSize: 20, fontWeight: '700' },
  email: { color: '#D8C8F5', fontSize: 13, marginTop: 4 },
  levelPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20,
    paddingHorizontal: 13, paddingVertical: 6, marginTop: 13,
  },
  levelText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  content: { padding: 18 },
  infoCard: { backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  infoCopy: { marginLeft: 12 },
  infoLabel: { color: '#827C8A', fontSize: 11 },
  infoValue: { color: '#26212F', fontSize: 14, fontWeight: '600', marginTop: 3 },
  divider: { height: 1, backgroundColor: '#F0EDF3' },
  switchButton: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderRadius: 15, padding: 15, marginTop: 12,
  },
  switchText: { flex: 1, color: '#26212F', fontSize: 14, fontWeight: '600' },
  disclaimer: { color: '#827C8A', fontSize: 11, lineHeight: 17, marginHorizontal: 3, marginTop: 16 },
});
