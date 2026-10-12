import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Escanear = ({ navigation }) => {
  const scanLine = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(scanLine, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const scanLineTranslate = scanLine.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Escanear QR</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="flashlight-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* CÁMARA SIMULADA */}
      <View style={styles.cameraArea}>

        {/* OVERLAY OSCURO SUPERIOR */}
        <View style={[styles.overlay, { top: 0 }]} />

        {/* MARCO QR */}
        <View style={styles.qrFrame}>
          {/* Esquinas */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          {/* Línea de escaneo animada */}
          <Animated.View
            style={[styles.scanLine, { transform: [{ translateY: scanLineTranslate }] }]}
          />
        </View>

        {/* OVERLAY OSCURO INFERIOR */}
        <View style={[styles.overlay, { bottom: 0 }]} />
      </View>

      {/* BOTTOM SECTION */}
      <View style={styles.bottom}>
        <Text style={styles.hint}>
          Escanea un QR de una! para hacer{'\n'}pagos, retiros o verificaciones
        </Text>

        <TouchableOpacity
          style={styles.codeBtn}
          onPress={() => navigation.navigate('CodigoPago')}
        >
          <Ionicons name="keypad" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.codeBtnText}>Código único de pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 54, paddingHorizontal: 16, paddingBottom: 12,
    zIndex: 10,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#fff', fontSize: 17, fontWeight: '600' },

  /* cámara */
  cameraArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  overlay: {
    position: 'absolute', left: 0, right: 0, height: '25%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  qrFrame: {
    width: 230, height: 230,
    position: 'relative',
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },

  corner: {
    position: 'absolute',
    width: 36, height: 36,
    borderColor: '#4EEABC',
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 6 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 6 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 6 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 6 },

  scanLine: {
    width: '100%', height: 2,
    backgroundColor: '#4EEABC',
    shadowColor: '#4EEABC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },

  /* bottom */
  bottom: {
    backgroundColor: '#111', paddingBottom: 40,
    paddingTop: 28, alignItems: 'center', paddingHorizontal: 30,
  },
  hint: { color: '#aaa', fontSize: 13, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  codeBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#6C3CE1',
    paddingHorizontal: 28, paddingVertical: 14,
    borderRadius: 30, elevation: 4,
    shadowColor: '#6C3CE1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8,
  },
  codeBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});