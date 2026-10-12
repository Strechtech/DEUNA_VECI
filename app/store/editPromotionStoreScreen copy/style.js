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

export const editPromotionStoreStyles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colorsApp.bg },
 
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 14,
    gap: 10,
    backgroundColor: colorsApp.bg,
  },
  backBtn:     { paddingTop: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colorsApp.purple, lineHeight: 26 },
 
  scroll: { paddingHorizontal: 16 },
 
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colorsApp.textDark,
    marginBottom: 14,
    marginTop: 8,
  },
 
  // Offer cards
  offerCard: {
    backgroundColor: colorsApp.white,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 12,
    gap: 12,
    borderRightWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  offerIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerContent: { flex: 1 },
  offerTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  offerTag:     { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  activaBadge:  { backgroundColor: colorsApp.teal, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  activaBadgeText: { color: colorsApp.white, fontSize: 10, fontWeight: '700' },
  offerTitle:   { fontSize: 14, fontWeight: '600', color: colorsApp.textDark, lineHeight: 20 },
 
  // AutoPromo section
  autoPromoSection: {
    alignItems: 'center',
    backgroundColor: colorsApp.purpleLight,
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  autoPromoImgWrap: { position: 'relative', marginBottom: 16 },
  autoPromoImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a1040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colorsApp.teal,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colorsApp.white,
  },
  autoPromoTitle: { fontSize: 17, fontWeight: '700', color: colorsApp.purple, marginBottom: 10 },
  autoPromoDesc:  { fontSize: 13, color: colorsApp.textDark, textAlign: 'center', lineHeight: 20 },
  bold:           { fontWeight: '700' },
 
  // Nota legal
  noteCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colorsApp.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  noteText: { flex: 1, fontSize: 12, color: colorsApp.textGray, lineHeight: 18 },
 
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
  navItem:      { flex: 1, alignItems: 'center' },
  navIconWrap:  { paddingVertical: 4 },
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