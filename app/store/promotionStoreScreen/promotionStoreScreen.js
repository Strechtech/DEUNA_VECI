import React, { useState } from 'react';
import {
  Alert, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ViewScreen } from '../../standars/viewScreen';
import { SHOPS, useRewards } from '../../cliente/rewards/RewardsContext';

export const PromotionStoreScreen = ({ navigation }) => {
  const {
    promotions,
    progress,
    cashbackOffers,
    ready,
    loadError,
    setPromotion,
    saveCashbackOffer,
    setCashbackOfferActive,
  } = useRewards();
  const [drafts, setDrafts] = useState({});
  const [savingShop, setSavingShop] = useState(null);
  const [offerDraft, setOfferDraft] = useState(null);
  const [savingCashback, setSavingCashback] = useState(false);
  const activeCount = SHOPS.filter((shop) => promotions[shop.id].active).length;
  const totalPurchases = SHOPS.reduce((total, shop) => total + progress[shop.id].total, 0);
  const totalRewards = SHOPS.reduce((total, shop) => total + progress[shop.id].rewards, 0);
  const activeCashbackCount = cashbackOffers.filter((offer) => offer.active).length;
  const cashbackDraftIsValid = Boolean(
    offerDraft
    && offerDraft.title.trim().length >= 4
    && Number.isInteger(Number(offerDraft.percent))
    && Number(offerDraft.percent) >= 1
    && Number(offerDraft.percent) <= 50,
  );

  const hasChanges = (shop, draft) => (
    Number(draft.goal) !== promotions[shop.id].goal
    || draft.reward.trim() !== promotions[shop.id].reward
  );

  const saveOffer = async (shop) => {
    const draft = drafts[shop.id] || promotions[shop.id];
    setSavingShop(shop.id);
    try {
      await setPromotion(shop.id, {
        goal: Number(draft.goal),
        reward: draft.reward.trim(),
      });
      setDrafts((currentDrafts) => {
        const nextDrafts = { ...currentDrafts };
        delete nextDrafts[shop.id];
        return nextDrafts;
      });
      Alert.alert('Promoción guardada', `La meta de ${shop.name} quedó actualizada.`);
    } catch (error) {
      Alert.alert('No se pudo guardar', error.message);
    } finally {
      setSavingShop(null);
    }
  };

  const toggleOffer = async (shop, active) => {
    try {
      await setPromotion(shop.id, { active });
    } catch (error) {
      Alert.alert('No se pudo actualizar la promoción', error.message);
    }
  };

  const editCashbackOffer = (offer) => {
    setOfferDraft({
      id: offer.id,
      shopId: offer.shopId,
      title: offer.title,
      percent: String(offer.percent),
    });
  };

  const saveCashback = async () => {
    setSavingCashback(true);
    try {
      await saveCashbackOffer({
        ...offerDraft,
        percent: Number(offerDraft.percent),
      });
      setOfferDraft(null);
      Alert.alert('Oferta guardada', 'El cambio ya se muestra en los beneficios del cliente y en el QR del local.');
    } catch (error) {
      Alert.alert('No se pudo guardar la oferta', error.message);
    } finally {
      setSavingCashback(false);
    }
  };

  const toggleCashbackOffer = async (offer, active) => {
    try {
      await setCashbackOfferActive(offer.id, active);
    } catch (error) {
      Alert.alert('No se pudo actualizar la oferta', error.message);
    }
  };

  if (loadError) {
    return (
      <ViewScreen>
        <View style={styles.errorState}>
          <Text style={styles.errorTitle}>No se cargaron las promociones</Text>
          <Text style={styles.errorText}>{loadError}</Text>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.errorBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.errorBackText}>Volver al panel</Text>
          </TouchableOpacity>
        </View>
      </ViewScreen>
    );
  }

  return (
    <ViewScreen>
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Volver"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={23} color="#3D1F6E" />
          </TouchableOpacity>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>MI VECI · PANEL DEL LOCAL</Text>
            <Text style={styles.title}>Gestión de cashback</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.introCard}>
            <View style={styles.introIcon}>
              <Ionicons name="gift-outline" size={22} color="#3D1F6E" />
            </View>
            <Text style={styles.introText}>
              Define el premio y la meta de cada local. Cada compra QR confirmada avanza el progreso del cliente.
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryHeading}>
              <View>
                <Text style={styles.summaryTitle}>Resumen de tus promociones</Text>
                <Text style={styles.summaryCaption}>Ofertas guardadas en este dispositivo</Text>
              </View>
              <Ionicons name="sparkles-outline" size={22} color="#D9C5FF" />
            </View>
            <View style={styles.summaryMetrics}>
              <View style={styles.summaryMetric}>
                <Text style={styles.summaryValue}>{ready ? activeCashbackCount : '—'}</Text>
                <Text style={styles.summaryLabel}>Ofertas activas</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryMetric}>
                <Text style={styles.summaryValue}>{ready ? `${activeCount}/${SHOPS.length}` : '—'}</Text>
                <Text style={styles.summaryLabel}>Metas activas</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryMetric}>
                <Text style={styles.summaryValue}>{ready ? totalPurchases : '—'}</Text>
                <Text style={styles.summaryLabel}>Compras</Text>
              </View>
            </View>
            <Text style={styles.summaryFootnote}>{ready ? `${totalRewards} premios completados` : 'Cargando resultados…'}</Text>
          </View>

          <View style={styles.navigationActions}>
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.navigationAction}
              onPress={() => navigation.navigate('MerchantQrScreen')}
            >
              <Ionicons name="qr-code-outline" size={18} color="#5F14CC" />
              <Text style={styles.navigationActionText}>Ver QR de cobro</Text>
              <Ionicons name="chevron-forward" size={16} color="#8A8191" />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.navigationAction}
              onPress={() => navigation.navigate('statisticsStoreScreen')}
            >
              <Ionicons name="bar-chart-outline" size={18} color="#5F14CC" />
              <Text style={styles.navigationActionText}>Ver resultados</Text>
              <Ionicons name="chevron-forward" size={16} color="#8A8191" />
            </TouchableOpacity>
          </View>

          <View style={styles.cashbackSectionHeading}>
            <View style={styles.cashbackSectionCopy}>
              <Text style={styles.sectionTitle}>Ofertas de cashback</Text>
              <Text style={styles.sectionSubtitle}>Beneficios visibles para tus clientes</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              disabled={!ready || Boolean(offerDraft)}
              style={[styles.addOfferButton, (!ready || offerDraft) && styles.disabledButton]}
              onPress={() => setOfferDraft({
                shopId: SHOPS[0].id,
                title: '',
                percent: '5',
              })}
            >
              <Ionicons name="add" size={19} color="#fff" />
              <Text style={styles.addOfferButtonText}>Crear</Text>
            </TouchableOpacity>
          </View>

          {offerDraft && (
            <View style={styles.offerEditor}>
              <View style={styles.editorHeading}>
                <Text style={styles.editorTitle}>
                  {offerDraft.id ? 'Editar oferta' : 'Nueva oferta de ejemplo'}
                </Text>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Cerrar editor"
                  onPress={() => setOfferDraft(null)}
                >
                  <Ionicons name="close" size={22} color="#786B84" />
                </TouchableOpacity>
              </View>
              <Text style={styles.fieldLabel}>LOCAL</Text>
              <View style={styles.shopPicker}>
                {SHOPS.map((shop) => {
                  const selected = offerDraft.shopId === shop.id;
                  return (
                    <TouchableOpacity
                      key={shop.id}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      style={[styles.shopPickerOption, selected && styles.shopPickerOptionSelected]}
                      onPress={() => setOfferDraft((current) => ({ ...current, shopId: shop.id }))}
                    >
                      <Text style={[
                        styles.shopPickerText,
                        selected && styles.shopPickerTextSelected,
                      ]}>
                        {shop.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={styles.fieldLabel}>NOMBRE DE LA OFERTA</Text>
              <TextInput
                accessibilityLabel="Nombre de la oferta"
                value={offerDraft.title}
                editable={!savingCashback}
                onChangeText={(title) => setOfferDraft((current) => ({ ...current, title }))}
                placeholder="Ej. 5 % de cashback en tu compra"
                placeholderTextColor="#A49BAE"
                style={styles.input}
                maxLength={50}
              />
              <Text style={styles.fieldLabel}>CASHBACK DE LA OFERTA</Text>
              <View style={styles.percentInputRow}>
                <TextInput
                  accessibilityLabel="Porcentaje de cashback"
                  value={offerDraft.percent}
                  editable={!savingCashback}
                  onChangeText={(percent) => setOfferDraft((current) => ({
                    ...current,
                    percent: percent.replace(/[^0-9]/g, '').slice(0, 2),
                  }))}
                  placeholder="5"
                  placeholderTextColor="#A49BAE"
                  keyboardType="number-pad"
                  style={styles.percentInput}
                  maxLength={2}
                />
                <Text style={styles.percentSuffix}>%</Text>
              </View>
              <Text style={styles.editorHint}>El porcentaje y el nombre también se mostrarán en beneficios y en el QR.</Text>
              <View style={styles.editorButtons}>
                <TouchableOpacity
                  accessibilityRole="button"
                  style={styles.cancelButton}
                  disabled={savingCashback}
                  onPress={() => setOfferDraft(null)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  disabled={!ready || savingCashback || !cashbackDraftIsValid}
                  style={[
                    styles.saveButton,
                    styles.editorSaveButton,
                    (savingCashback || !cashbackDraftIsValid) && styles.disabledButton,
                  ]}
                  onPress={saveCashback}
                >
                  <Text style={styles.saveButtonText}>
                    {savingCashback ? 'Guardando…' : offerDraft.id ? 'Guardar cambios' : 'Crear oferta'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {cashbackOffers.map((offer) => {
            const shop = SHOPS.find((item) => item.id === offer.shopId);
            return (
              <View key={offer.id} style={styles.cashbackOfferCard}>
                <View style={[styles.shopIcon, { backgroundColor: `${shop.color}1A` }]}>
                  <Ionicons name="pricetag-outline" size={21} color={shop.color} />
                </View>
                <View style={styles.cashbackOfferCopy}>
                  <Text style={styles.cashbackOfferShop}>{shop.name}</Text>
                  <Text style={styles.cashbackOfferTitle}>{offer.title}</Text>
                  <Text style={styles.cashbackOfferPercent}>{offer.percent}% de cashback · demostración</Text>
                </View>
                <View style={styles.offerControls}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Editar oferta ${offer.title}`}
                    style={styles.editOfferButton}
                    disabled={Boolean(offerDraft)}
                    onPress={() => editCashbackOffer(offer)}
                  >
                    <Ionicons name="create-outline" size={19} color="#5F14CC" />
                  </TouchableOpacity>
                  <Switch
                    accessibilityLabel={`${offer.active ? 'Pausar' : 'Activar'} ${offer.title}`}
                    value={offer.active}
                    disabled={!ready}
                    onValueChange={(active) => toggleCashbackOffer(offer, active)}
                    trackColor={{ false: '#D8D4DE', true: '#A8DFCA' }}
                    thumbColor={offer.active ? '#258761' : '#fff'}
                  />
                </View>
              </View>
            );
          })}

          <View style={styles.existingOffersDivider}>
            <Text style={styles.sectionTitle}>Metas de fidelidad por local</Text>
            <Text style={styles.sectionSubtitle}>Edita cuántas compras completan cada premio</Text>
          </View>

          {!ready && (
            <Text style={styles.loadingText}>Cargando la configuración guardada…</Text>
          )}

          {SHOPS.map((shop) => {
            const promotion = promotions[shop.id];
            const draft = drafts[shop.id] || promotion;
            const shopProgress = progress[shop.id];
            return (
              <View key={shop.id} style={styles.offerCard}>
                <View style={styles.offerHeader}>
                  <View style={[styles.shopIcon, { backgroundColor: `${shop.color}1A` }]}>
                    <Ionicons name={shop.icon} size={22} color={shop.color} />
                  </View>
                  <View style={styles.shopCopy}>
                    <Text style={styles.shopName}>{shop.name}</Text>
                    <Text style={styles.shopCategory}>{shop.category}</Text>
                  </View>
                  <View style={[
                    styles.promotionStatus,
                    promotion.active ? styles.promotionStatusActive : styles.promotionStatusPaused,
                  ]}>
                    <Text style={[
                      styles.promotionStatusText,
                      promotion.active ? styles.promotionStatusTextActive : styles.promotionStatusTextPaused,
                    ]}>
                      {promotion.active ? 'Activa' : 'Pausada'}
                    </Text>
                  </View>
                  <Switch
                    accessibilityLabel={`${promotion.active ? 'Pausar' : 'Activar'} promoción de ${shop.name}`}
                    value={promotion.active}
                    disabled={!ready}
                    onValueChange={(value) => toggleOffer(shop, value)}
                    trackColor={{ false: '#D8D4DE', true: '#A8DFCA' }}
                    thumbColor={promotion.active ? '#258761' : '#fff'}
                  />
                </View>

                <View style={styles.divider} />
                <Text style={styles.fieldLabel}>COMPRAS QR PARA OBTENER EL PREMIO</Text>
                <TextInput
                  accessibilityLabel={`Meta de compras para ${shop.name}`}
                  keyboardType="number-pad"
                  value={String(draft.goal)}
                  editable={ready}
                  onChangeText={(value) => setDrafts((current) => ({
                    ...current,
                    [shop.id]: { ...draft, goal: value.replace(/[^0-9]/g, '') },
                  }))}
                  style={styles.input}
                  maxLength={2}
                />

                <Text style={styles.fieldLabel}>PREMIO</Text>
                <TextInput
                  accessibilityLabel={`Premio de ${shop.name}`}
                  value={draft.reward}
                  editable={ready}
                  onChangeText={(value) => setDrafts((current) => ({
                    ...current,
                    [shop.id]: { ...draft, reward: value },
                  }))}
                  style={styles.input}
                  maxLength={50}
                />

                <View style={styles.progressNotice}>
                  <Ionicons name="information-circle-outline" size={17} color="#71552A" />
                  <Text style={styles.progressNoticeText}>
                    Si cambias la meta o el premio, el avance actual de este local vuelve a cero.
                  </Text>
                </View>

                <View style={styles.progressSummary}>
                  <Ionicons name="people-outline" size={18} color="#5F14CC" />
                  <Text style={styles.progressSummaryText}>
                    {shopProgress.total} compras confirmadas · {shopProgress.rewards} premios completados
                  </Text>
                </View>

                <TouchableOpacity
                  accessibilityRole="button"
                  disabled={!ready || savingShop === shop.id || !hasChanges(shop, draft)}
                  style={[
                    styles.saveButton,
                    (!ready || savingShop === shop.id || !hasChanges(shop, draft)) && styles.disabledButton,
                  ]}
                  onPress={() => saveOffer(shop)}
                >
                  <Text style={styles.saveButtonText}>
                    {savingShop === shop.id
                      ? 'Guardando…'
                      : hasChanges(shop, draft) ? 'Guardar cambios' : 'Sin cambios pendientes'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <Text style={styles.disclaimer}>
            En este prototipo los pagos se confirman como demostración. No se procesa dinero real.
          </Text>
        </ScrollView>
      </View>
    </ViewScreen>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F1F8' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 8, paddingBottom: 13 },
  backButton: { width: 40, height: 42, alignItems: 'center', justifyContent: 'center' },
  headerCopy: { flex: 1, marginLeft: 4 },
  eyebrow: { color: '#806A99', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  title: { color: '#2A1B39', fontSize: 21, fontWeight: '700', marginTop: 3 },
  content: { paddingHorizontal: 16, paddingBottom: 30 },
  introCard: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: '#E9E0F5', borderRadius: 15, padding: 14, marginBottom: 13 },
  introIcon: { width: 39, height: 39, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  introText: { flex: 1, color: '#49365E', fontSize: 12, lineHeight: 18 },
  summaryCard: { backgroundColor: '#5B2D8E', borderRadius: 17, padding: 16, marginBottom: 12 },
  summaryHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  summaryCaption: { color: '#D8C8F5', fontSize: 10, marginTop: 4 },
  summaryMetrics: { flexDirection: 'row', alignItems: 'center', marginTop: 17 },
  summaryMetric: { flex: 1, alignItems: 'center' },
  summaryValue: { color: '#fff', fontSize: 21, fontWeight: '700' },
  summaryLabel: { color: '#D8C8F5', fontSize: 10, marginTop: 3 },
  summaryDivider: { width: 1, height: 31, backgroundColor: 'rgba(255,255,255,0.25)' },
  summaryFootnote: { color: '#D8C8F5', fontSize: 10, textAlign: 'center', marginTop: 11 },
  navigationActions: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  navigationAction: { flex: 1, minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 8 },
  navigationActionText: { color: '#49365E', fontSize: 10, fontWeight: '600', flexShrink: 1 },
  sectionTitle: { color: '#30243B', fontSize: 16, fontWeight: '700', marginBottom: 10 },
  sectionSubtitle: { color: '#827C8A', fontSize: 11, marginTop: -5, marginBottom: 10 },
  cashbackSectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 },
  cashbackSectionCopy: { flex: 1 },
  addOfferButton: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#5F14CC', borderRadius: 10, paddingHorizontal: 11, paddingVertical: 9, marginLeft: 8 },
  addOfferButtonText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  offerEditor: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#DDD0EE', borderRadius: 16, padding: 14, marginBottom: 12 },
  editorHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 },
  editorTitle: { color: '#30243B', fontSize: 15, fontWeight: '700' },
  shopPicker: { flexDirection: 'row', gap: 7, marginBottom: 8 },
  shopPickerOption: { flex: 1, minHeight: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E5DFEA', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 6 },
  shopPickerOptionSelected: { backgroundColor: '#5F14CC', borderColor: '#5F14CC' },
  shopPickerText: { color: '#5B4B6C', fontSize: 10, textAlign: 'center', fontWeight: '600' },
  shopPickerTextSelected: { color: '#fff' },
  percentInputRow: { minHeight: 46, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5DFEA', borderRadius: 11, paddingHorizontal: 12, backgroundColor: '#FCFBFD' },
  percentInput: { flex: 1, color: '#2A1B39', fontSize: 16, paddingVertical: 8 },
  percentSuffix: { color: '#5F14CC', fontSize: 16, fontWeight: '700' },
  editorHint: { color: '#827C8A', fontSize: 10, lineHeight: 15, marginTop: 2 },
  editorButtons: { flexDirection: 'row', gap: 8, marginTop: 11 },
  cancelButton: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 11, borderWidth: 1, borderColor: '#E5DFEA', paddingVertical: 13 },
  cancelButtonText: { color: '#5B4B6C', fontSize: 12, fontWeight: '700' },
  editorSaveButton: { flex: 1, marginTop: 0 },
  cashbackOfferCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, padding: 12, marginBottom: 9 },
  cashbackOfferCopy: { flex: 1, marginLeft: 10 },
  cashbackOfferShop: { color: '#827C8A', fontSize: 9, fontWeight: '600' },
  cashbackOfferTitle: { color: '#30243B', fontSize: 12, fontWeight: '700', marginTop: 3 },
  cashbackOfferPercent: { color: '#258761', fontSize: 10, fontWeight: '600', marginTop: 4 },
  offerControls: { alignItems: 'center', marginLeft: 4 },
  editOfferButton: { width: 36, height: 30, alignItems: 'center', justifyContent: 'center' },
  existingOffersDivider: { borderTopWidth: 1, borderTopColor: '#E8E2ED', marginTop: 10, paddingTop: 17 },
  loadingText: { color: '#766B80', fontSize: 12, padding: 12, textAlign: 'center' },
  offerCard: { backgroundColor: '#fff', borderRadius: 17, padding: 15, marginBottom: 13 },
  offerHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  shopIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  shopCopy: { flex: 1 },
  shopName: { color: '#2A1B39', fontSize: 14, fontWeight: '700' },
  shopCategory: { color: '#8A8191', fontSize: 11, marginTop: 3 },
  promotionStatus: { borderRadius: 12, paddingHorizontal: 8, paddingVertical: 5 },
  promotionStatusActive: { backgroundColor: '#E8F5EE' },
  promotionStatusPaused: { backgroundColor: '#F0EDF2' },
  promotionStatusText: { fontSize: 9, fontWeight: '700' },
  promotionStatusTextActive: { color: '#24734F' },
  promotionStatusTextPaused: { color: '#746B7A' },
  divider: { height: 1, backgroundColor: '#EFEAF3', marginVertical: 14 },
  fieldLabel: { color: '#7D7385', fontSize: 9, fontWeight: '700', letterSpacing: 0.7, marginBottom: 6, marginTop: 7 },
  input: { minHeight: 46, borderWidth: 1, borderColor: '#E5DFEA', borderRadius: 11, paddingHorizontal: 12, color: '#2A1B39', fontSize: 14, marginBottom: 7, backgroundColor: '#FCFBFD' },
  progressNotice: { flexDirection: 'row', alignItems: 'flex-start', gap: 7, backgroundColor: '#FFF5D9', borderRadius: 10, padding: 10, marginTop: 4 },
  progressNoticeText: { color: '#71552A', fontSize: 10, lineHeight: 15, flex: 1 },
  progressSummary: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F5F1FA', borderRadius: 10, padding: 10, marginTop: 5 },
  progressSummaryText: { color: '#5B4B6C', fontSize: 11, flex: 1 },
  saveButton: { backgroundColor: '#5F14CC', borderRadius: 11, alignItems: 'center', paddingVertical: 14, marginTop: 12 },
  disabledButton: { opacity: 0.55 },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  disclaimer: { color: '#807687', fontSize: 11, lineHeight: 16, textAlign: 'center', marginHorizontal: 8, marginVertical: 5 },
  errorState: { flex: 1, justifyContent: 'center', padding: 24 },
  errorTitle: { color: '#34203F', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  errorText: { color: '#7C4351', fontSize: 13, textAlign: 'center', marginTop: 9 },
  errorBackButton: { alignSelf: 'center', backgroundColor: '#5F14CC', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, marginTop: 19 },
  errorBackText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
