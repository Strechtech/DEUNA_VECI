import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SHOPS } from '../rewards/RewardsContext';

let cameraModule;

const getCameraModule = () => {
  if (!cameraModule) {
    cameraModule = require('expo-camera');
  }
  return cameraModule;
};

export const Escanear = ({ navigation }) => {
  const { CameraView, useCameraPermissions } = getCameraModule();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanError, setScanError] = useState('');
  const scanned = useRef(false);
  const errorTimeout = useRef(null);

  useEffect(() => () => {
    if (errorTimeout.current) clearTimeout(errorTimeout.current);
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    if (scanned.current) return;
    const shop = SHOPS.find((item) => item.qrValue === data.trim());
    if (!shop) {
      scanned.current = true;
      setScanError('Este QR no pertenece a un comercio Mi Veci.');
      errorTimeout.current = setTimeout(() => {
        scanned.current = false;
        setScanError('');
      }, 2200);
      return;
    }
    scanned.current = true;
    navigation.navigate('CodigoPago', { shopId: shop.id });
  };

  if (!permission) {
    return (
      <View style={styles.permissionState}>
        <ActivityIndicator color="#5F14CC" />
        <Text style={styles.permissionText}>Preparando la cámara…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionState}>
        <View style={styles.permissionIcon}>
          <Ionicons name="camera-outline" size={34} color="#5F14CC" />
        </View>
        <Text style={styles.permissionTitle}>Escanea el QR del local</Text>
        <Text style={styles.permissionText}>
          Necesitamos acceso a la cámara para leer el código Mi Veci del comercio.
        </Text>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Permitir cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Volver al inicio"
            style={styles.backButton}
            onPress={() => navigation.navigate('Inicio')}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Escanea el QR del local</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.scanArea}>
          <View style={styles.frame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            <Ionicons name="qr-code-outline" size={118} color="rgba(255,255,255,0.48)" />
          </View>
          <Text style={styles.hint}>Centra el código dentro del marco</Text>
          {scanError ? <Text style={styles.error}>{scanError}</Text> : null}
        </View>

        <View style={styles.bottomNote}>
          <Ionicons name="information-circle-outline" size={18} color="#E4D6FF" />
          <Text style={styles.bottomNoteText}>
            Escanea el QR Mi Veci que muestra el comercio. Pago de demostración, sin cargos reales.
          </Text>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#100C16' },
  camera: { flex: 1 },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 54, paddingHorizontal: 14, paddingBottom: 12,
    backgroundColor: 'rgba(16,12,22,0.55)',
  },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  scanArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  frame: {
    width: 250, height: 250, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
  },
  corner: { position: 'absolute', width: 38, height: 38, borderColor: '#6AE0B2' },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 12 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 12 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 12 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 12 },
  hint: { color: '#fff', fontSize: 13, marginTop: 23 },
  error: { color: '#fff', fontSize: 12, backgroundColor: '#9E3448', padding: 9, borderRadius: 8, marginTop: 13 },
  bottomNote: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(16,12,22,0.72)', paddingHorizontal: 20, paddingVertical: 18 },
  bottomNoteText: { color: '#E4D6FF', fontSize: 11, lineHeight: 16, flex: 1 },
  permissionState: { flex: 1, backgroundColor: '#F7F5FA', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  permissionIcon: { width: 68, height: 68, borderRadius: 21, backgroundColor: '#EEE7FA', alignItems: 'center', justifyContent: 'center' },
  permissionTitle: { color: '#26212F', fontSize: 20, fontWeight: '700', marginTop: 18 },
  permissionText: { color: '#756F7E', fontSize: 13, textAlign: 'center', lineHeight: 19, marginTop: 8 },
  permissionButton: { backgroundColor: '#5F14CC', borderRadius: 13, paddingHorizontal: 24, paddingVertical: 14, marginTop: 20 },
  permissionButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
