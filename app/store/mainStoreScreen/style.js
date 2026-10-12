import { Button, StyleSheet, Text, View } from 'react-native';

const PURPLE      = '#5B2D8E';
const PURPLE_DARK = '#3d1f6e';
const PURPLE_CARD = '#7B3FB5';
const TEAL        = '#2DD4BF';
const BG          = '#F3F0F8';
const WHITE       = '#FFFFFF';

export const storeStyles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
 
  // Header
  header: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 14,
  },
  headerLeft:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar:      { width: 38, height: 38, borderRadius: 19, backgroundColor: '#ccc' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: PURPLE },
  bellBtn:     { padding: 6 },
  bellIcon:    { fontSize: 20 },
 
  scroll: { paddingHorizontal: 16 },
 
  // Balance card
  balanceCard: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    padding: 24,
    marginTop: 16,
    marginBottom: 20,
  },
  balanceLabel:    { color: 'rgba(255,255,255,0.7)', fontSize: 11, letterSpacing: 1.2, marginBottom: 6 },
  balanceAmount:   { color: WHITE, fontSize: 38, fontWeight: '700' },
  balanceCurrency: { fontSize: 18, fontWeight: '400' },
  rechargeBtn: {
    backgroundColor: TEAL,
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 16,
  },
  rechargeBtnText: { color: PURPLE_DARK, fontWeight: '700', fontSize: 14 },
 
  // Actions grid
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  actionItem: {
    width: '22%',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 4,
  },
  newBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: TEAL,
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
    zIndex: 1,
  },
  newBadgeText:  { fontSize: 7, fontWeight: '700', color: PURPLE_DARK },
  actionIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon:  { fontSize: 22 },
  actionLabel: { fontSize: 10, color: '#444', textAlign: 'center', lineHeight: 13 },
 
  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  sectionSub:   { fontSize: 12, color: '#888', marginTop: 2 },
  sectionLink:  { fontSize: 13, color: PURPLE, fontWeight: '600' },
 
  // Promos
  promoScroll: { marginBottom: 28 },
  promoCard: {
    width: 240,
    borderRadius: 16,
    marginRight: 14,
    overflow: 'hidden',
    height: 200,
    justifyContent: 'flex-end',
  },
  discountBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: TEAL,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  discountText: { color: PURPLE_DARK, fontWeight: '700', fontSize: 12 },
  promoInfo:    { padding: 14, backgroundColor: 'rgba(0,0,0,0.3)' },
  promoTitle:   { color: WHITE, fontWeight: '700', fontSize: 15, marginBottom: 4 },
  promoDesc:    { color: 'rgba(255,255,255,0.75)', fontSize: 12, lineHeight: 16 },
  promoExpiry:  { marginTop: 8 },
  promoExpiryText: { color: TEAL, fontSize: 11, fontWeight: '600' },
 
  // Activity
  activityList: {
    backgroundColor: WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIconText: { fontSize: 20 },
  activityInfo:     { flex: 1 },
  activityName:     { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  activitySub:      { fontSize: 12, color: '#999', marginTop: 2 },
  activityAmount:   { fontSize: 15, fontWeight: '700' },
 
  // Bottom nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
    flexDirection: 'row',
    paddingBottom: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: { flex: 1, alignItems: 'center', position: 'relative' },
  navActiveIndicator: {
    position: 'absolute',
    top: -10,
    width: 40,
    height: 3,
    backgroundColor: PURPLE,
    borderRadius: 2,
  },
  navIcon:        { fontSize: 20, marginBottom: 3 },
  navIconActive:  {},
  navLabel:       { fontSize: 10, color: '#aaa' },
  navLabelActive: { color: PURPLE, fontWeight: '600' },
});