import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CodigoPago = ({ navigation }) => {
  const spin = useRef(new Animated.Value(0)).current;
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 1200, useNativeDriver: true })
    ).start();
  }, []);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Transacción</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="help-circle-outline" size={24} color="#6C3CE1" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>

        {/* SPINNER */}
        <View style={styles.spinnerContainer}>
          <View style={styles.spinnerBg}>
            <Animated.View style={[styles.spinnerRing, { transform: [{ rotate }] }]} />
            <View style={styles.spinnerInner}>
              <Ionicons name="sync" size={32} color="#6C3CE1" />
            </View>
          </View>
          <Text style={styles.processingText}>PROCESANDO</Text>
        </View>

        {/* TÍTULO */}
        <Text style={styles.title}>Tu pago está en camino</Text>
        <Text style={styles.subtitle}>
          Estamos verificando los detalles de seguridad{'\n'}
          para asegurar que tu dinero llegue a salvo.
        </Text>

        {/* OPCIONES */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setSelectedOption(selectedOption === 'store' ? null : 'store')}
            activeOpacity={0.7}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIconBox}>
                <Ionicons name="business-outline" size={20} color="#6C3CE1" />
              </View>
              <View>
                <Text style={styles.optionText}>Usar crédito de la tienda</Text>
                <Text style={styles.optionBalance}>
                  Disponible: <Text style={styles.optionBalanceAmount}>$12.50</Text>
                </Text>
              </View>
            </View>
            <View style={[styles.radio, selectedOption === 'store' && styles.radioSelected]}>
              {selectedOption === 'store' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setSelectedOption(selectedOption === 'red' ? null : 'red')}
            activeOpacity={0.7}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIconBox}>
                <Ionicons name="grid-outline" size={20} color="#6C3CE1" />
              </View>
              <Text style={styles.optionText}>Usar código red deuna</Text>
            </View>
            <View style={[styles.radio, selectedOption === 'red' && styles.radioSelected]}>
              {selectedOption === 'red' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* BOTÓN COMPLETAR */}
        <TouchableOpacity style={styles.completeBtn} activeOpacity={0.85}>
          <Text style={styles.completeBtnText}>Completar compra 🛒</Text>
        </TouchableOpacity>

        {/* SEGURIDAD */}
        <View style={styles.securityRow}>
          <Ionicons name="shield-checkmark-outline" size={13} color="#9CA3AF" />
          <Text style={styles.securityText}>
            TRANSACCIÓN PROTEGIDA POR ETHEREAL VAULT
          </Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F7FF' },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 54, paddingHorizontal: 16, paddingBottom: 12,
    backgroundColor: '#fff',
    elevation: 1, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  topTitle: { fontSize: 17, fontWeight: '600', color: '#1E1B4B' },

  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32, alignItems: 'center' },

  spinnerContainer: { alignItems: 'center', marginBottom: 24 },
  spinnerBg: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    elevation: 6, shadowColor: '#6C3CE1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12,
  },
  spinnerRing: {
    position: 'absolute', width: 84, height: 84, borderRadius: 42,
    borderWidth: 3, borderColor: 'transparent',
    borderTopColor: '#4EEABC', borderRightColor: '#6C3CE1',
  },
  spinnerInner: { alignItems: 'center', justifyContent: 'center' },
  processingText: {
    marginTop: 10, fontSize: 11, fontWeight: '700',
    color: '#9CA3AF', letterSpacing: 2,
  },

  title: {
    fontSize: 22, fontWeight: '800',
    color: '#1E1B4B', textAlign: 'center', marginBottom: 8,
  },
  subtitle: {
    fontSize: 13, color: '#6B7280',
    textAlign: 'center', lineHeight: 20, marginBottom: 20,
  },

  optionsContainer: {
    width: '100%', backgroundColor: '#fff',
    borderRadius: 16, paddingHorizontal: 16, marginBottom: 16,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 6,
  },
  optionRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 14,
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  optionIconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#EDE9FF',
    alignItems: 'center', justifyContent: 'center',
  },
  optionText: { fontSize: 14, fontWeight: '600', color: '#1E1B4B' },
  optionBalance: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  optionBalanceAmount: { color: '#6C3CE1', fontWeight: '700' },

  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: '#D1D5DB',
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: '#6C3CE1' },
  radioInner: {
    width: 11, height: 11, borderRadius: 6,
    backgroundColor: '#6C3CE1',
  },

  divider: { height: 1, backgroundColor: '#F3F4F6' },

  completeBtn: {
    width: '100%', backgroundColor: '#6C3CE1',
    borderRadius: 16, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    elevation: 4, shadowColor: '#6C3CE1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 10,
  },
  completeBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },

  securityRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  securityText: {
    fontSize: 10, color: '#9CA3AF',
    letterSpacing: 0.8, fontWeight: '600',
  },
});
