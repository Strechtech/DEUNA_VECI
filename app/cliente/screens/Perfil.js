import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const MENU = [
  { icon: 'person-outline',      label: 'Mis datos' },
  { icon: 'lock-closed-outline', label: 'Seguridad' },
  { icon: 'card-outline',        label: 'Métodos de pago' },
  { icon: 'help-circle-outline', label: 'Ayuda y soporte' },
  { icon: 'log-out-outline',     label: 'Cerrar sesión', danger: true },
];

export const Perfil = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <LinearGradient colors={['#3A0F9E', '#6C3CE1']} style={styles.header}>
        <View style={styles.avatarBig}>
          <Ionicons name="person" size={40} color="#6C3CE1" />
        </View>
        <Text style={styles.name}>Karina López</Text>
        <Text style={styles.email}>karina@email.com</Text>
        <View style={styles.levelPill}>
          <Ionicons name="trophy" size={14} color="#F59E0B" />
          <Text style={styles.levelText}>Nivel Gold</Text>
        </View>
      </LinearGradient>

      <View style={styles.menu}>
        {MENU.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <View style={[styles.menuIcon, item.danger && styles.menuIconDanger]}>
              <Ionicons
                name={item.icon} size={20}
                color={item.danger ? '#EF4444' : '#6C3CE1'}
              />
            </View>
            <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
              {item.label}
            </Text>
            {!item.danger && <Ionicons name="chevron-forward" size={18} color="#ccc" />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F7FF' },

  header: { paddingTop: 54, paddingBottom: 30, alignItems: 'center' },
  avatarBig: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#E8E0FF', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  name: { color: '#fff', fontSize: 20, fontWeight: '700' },
  email: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  levelPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 5, marginTop: 12,
  },
  levelText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  menu: { paddingHorizontal: 16, marginTop: 20, gap: 8 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05,
  },
  menuIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#EDE9FF', alignItems: 'center', justifyContent: 'center' },
  menuIconDanger: { backgroundColor: '#FEE2E2' },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: '#1E1B4B' },
  menuLabelDanger: { color: '#EF4444' },
});