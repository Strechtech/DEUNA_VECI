import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ACTIONS = [
  { icon: 'swap-horizontal', label: 'Transferir', screen: null },
  { icon: 'business',        label: 'Otro banco', screen: null },
  { icon: 'reload',          label: 'Recargar',   screen: null },
  { icon: 'cash',            label: 'Retirar',    screen: null },
  { icon: 'phone-portrait',  label: 'Celular',    screen: null },
  { icon: 'construct',       label: 'Servicios',  screen: null },
  { icon: 'train',           label: 'Metro',      screen: null },
  { icon: 'people',          label: 'Jóvenes',    screen: null },
  { icon: 'bag-handle',      label: 'Tienda',     screen: null },
  { icon: 'storefront',      label: 'Mi Veci',    screen: 'Beneficios', isNew: true },
];

const PROMOS = [
  { id: '1', title: '¡Gana premios semanales!', sub: 'Usa tu app y participa', bg: ['#4A1FA8', '#6C3CE1'] },
  { id: '2', title: 'Renueva tu look', sub: 'Descuentos exclusivos',          bg: ['#1FA87E', '#34D399'] },
];

export const Inicio = ({ navigation }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* ── HEADER ── */}
      <LinearGradient colors={['#3A0F9E', '#6C3CE1']} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={20} color="#6C3CE1" />
            </View>
            <Text style={styles.greeting}>Hola Karina</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="help-circle-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Tu saldo disponible</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Ionicons
                name={showBalance ? 'eye-off-outline' : 'eye-outline'}
                size={20} color="#ccc"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {showBalance ? '$30.00' : '••••••'}
          </Text>
          <View style={styles.rechargeRow}>
            <View style={styles.dot} />
            <Text style={styles.rechargeText}>Recargar desde tu cuenta de banco</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {/* ── ACCIONES ── */}
        <View style={styles.actionsGrid}>
          {ACTIONS.map((a, i) => (
            <TouchableOpacity
              key={i}
              style={styles.actionItem}
              onPress={() => a.screen && navigation.navigate(a.screen)}
            >
              {a.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NUEVO</Text>
                </View>
              )}
              <View style={styles.actionCircle}>
                <Ionicons name={a.icon} size={22} color="#6C3CE1" />
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── PROMOCIONES ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis promociones</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {PROMOS.map(p => (
              <LinearGradient key={p.id} colors={p.bg} style={styles.promoCard}>
                <View style={styles.promoIcon}>
                  <Ionicons name="gift" size={36} color="#fff" style={{ opacity: 0.3 }} />
                </View>
                <Text style={styles.promoTitle}>{p.title}</Text>
                <Text style={styles.promoSub}>{p.sub}</Text>
              </LinearGradient>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F0FF' },

  /* header */
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 30 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#E8E0FF', alignItems: 'center', justifyContent: 'center' },
  greeting: { color: '#fff', fontSize: 17, fontWeight: '600' },
  headerIcons: { flexDirection: 'row', gap: 8 },
  iconBtn: { padding: 4 },

  /* balance card */
  balanceCard: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: 18 },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { color: '#E0D6FF', fontSize: 13 },
  balanceAmount: { color: '#fff', fontSize: 34, fontWeight: '700', marginTop: 6 },
  rechargeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A78BFA' },
  rechargeText: { color: '#E0D6FF', fontSize: 12 },

  /* actions grid */
  actionsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    backgroundColor: '#fff', marginHorizontal: 16, marginTop: -20,
    borderRadius: 20, padding: 16, elevation: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12,
  },
  actionItem: { width: '20%', alignItems: 'center', marginBottom: 16, position: 'relative' },
  actionCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#F0EBFF', alignItems: 'center', justifyContent: 'center',
  },
  actionLabel: { fontSize: 10, color: '#444', marginTop: 6, textAlign: 'center' },
  newBadge: {
    position: 'absolute', top: -4, right: 2, zIndex: 1,
    backgroundColor: '#10B981', paddingHorizontal: 4, paddingVertical: 1,
    borderRadius: 6,
  },
  newBadgeText: { color: '#fff', fontSize: 7, fontWeight: '700' },

  /* promos */
  body: { flex: 1 },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1E1B4B' },
  seeAll: { fontSize: 13, color: '#6C3CE1', fontWeight: '600' },
  promoCard: {
    width: 220, height: 110, borderRadius: 18,
    marginRight: 12, padding: 16, justifyContent: 'flex-end', overflow: 'hidden',
  },
  promoIcon: { position: 'absolute', right: 10, top: 10 },
  promoTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
  promoSub: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 },
});