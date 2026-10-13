import React from 'react';
import {
  ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SHOPS, useRewards } from '../rewards/RewardsContext';

export const Beneficios = ({ navigation }) => {
  const { promotions, progress, cashbackOffers, ready, loadError } = useRewards();
  const activeCashbackOffers = cashbackOffers.filter((offer) => offer.active);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="gift-outline" size={22} color="#5F14CC" />
        </View>
        <View>
          <Text style={styles.eyebrow}>MI VECI</Text>
          <Text style={styles.headerTitle}>Premios de tu barrio</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>
          Cada pago QR suma una compra en ese local. Completa su meta y gana el premio.
        </Text>

        {loadError ? (
          <View style={styles.errorCard}>
            <Ionicons name="alert-circle-outline" size={21} color="#A63B4C" />
            <Text style={styles.errorText}>{loadError}</Text>
          </View>
        ) : !ready ? (
          <Text style={styles.loadingText}>Cargando tus avances…</Text>
        ) : SHOPS.map((shop) => {
          const promotion = promotions[shop.id];
          const shopProgress = progress[shop.id];
          const progressPercent = promotion.active
            ? Math.min(shopProgress.current / promotion.goal, 1)
            : 0;

          return (
            <View key={shop.id} style={styles.shopCard}>
              <View style={styles.shopHeader}>
                <View style={[styles.shopIcon, { backgroundColor: `${shop.color}1A` }]}>
                  <Ionicons name={shop.icon} size={23} color={shop.color} />
                </View>
                <View style={styles.shopCopy}>
                  <Text style={styles.shopName}>{shop.name}</Text>
                  <Text style={styles.shopCategory}>{shop.category}</Text>
                </View>
                <View style={[styles.statusPill, promotion.active ? styles.activePill : styles.inactivePill]}>
                  <View style={[styles.statusDot, promotion.active ? styles.activeDot : styles.inactiveDot]} />
                  <Text style={[styles.statusText, promotion.active ? styles.activeText : styles.inactiveText]}>
                    {promotion.active ? 'Activa' : 'Pausada'}
                  </Text>
                </View>
              </View>

              {promotion.active ? (
                <>
                  <View style={styles.progressHeading}>
                    <Text style={styles.progressCaption}>TU PROGRESO</Text>
                    <Text style={styles.progressCount}>
                      {shopProgress.current} <Text style={styles.progressGoal}>/ {promotion.goal} compras</Text>
                    </Text>
                  </View>
                  <View
                    accessibilityRole="progressbar"
                    accessibilityValue={{
                      min: 0,
                      max: promotion.goal,
                      now: shopProgress.current,
                    }}
                    style={styles.progressTrack}
                  >
                    <View style={[styles.progressFill, { width: `${progressPercent * 100}%` }]} />
                  </View>
                  <View style={styles.rewardRow}>
                    <Ionicons name="trophy-outline" size={17} color="#99721F" />
                    <Text style={styles.rewardText}>{promotion.reward}</Text>
                    <Text style={styles.rewardCount}>{shopProgress.rewards} ganados</Text>
                  </View>
                  <Text style={styles.nextText}>
                    {shopProgress.current === 0
                      ? `Empieza tu próxima meta con un pago QR en este local.`
                      : `Te ${promotion.goal - shopProgress.current === 1 ? 'falta' : 'faltan'} ${promotion.goal - shopProgress.current} compra${promotion.goal - shopProgress.current === 1 ? '' : 's'} para ganar el premio.`}
                  </Text>
                </>
              ) : (
                <Text style={styles.pausedMessage}>
                  Este local pausó su promoción. Tu avance se conserva para cuando vuelva a activarla.
                </Text>
              )}
            </View>
          );
        })}

        {ready && (
          <View style={styles.cashbackSection}>
            <View style={styles.cashbackHeading}>
              <View>
                <Text style={styles.cashbackTitle}>Ofertas de cashback</Text>
                <Text style={styles.cashbackSubtitle}>Beneficios de ejemplo de tus locales</Text>
              </View>
              <Ionicons name="sparkles-outline" size={22} color="#5F14CC" />
            </View>
            {activeCashbackOffers.length ? activeCashbackOffers.map((offer) => {
              const shop = SHOPS.find((item) => item.id === offer.shopId);
              return (
                <View key={offer.id} style={styles.cashbackCard}>
                  <View style={[styles.cashbackIcon, { backgroundColor: `${shop.color}1A` }]}>
                    <Ionicons name="pricetag-outline" size={21} color={shop.color} />
                  </View>
                  <View style={styles.cashbackCopy}>
                    <Text style={styles.cashbackShop}>{shop.name}</Text>
                    <Text style={styles.cashbackOffer}>{offer.title}</Text>
                    <Text style={styles.cashbackDemo}>Demostración · no es dinero real</Text>
                  </View>
                  <View style={styles.cashbackPercentBadge}>
                    <Text style={styles.cashbackPercent}>{offer.percent}%</Text>
                    <Text style={styles.cashbackPercentLabel}>cashback</Text>
                  </View>
                </View>
              );
            }) : (
              <View style={styles.emptyCashback}>
                <Ionicons name="pause-circle-outline" size={20} color="#827C8A" />
                <Text style={styles.emptyCashbackText}>Por ahora no hay ofertas activas.</Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          accessibilityRole="button"
          style={styles.scanButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Escanear')}
        >
          <Ionicons name="qr-code-outline" size={20} color="#fff" />
          <Text style={styles.scanButtonText}>Escanear QR del local</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          Prototipo de demostración. Las compras QR de prueba no procesan pagos reales.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F5FA' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 54, paddingHorizontal: 19, paddingBottom: 15, backgroundColor: '#fff' },
  headerIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: '#EEE7FA', alignItems: 'center', justifyContent: 'center' },
  eyebrow: { color: '#827C8A', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  headerTitle: { color: '#26212F', fontSize: 18, fontWeight: '700', marginTop: 3 },
  content: { padding: 17, paddingBottom: 30 },
  intro: { color: '#756F7E', fontSize: 13, lineHeight: 19, marginBottom: 15 },
  loadingText: { color: '#827C8A', fontSize: 12, textAlign: 'center', padding: 16 },
  shopCard: { backgroundColor: '#fff', borderRadius: 17, padding: 15, marginBottom: 12 },
  shopHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  shopIcon: { width: 45, height: 45, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  shopCopy: { flex: 1 },
  shopName: { color: '#26212F', fontSize: 13, fontWeight: '700' },
  shopCategory: { color: '#8A8390', fontSize: 10, marginTop: 4 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 6 },
  activePill: { backgroundColor: '#E8F5EE' },
  inactivePill: { backgroundColor: '#F0EDF2' },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  activeDot: { backgroundColor: '#258761' },
  inactiveDot: { backgroundColor: '#938B99' },
  statusText: { fontSize: 10, fontWeight: '700' },
  activeText: { color: '#24734F' },
  inactiveText: { color: '#746B7A' },
  progressHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, marginBottom: 8 },
  progressCaption: { color: '#827C8A', fontSize: 9, fontWeight: '700', letterSpacing: 0.7 },
  progressCount: { color: '#3D1F6E', fontSize: 15, fontWeight: '700' },
  progressGoal: { color: '#827C8A', fontSize: 11, fontWeight: '500' },
  progressTrack: { height: 9, borderRadius: 5, backgroundColor: '#ECE6F3', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5, backgroundColor: '#5F14CC' },
  rewardRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 13 },
  rewardText: { flex: 1, color: '#4A3A56', fontSize: 12, fontWeight: '600' },
  rewardCount: { color: '#827C8A', fontSize: 10 },
  nextText: { color: '#827C8A', fontSize: 11, lineHeight: 16, marginTop: 7 },
  pausedMessage: { color: '#756F7E', fontSize: 11, lineHeight: 17, marginTop: 13 },
  cashbackSection: { marginTop: 7, marginBottom: 14 },
  cashbackHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  cashbackTitle: { color: '#26212F', fontSize: 16, fontWeight: '700' },
  cashbackSubtitle: { color: '#827C8A', fontSize: 10, marginTop: 3 },
  cashbackCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, padding: 12, marginBottom: 8 },
  cashbackIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  cashbackCopy: { flex: 1, marginHorizontal: 10 },
  cashbackShop: { color: '#827C8A', fontSize: 9, fontWeight: '600' },
  cashbackOffer: { color: '#30243B', fontSize: 12, fontWeight: '700', marginTop: 3 },
  cashbackDemo: { color: '#827C8A', fontSize: 9, marginTop: 4 },
  cashbackPercentBadge: { alignItems: 'center', backgroundColor: '#E8F5EE', borderRadius: 11, paddingHorizontal: 9, paddingVertical: 7 },
  cashbackPercent: { color: '#24734F', fontSize: 15, fontWeight: '700' },
  cashbackPercentLabel: { color: '#24734F', fontSize: 8, marginTop: 1 },
  emptyCashback: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 13, backgroundColor: '#fff', borderRadius: 13 },
  emptyCashbackText: { color: '#827C8A', fontSize: 11 },
  scanButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, backgroundColor: '#5F14CC', borderRadius: 14, paddingVertical: 15, paddingHorizontal: 16, marginTop: 7 },
  scanButtonText: { color: '#fff', fontSize: 13, fontWeight: '700', flex: 1, textAlign: 'center' },
  disclaimer: { color: '#827C8A', fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 12, paddingHorizontal: 8 },
  errorCard: { flexDirection: 'row', gap: 9, alignItems: 'center', padding: 13, backgroundColor: '#FCEAEC', borderRadius: 12 },
  errorText: { color: '#873646', fontSize: 12, flex: 1 },
});
