import { Button, StyleSheet, Text, View } from 'react-native';

const PURPLE      = '#5B2D8E';
const PURPLE_DARK = '#3d1f6e';
const PURPLE_CARD = '#7B3FB5';
const TEAL        = '#2DD4BF';
const BG          = '#F3F0F8';
const WHITE       = '#FFFFFF';

const colorsApp = {
  purpleIcon:   '#5B2D8E',
  purple:       '#5B2D8E',
  purpleLight:  '#EDE7F6',
  teal:         '#2DD4BF',
  bg:           '#F3F0F8',
  white:        '#FFFFFF',
  textDark:     '#1a1a1a',
  textGray:     '#888',
};

export const promotionStoreStyles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colorsApp.bg },
 
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 14,
    backgroundColor: colorsApp.bg,
    gap: 10,
  },
  backBtn:     { padding: 4 },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: '700', color: colorsApp.purple },
  avatar:      { width: 38, height: 38, borderRadius: 19, backgroundColor: '#555' },
 
  scroll: { paddingHorizontal: 16, paddingTop: 8 },
 
  // AutoPromo
  autoPromoCard: {
    backgroundColor: colorsApp.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  autoPromoLeft:    { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  autoPromoIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colorsApp.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoPromoTitle: { fontSize: 15, fontWeight: '700', color: colorsApp.textDark, marginBottom: 2 },
  autoPromoDesc:  { fontSize: 12, color: colorsApp.textGray, lineHeight: 16 },
 
  // Selección manual
  sectionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colorsApp.textDark,
    marginBottom: 14,
    lineHeight: 22,
  },
  promoCard: {
    backgroundColor: colorsApp.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  promoIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoText:  { flex: 1 },
  promoTitle: { fontSize: 14, fontWeight: '700', color: colorsApp.textDark, marginBottom: 3 },
  promoDesc:  { fontSize: 12, color: colorsApp.textGray, lineHeight: 16 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colorsApp.purple,
    borderColor: colorsApp.purple,
  },
 
  footNote: {
    fontSize: 12,
    color: colorsApp.textGray,
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 18,
  },
  activarBtn: {
    backgroundColor: colorsApp.purple,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  activarBtnText: { color: colorsApp.white, fontWeight: '700', fontSize: 15 },
 
  // Promo personalizada
  personalCard: {
    borderWidth: 2,
    borderColor: colorsApp.purple,
    borderRadius: 20,
    padding: 18,
    backgroundColor: colorsApp.white,
    marginBottom: 16,
  },
  personalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  personalIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colorsApp.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personalTitle: { fontSize: 16, fontWeight: '700', color: colorsApp.textDark, marginBottom: 4 },
  activeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1B5E20',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  activeBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
 
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colorsApp.textGray,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorsApp.bg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    gap: 6,
  },
  inputPrefix: { fontSize: 18, color: colorsApp.textDark, fontWeight: '500' },
  input:       { flex: 1, fontSize: 18, color: colorsApp.textDark },
 
  cashbackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorsApp.bg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  cashbackLabel: { fontSize: 14, color: colorsApp.textGray },
  cashbackValue: { fontSize: 18, fontWeight: '700', color: colorsApp.purple },
 
  generateBtn: {
    backgroundColor: colorsApp.purple,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  generateBtnText: { color: colorsApp.white, fontWeight: '700', fontSize: 15 },
 
  // Bottom nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colorsApp.white,
    flexDirection: 'row',
    paddingBottom: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem:            { flex: 1, alignItems: 'center' },
  navActiveIndicator: {},
  navActivePill: {
    backgroundColor: colorsApp.purple,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 2,
  },
  navLabel:       { fontSize: 10, color: '#aaa', marginTop: 3 },
  navLabelActive: { color: colorsApp.purple, fontWeight: '600' },
});