import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAVORITOS = [
  {
    id: '1',
    name: 'Panadería El\nTrigall',
    meta: 'Favorito desde 2023',
    saldo: '$15.00',
    progress: 3,
    total: 5,
    level: 'PLATA',
    levelColor: '#9CA3AF',
    levelBg: '#F9FAFB',
    nextLevel: 'ORO',
    progressColor: '#9CA3AF',
    progressDesc: 'Te faltan 3 compras más para alcanzar el siguiente nivel.',
    icon: 'storefront',
    iconBg: '#FEF3C720',
    iconColor: '#F59E0B',
  },
  {
    id: '2',
    name: 'Café de la\nEsquina',
    meta: 'Cliente frecuente',
    saldo: '$32.50',
    progress: 8,
    total: 10,
    level: 'ORO',
    levelColor: '#F59E0B',
    levelBg: '#FFFBF0',
    nextLevel: 'PLATINUM',
    progressColor: '#F59E0B',
    progressDesc: '¡Solo 2 compras más para convertirte en Platinum!',
    icon: 'cafe',
    iconBg: '#6C3CE120',
    iconColor: '#6C3CE1',
  },
];

export const Beneficios = ({ navigation }) => {
  const [activeId, setActiveId] = useState(null);

  const activeFav = FAVORITOS.find(f => f.id === activeId);

  const handleSelect = (id) => {
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={16} color="#6C3CE1" />
        </View>
        <Text style={styles.topTitle}>Rewards</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#6C3CE1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {/* MIS FAVORITOS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Favoritos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>VER TODOS</Text>
            </TouchableOpacity>
          </View>

          {FAVORITOS.map(f => {
            const isActive = activeId === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.favCard, isActive && styles.favCardActive]}
                onPress={() => handleSelect(f.id)}
                activeOpacity={0.85}
              >
                <View style={[styles.favIcon, { backgroundColor: f.iconBg }]}>
                  <Ionicons name={f.icon} size={22} color={f.iconColor} />
                </View>

                {/* Solo nombre, badge y meta — sin progress */}
                <View style={styles.favMid}>
                  <Text style={styles.favName}>{f.name}</Text>
                  <View style={[styles.levelBadge, { borderColor: f.levelColor, backgroundColor: f.levelBg }]}>
                    <Text style={[styles.levelText, { color: f.levelColor }]}>{f.level}</Text>
                  </View>
                  <Text style={styles.favMeta}>{f.meta}</Text>
                </View>

                <View style={styles.favRight}>
                  <Text style={styles.saldoLabel}>SALDO</Text>
                  <Text style={styles.saldoValue}>{f.saldo}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ESTADO ACTUAL — solo aparece si hay una card seleccionada */}
        {activeFav && (
          <View style={styles.nivelCard}>
            <Text style={styles.nivelEstado}>Estado actual en</Text>
            <View style={styles.nivelTop}>
              <Text style={styles.nivelNombre}>{activeFav.name.replace('\n', ' ')}</Text>
              <View style={styles.nivelTrophy}>
                <Ionicons name="person-circle" size={22} color="#6C3CE1" />
              </View>
            </View>
            <View style={styles.nivelBarRow}>
              <Text style={styles.nivelBarLbl}>NIVEL {activeFav.level}</Text>
              <Text style={styles.nivelBarNxt}>SIGUIENTE: {activeFav.nextLevel}</Text>
            </View>
            <View style={styles.nivelBg}>
              <View
                style={[styles.nivelFill, {
                  width: `${(activeFav.progress / activeFav.total) * 100}%`,
                  backgroundColor: activeFav.progressColor,
                }]}
              />
            </View>
            <Text style={styles.nivelSub}>{activeFav.progressDesc}</Text>
          </View>
        )}

        {/* RED TIENDAS */}
        <View style={styles.redSection}>
          <Text style={styles.redTitle}>Red Tiendas DeUna</Text>
          <Text style={styles.redSub}>Saldo disponible para red: $10.00</Text>

          <View style={styles.mapBox}>
            <Text style={styles.mapLabel}>eMop</Text>
            <View style={styles.mapPins}>
              <View style={styles.pinRow}>
                <View style={styles.pinDot}>
                  <Ionicons name="location" size={12} color="#fff" />
                </View>
                <Text style={styles.pinName}>TRIGALL</Text>
              </View>
              <View style={styles.pinLine} />
              <View style={styles.pinRow}>
                <View style={[styles.pinDot, styles.pinDotLight]}>
                  <Ionicons name="location" size={12} color="#fff" />
                </View>
                <Text style={[styles.pinName, { color: '#C4B5F4' }]}>ESQUINA</Text>
              </View>
            </View>

            <View style={styles.cercaBadge}>
              <View style={styles.cercaIcon}>
                <Ionicons name="navigate" size={12} color="#fff" />
              </View>
              <View>
                <Text style={styles.cercaTitle}>CERCA DE TI</Text>
                <Text style={styles.cercaText}>12 tiendas disponibles ahora</Text>
              </View>
              <TouchableOpacity style={styles.explorarBtn}>
                <Text style={styles.explorarText}>EXPLORAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F5FF' },

  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 54, paddingHorizontal: 20, paddingBottom: 12,
    backgroundColor: '#F7F5FF',
  },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#EDE9FF', alignItems: 'center', justifyContent: 'center',
  },
  topTitle: { fontSize: 13, color: '#aaa', fontWeight: '600' },

  body: { flex: 1 },

  section: { paddingHorizontal: 16, marginTop: 4 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: '#1a1a2e' },
  seeAll: { fontSize: 12, color: '#6C3CE1', fontWeight: '700' },

  /* FAV CARD — compacta, sin progress */
  favCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 18, padding: 12,
    marginBottom: 8, borderWidth: 0.5, borderColor: '#ece8fb',
  },
  favCardActive: { borderColor: '#6C3CE1', borderWidth: 1.5 },
  favIcon: {
    width: 46, height: 46, borderRadius: 23,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  favMid: { flex: 1 },
  favName: { fontSize: 13, fontWeight: '700', color: '#1a1a2e', lineHeight: 18 },
  levelBadge: {
    alignSelf: 'flex-start', borderWidth: 1, borderRadius: 6,
    paddingHorizontal: 7, paddingVertical: 2, marginTop: 4,
  },
  levelText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  favMeta: { fontSize: 10, color: '#bbb', marginTop: 3 },
  favRight: { alignItems: 'flex-end', flexShrink: 0 },
  saldoLabel: { fontSize: 9, color: '#bbb', fontWeight: '600', letterSpacing: 0.5 },
  saldoValue: { fontSize: 17, fontWeight: '700', color: '#1a1a2e' },

  /* NIVEL — se renderiza debajo de las cards al seleccionar */
  nivelCard: {
    backgroundColor: '#EEEAFB', borderRadius: 18,
    padding: 16, marginHorizontal: 16, marginTop: 4, marginBottom: 4,
  },
  nivelEstado: { fontSize: 9, color: '#aaa', fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  nivelTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  nivelNombre: { fontSize: 18, fontWeight: '800', color: '#3A0F9E' },
  nivelTrophy: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#6C3CE1', alignItems: 'center', justifyContent: 'center',
  },
  nivelBarRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6,
  },
  nivelBarLbl: { fontSize: 10, color: '#aaa', fontWeight: '600' },
  nivelBarNxt: { fontSize: 10, color: '#6C3CE1', fontWeight: '700' },
  nivelBg: {
    height: 5, backgroundColor: '#D8D0F5',
    borderRadius: 3, overflow: 'hidden', marginBottom: 8,
  },
  nivelFill: { height: 5, borderRadius: 3 },
  nivelSub: { fontSize: 11, color: '#888', lineHeight: 16 },

  /* RED TIENDAS */
  redSection: { paddingHorizontal: 16, marginTop: 16 },
  redTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a2e', marginBottom: 2 },
  redSub: { fontSize: 11, color: '#aaa', marginBottom: 10 },
  mapBox: { backgroundColor: '#EDE9FB', borderRadius: 16, padding: 12, minHeight: 120 },
  mapLabel: { fontSize: 9, color: '#aaa', fontWeight: '600', letterSpacing: 0.5, marginBottom: 10 },
  mapPins: { paddingLeft: 10, marginBottom: 8 },
  pinRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pinDot: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#6C3CE1', alignItems: 'center', justifyContent: 'center',
  },
  pinDotLight: { backgroundColor: '#C4B5F4' },
  pinLine: { width: 1, height: 14, backgroundColor: '#C4B5F4', marginLeft: 10, marginVertical: 4 },
  pinName: { fontSize: 10, fontWeight: '700', color: '#6C3CE1', letterSpacing: 0.5 },
  cercaBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fff', borderRadius: 20, padding: 8, marginTop: 8,
  },
  cercaIcon: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#6C3CE1', alignItems: 'center', justifyContent: 'center',
  },
  cercaTitle: { fontSize: 9, fontWeight: '700', color: '#555' },
  cercaText: { fontSize: 9, color: '#aaa' },
  explorarBtn: {
    marginLeft: 'auto', backgroundColor: '#6C3CE1',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7,
  },
  explorarText: { color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

  /* TAB BAR */
  tabBar: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderTopWidth: 0.5, borderTopColor: '#ece8fb',
    paddingVertical: 10, paddingBottom: 24,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: '#ccc', fontWeight: '600' },
  tabActivePill: {
    backgroundColor: '#6C3CE1', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    alignItems: 'center', gap: 2,
  },
  tabActiveLabel: { fontSize: 9, color: '#fff', fontWeight: '700' },
});