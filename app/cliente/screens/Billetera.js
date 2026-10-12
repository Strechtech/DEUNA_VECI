import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export const Billetera = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <LinearGradient colors={['#3A0F9E', '#6C3CE1']} style={styles.header}>
        <Text style={styles.headerTitle}>Billetera</Text>
        <View style={styles.balanceBox}>
          <Text style={styles.balLabel}>Saldo disponible</Text>
          <Text style={styles.balAmount}>$30.00</Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.emptyState}>
          <Ionicons name="wallet-outline" size={60} color="#C4B5FD" />
          <Text style={styles.emptyTitle}>Sin movimientos</Text>
          <Text style={styles.emptySub}>Aquí aparecerán tus transacciones</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F7FF' },
  header: { paddingTop: 54, paddingHorizontal: 24, paddingBottom: 30 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 20 },
  balanceBox: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 18 },
  balLabel: { color: '#E0D6FF', fontSize: 13, marginBottom: 6 },
  balAmount: { color: '#fff', fontSize: 34, fontWeight: '800' },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyState: { alignItems: 'center', gap: 10 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#6C3CE1' },
  emptySub: { fontSize: 13, color: '#9CA3AF' },
});