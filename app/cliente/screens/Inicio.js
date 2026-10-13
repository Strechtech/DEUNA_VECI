import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const SHORTCUTS = [
  { label: 'Mis beneficios', detail: 'Premios en tus tiendas', icon: 'gift-outline', screen: 'Beneficios' },
  { label: 'Movimientos', detail: 'Consulta tu billetera', icon: 'wallet-outline', screen: 'Billetera' },
];

export const Inicio = ({ navigation }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#351078', '#5F14CC']} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.eyebrow}>DEUNA! · MI BARRIO</Text>
            <Text style={styles.greeting}>Hola, Karina</Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ver mi perfil"
            style={styles.profileButton}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Ionicons name="person-outline" size={21} color="#351078" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Saldo de ejemplo</Text>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
              onPress={() => setShowBalance(!showBalance)}
            >
              <Ionicons
                name={showBalance ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#E5D9FF"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>{showBalance ? '$30.00' : '••••••'}</Text>
          <Text style={styles.balanceNote}>Monto de demostración · no disponible para pagos</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.payCard}
          activeOpacity={0.88}
          onPress={() => navigation.navigate('Escanear')}
        >
          <View style={styles.payIcon}>
            <Ionicons name="qr-code-outline" size={25} color="#351078" />
          </View>
          <View style={styles.payCopy}>
            <Text style={styles.payTitle}>Paga en tu tienda</Text>
            <Text style={styles.payDescription}>Abre el flujo de pago de demostración</Text>
          </View>
          <Ionicons name="arrow-forward" size={19} color="#351078" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Lo que necesitas</Text>
        <View style={styles.shortcuts}>
          {SHORTCUTS.map((shortcut) => (
            <TouchableOpacity
              key={shortcut.screen}
              accessibilityRole="button"
              style={styles.shortcut}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(shortcut.screen)}
            >
              <View style={styles.shortcutIcon}>
                <Ionicons name={shortcut.icon} size={21} color="#5F14CC" />
              </View>
              <View style={styles.shortcutCopy}>
                <Text style={styles.shortcutTitle}>{shortcut.label}</Text>
                <Text style={styles.shortcutDetail}>{shortcut.detail}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#91899D" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.neighborhoodCard}>
          <View style={styles.neighborhoodMark}>
            <Ionicons name="storefront-outline" size={20} color="#16795C" />
          </View>
          <View style={styles.neighborhoodCopy}>
            <Text style={styles.neighborhoodTitle}>Compra cerca. Gana beneficios.</Text>
            <Text style={styles.neighborhoodDetail}>
              Revisa tus avances en los comercios de Mi Veci.
            </Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ver beneficios"
            onPress={() => navigation.navigate('Beneficios')}
          >
            <Ionicons name="arrow-forward-circle" size={27} color="#16795C" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F5FA' },
  header: { paddingTop: 54, paddingHorizontal: 22, paddingBottom: 30 },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  eyebrow: { color: '#C8B1F2', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  greeting: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 5 },
  profileButton: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#F0E9FC', alignItems: 'center', justifyContent: 'center',
  },
  balanceCard: {
    borderRadius: 18, padding: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)',
  },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { color: '#E5D9FF', fontSize: 13 },
  balanceAmount: { color: '#fff', fontSize: 34, fontWeight: '700', marginTop: 5 },
  balanceNote: { color: '#D8C8F5', fontSize: 12, marginTop: 5 },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 18, paddingTop: 20 },
  payCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#D9F4E9', borderRadius: 17, padding: 16,
  },
  payIcon: {
    width: 46, height: 46, borderRadius: 14,
    backgroundColor: '#B7E8D4', alignItems: 'center', justifyContent: 'center',
  },
  payCopy: { flex: 1, marginHorizontal: 12 },
  payTitle: { color: '#173D30', fontSize: 15, fontWeight: '700' },
  payDescription: { color: '#477563', fontSize: 11, marginTop: 4 },
  sectionTitle: { color: '#26212F', fontSize: 17, fontWeight: '700', marginTop: 27, marginBottom: 11 },
  shortcuts: { gap: 9 },
  shortcut: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 15, padding: 13,
  },
  shortcutIcon: {
    width: 42, height: 42, borderRadius: 13,
    backgroundColor: '#F0E9FC', alignItems: 'center', justifyContent: 'center',
  },
  shortcutCopy: { flex: 1, marginLeft: 12 },
  shortcutTitle: { color: '#26212F', fontSize: 14, fontWeight: '600' },
  shortcutDetail: { color: '#827C8A', fontSize: 11, marginTop: 3 },
  neighborhoodCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 17, padding: 14, marginTop: 22,
    borderLeftWidth: 3, borderLeftColor: '#57B993',
  },
  neighborhoodMark: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#E1F4EC', alignItems: 'center', justifyContent: 'center',
  },
  neighborhoodCopy: { flex: 1, marginHorizontal: 11 },
  neighborhoodTitle: { color: '#26212F', fontSize: 13, fontWeight: '700' },
  neighborhoodDetail: { color: '#827C8A', fontSize: 11, lineHeight: 16, marginTop: 3 },
  bottomSpace: { height: 24 },
});
