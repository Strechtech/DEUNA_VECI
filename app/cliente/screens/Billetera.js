import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Billetera = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <LinearGradient colors={['#3A0F9E', '#6C3CE1']} style={styles.header}>
        <Text style={styles.headerTitle}>Billetera</Text>
        <View style={styles.balanceBox}>
          <Text style={styles.balLabel}>Saldo de ejemplo</Text>
          <Text style={styles.balAmount}>$30.00</Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.emptyState}>
          <Ionicons name="wallet-outline" size={60} color="#C4B5FD" />
          <Text style={styles.emptyTitle}>Sin movimientos</Text>
          <Text style={styles.emptySub}>Tus movimientos aparecerán cuando se conecten los pagos.</Text>
          <Text style={styles.demoNote}>No se realizan transacciones reales en esta versión.</Text>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.payButton}
            onPress={() => navigation.navigate('Escanear')}
          >
            <Ionicons name="qr-code-outline" size={18} color="#fff" />
            <Text style={styles.payButtonText}>Ver pago de demostración</Text>
          </TouchableOpacity>
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
  emptySub: { fontSize: 13, color: '#77717F', textAlign: 'center', lineHeight: 19, paddingHorizontal: 25 },
  demoNote: { fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 3, paddingHorizontal: 25 },
  payButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#6C3CE1', borderRadius: 12, paddingHorizontal: 16,
    paddingVertical: 12, marginTop: 13,
  },
  payButtonText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});