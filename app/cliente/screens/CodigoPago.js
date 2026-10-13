import React, { useState } from 'react';
import {
  Alert, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SHOPS, useRewards } from '../rewards/RewardsContext';

export const CodigoPago = ({ navigation, route }) => {
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { promotions, ready, loadError, recordDemoPurchase } = useRewards();
  const shop = SHOPS.find((item) => item.id === route.params?.shopId);

  const confirmPurchase = async () => {
    const purchaseAmount = Number(amount.replace(',', '.'));
    if (!Number.isFinite(purchaseAmount) || purchaseAmount <= 0) {
      Alert.alert('Revisa el monto', 'Ingresa el valor de la compra para continuar.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await recordDemoPurchase(shop.id, purchaseAmount);
      let message;
      if (!result.counted) {
        message = `${shop.name} no tiene una promoción activa. Esta compra de demostración no suma al progreso.`;
      } else if (result.reachedGoal) {
        message = `¡Meta completada en ${shop.name}! Ganaste: ${result.promotion.reward}. Ya empezó una nueva meta.`;
      } else {
        const remaining = result.promotion.goal - result.progress.current;
        message = `Compra de demostración registrada en ${shop.name}. Llevas ${result.progress.current} de ${result.promotion.goal}; te ${remaining === 1 ? 'falta' : 'faltan'} ${remaining} para ganar ${result.promotion.reward}.`;
      }
      Alert.alert('Pago de demostración', `${message}\n\nNo se realizó ningún cargo.`, [{
        text: 'Ver mis beneficios',
        onPress: () => navigation.navigate('MainTabs', { screen: 'Beneficios' }),
      }]);
    } catch (error) {
      Alert.alert('No se pudo registrar la compra', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!shop || loadError) {
    return (
      <View style={styles.errorState}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="alert-circle-outline" size={42} color="#A63B4C" />
        <Text style={styles.errorTitle}>{shop ? 'No se cargaron tus datos' : 'QR de comercio no válido'}</Text>
        <Text style={styles.errorText}>{loadError || 'Vuelve a escanear el QR del establecimiento.'}</Text>
        <TouchableOpacity style={styles.backHomeButton} onPress={() => navigation.navigate('MainTabs', { screen: 'Inicio' })}>
          <Text style={styles.backHomeText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const promotion = promotions[shop.id];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Volver al escáner"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#351078" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Confirmar compra</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.shopCard}>
          <View style={[styles.shopIcon, { backgroundColor: `${shop.color}1A` }]}>
            <Ionicons name={shop.icon} size={26} color={shop.color} />
          </View>
          <View style={styles.shopCopy}>
            <Text style={styles.eyebrow}>ESTABLECIMIENTO</Text>
            <Text style={styles.shopName}>{shop.name}</Text>
          </View>
          <Ionicons name="checkmark-circle" size={22} color="#258761" />
        </View>

        <Text style={styles.title}>Tu compra suma</Text>
        <Text style={styles.subtitle}>
          Confirma el monto para registrar una compra QR de demostración y avanzar en la meta de este local.
        </Text>

        {ready && promotion.active ? (
          <View style={styles.rewardCard}>
            <View style={styles.rewardIcon}>
              <Ionicons name="gift-outline" size={20} color="#5F14CC" />
            </View>
            <View style={styles.rewardCopy}>
              <Text style={styles.rewardTitle}>{promotion.goal} compras QR</Text>
              <Text style={styles.rewardText}>Premio: {promotion.reward}</Text>
            </View>
            <View style={styles.activeDot} />
          </View>
        ) : (
          <View style={styles.inactiveCard}>
            <Ionicons name="information-circle-outline" size={19} color="#805B12" />
            <Text style={styles.inactiveText}>
              {ready ? 'Este local no tiene una promoción activa.' : 'Cargando promoción…'}
            </Text>
          </View>
        )}

        <Text style={styles.fieldLabel}>MONTO DE LA COMPRA</Text>
        <View style={styles.amountInput}>
          <Text style={styles.currency}>$</Text>
          <TextInput
            accessibilityLabel="Monto de la compra"
            value={amount}
            onChangeText={(value) => setAmount(value.replace(/[^0-9.,]/g, ''))}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="#A49BAE"
            style={styles.amountText}
            editable={ready && !submitting}
          />
          <Text style={styles.usd}>USD</Text>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          disabled={!ready || submitting}
          style={[styles.confirmButton, (!ready || submitting) && styles.disabledButton]}
          onPress={confirmPurchase}
        >
          <Text style={styles.confirmText}>
            {submitting ? 'Registrando…' : 'Confirmar compra de demostración'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
        <View style={styles.demoNote}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#77717F" />
          <Text style={styles.demoNoteText}>
            La cámara leyó el QR del local. El pago no es real y no se realizará ningún cargo.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F5FA' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 54, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: '#fff' },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#26212F', fontSize: 16, fontWeight: '700' },
  content: { padding: 20, paddingBottom: 30 },
  shopCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, padding: 14 },
  shopIcon: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  shopCopy: { flex: 1, marginLeft: 12 },
  eyebrow: { color: '#827C8A', fontSize: 9, fontWeight: '700', letterSpacing: 0.8 },
  shopName: { color: '#26212F', fontSize: 14, fontWeight: '700', marginTop: 4 },
  title: { color: '#26212F', fontSize: 25, fontWeight: '700', marginTop: 26 },
  subtitle: { color: '#756F7E', fontSize: 13, lineHeight: 19, marginTop: 7 },
  rewardCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEE7FA', borderRadius: 14, padding: 13, marginTop: 21 },
  rewardIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  rewardCopy: { flex: 1, marginLeft: 10 },
  rewardTitle: { color: '#38204F', fontSize: 13, fontWeight: '700' },
  rewardText: { color: '#6F5C82', fontSize: 11, marginTop: 3 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#258761' },
  inactiveCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFF3D2', borderRadius: 12, padding: 12, marginTop: 21 },
  inactiveText: { color: '#654D18', fontSize: 12, flex: 1 },
  fieldLabel: { color: '#756F7E', fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginTop: 24, marginBottom: 8 },
  amountInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#E8E3ED', borderRadius: 13, paddingHorizontal: 14, minHeight: 58 },
  currency: { color: '#3D1F6E', fontSize: 22, fontWeight: '600', marginRight: 8 },
  amountText: { flex: 1, color: '#26212F', fontSize: 22, fontWeight: '600', paddingVertical: 12 },
  usd: { color: '#827C8A', fontSize: 11, fontWeight: '600' },
  confirmButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, backgroundColor: '#5F14CC', borderRadius: 14, paddingVertical: 16, marginTop: 20 },
  disabledButton: { opacity: 0.55 },
  confirmText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  demoNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 7, marginTop: 14 },
  demoNoteText: { flex: 1, color: '#77717F', fontSize: 11, lineHeight: 16 },
  errorState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#F7F5FA' },
  errorTitle: { color: '#26212F', fontSize: 18, fontWeight: '700', marginTop: 14, textAlign: 'center' },
  errorText: { color: '#756F7E', fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 7 },
  backHomeButton: { backgroundColor: '#5F14CC', borderRadius: 12, paddingHorizontal: 22, paddingVertical: 13, marginTop: 20 },
  backHomeText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
