import React, { useState } from 'react';
import {
  ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SHOPS, useRewards } from '../cliente/rewards/RewardsContext';

export const MerchantQrScreen = ({ navigation }) => {
  const [selectedShopId, setSelectedShopId] = useState(SHOPS[0].id);
  const { promotions, cashbackOffers, ready, loadError } = useRewards();
  const selectedShop = SHOPS.find((shop) => shop.id === selectedShopId);
  const shopCashbackOffers = cashbackOffers.filter(
    (offer) => offer.shopId === selectedShop.id && offer.active,
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Volver al negocio"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={23} color="#3D1F6E" />
        </TouchableOpacity>
        <View>
          <Text style={styles.eyebrow}>COBRO · MI VECI</Text>
          <Text style={styles.title}>Tu QR de pago</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.instruction}>
          Muestra este código al cliente para identificar tu local y sumar su compra a la promoción activa.
        </Text>
        <View style={styles.shopSelector}>
          {SHOPS.map((shop) => {
            const selected = selectedShop.id === shop.id;
            return (
              <TouchableOpacity
                key={shop.id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.shopOption, selected && styles.shopOptionSelected]}
                onPress={() => setSelectedShopId(shop.id)}
              >
                <Ionicons name={shop.icon} size={18} color={selected ? '#fff' : shop.color} />
                <Text style={[styles.shopOptionText, selected && styles.shopOptionTextSelected]}>
                  {shop.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.qrCard}>
          <View style={styles.qrFrame}>
            <QRCode value={selectedShop.qrValue} size={205} color="#241A2D" backgroundColor="#fff" />
          </View>
          <Text style={styles.shopName}>{selectedShop.name}</Text>
          <Text style={styles.qrHint}>El cliente escanea y confirma el pago de prueba.</Text>
          {!ready && <Text style={styles.statusText}>Cargando promoción…</Text>}
          {loadError && <Text style={styles.errorText}>{loadError}</Text>}
          {ready && (
            <View style={[styles.statusPill, promotions[selectedShop.id].active ? styles.activePill : styles.inactivePill]}>
              <View style={[styles.statusDot, promotions[selectedShop.id].active ? styles.activeDot : styles.inactiveDot]} />
              <Text style={styles.statusText}>
                {promotions[selectedShop.id].active
                  ? `Meta activa: ${promotions[selectedShop.id].goal} compras · ${promotions[selectedShop.id].reward}`
                  : 'Sin promoción activa; los pagos no suman progreso'}
              </Text>
            </View>
          )}
          {ready && shopCashbackOffers.map((offer) => (
            <View key={offer.id} style={styles.cashbackOffer}>
              <View style={styles.cashbackOfferIcon}>
                <Ionicons name="pricetag-outline" size={17} color="#5F14CC" />
              </View>
              <View style={styles.cashbackOfferCopy}>
                <Text style={styles.cashbackOfferLabel}>OFERTA VISIBLE PARA EL CLIENTE</Text>
                <Text style={styles.cashbackOfferTitle}>{offer.title}</Text>
              </View>
              <View style={styles.cashbackPercentBadge}>
                <Text style={styles.cashbackPercent}>{offer.percent}%</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.note}>
          <Ionicons name="information-circle-outline" size={19} color="#805B12" />
          <Text style={styles.noteText}>
            QR de demostración: identifica el establecimiento, pero no procesa dinero real.
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.manageButton}
          onPress={() => navigation.navigate('promotionStoreScreen')}
        >
          <Ionicons name="gift-outline" size={18} color="#5F14CC" />
          <Text style={styles.manageButtonText}>Gestionar cashback de este local</Text>
          <Ionicons name="chevron-forward" size={17} color="#5F14CC" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F5FA' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 52, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: '#fff' },
  backButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 6 },
  eyebrow: { color: '#806A99', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  title: { color: '#26212F', fontSize: 19, fontWeight: '700', marginTop: 3 },
  content: { padding: 19, paddingBottom: 30 },
  instruction: { color: '#756F7E', fontSize: 13, lineHeight: 19, marginBottom: 16 },
  shopSelector: { gap: 8 },
  shopOption: { flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: '#fff', borderRadius: 11, padding: 12 },
  shopOptionSelected: { backgroundColor: '#3D1F6E' },
  shopOptionText: { color: '#342B3D', fontSize: 12, fontWeight: '600' },
  shopOptionTextSelected: { color: '#fff' },
  qrCard: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 20, marginTop: 18 },
  qrFrame: { padding: 13, borderWidth: 1, borderColor: '#E9E4EE', borderRadius: 17, backgroundColor: '#fff' },
  shopName: { color: '#26212F', fontSize: 17, fontWeight: '700', marginTop: 15, textAlign: 'center' },
  qrHint: { color: '#827C8A', fontSize: 11, marginTop: 5, textAlign: 'center' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 11, padding: 10, marginTop: 15, alignSelf: 'stretch' },
  activePill: { backgroundColor: '#E8F5EE' },
  inactivePill: { backgroundColor: '#F4F0F5' },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  activeDot: { backgroundColor: '#258761' },
  inactiveDot: { backgroundColor: '#928997' },
  statusText: { color: '#516355', fontSize: 11, flex: 1, textAlign: 'center' },
  cashbackOffer: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', gap: 9, backgroundColor: '#F4EFFA', borderRadius: 12, padding: 10, marginTop: 11 },
  cashbackOfferIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  cashbackOfferCopy: { flex: 1 },
  cashbackOfferLabel: { color: '#827C8A', fontSize: 8, fontWeight: '700', letterSpacing: 0.4 },
  cashbackOfferTitle: { color: '#30243B', fontSize: 11, fontWeight: '700', marginTop: 3 },
  cashbackPercentBadge: { backgroundColor: '#E8F5EE', borderRadius: 10, paddingHorizontal: 9, paddingVertical: 7 },
  cashbackPercent: { color: '#24734F', fontSize: 14, fontWeight: '700' },
  errorText: { color: '#A63B4C', fontSize: 12, textAlign: 'center', marginTop: 10 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFF3D2', borderRadius: 12, padding: 12, marginTop: 14 },
  noteText: { color: '#654D18', fontSize: 11, lineHeight: 16, flex: 1 },
  manageButton: { flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: '#EEE7FA', borderRadius: 13, paddingHorizontal: 14, paddingVertical: 14, marginTop: 12 },
  manageButtonText: { color: '#3D1F6E', fontSize: 12, fontWeight: '700', flex: 1 },
});
