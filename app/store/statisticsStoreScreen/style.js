import { Button, StyleSheet, Text, View } from 'react-native';

const colorsApp = {
  purple:      '#5B2D8E',
  purpleDark:  '#3d1f6e',
  purpleLight: '#EDE7F6',
  teal:        '#2DD4BF',
  bg:          '#F3F0F8',
  white:       '#FFFFFF',
  textDark:    '#1a1a1a',
  textGray:    '#888',
  red:         '#E53935',
  green:       '#43A047',
};

const MAX_BAR_H = 100;

export const statisticsStoreStyles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colorsApp.bg },
 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 10,
    backgroundColor: colorsApp.bg,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colorsApp.purple },
 
  scroll: { paddingHorizontal: 16, paddingTop: 8 },
 
  // Portfolio
  portfolioLabel: { fontSize: 11, color: colorsApp.textGray, letterSpacing: 1, marginBottom: 4 },
  portfolioAmount: { fontSize: 32, fontWeight: '800', color: colorsApp.textDark, marginBottom: 10 },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colorsApp.teal,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
    marginBottom: 20,
  },
  growthText: { color: colorsApp.white, fontSize: 12, fontWeight: '600' },
 
  // Card
  card: {
    backgroundColor: colorsApp.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colorsApp.textDark, marginBottom: 16 },
 
  // Bar chart
  chartWrap: { 
    flexDirection: 'row', 
    alignItems: 'flex-end',  // ← clave: alinea desde abajo
    height: MAX_BAR_H + 30,  // altura fija en px
    gap: 6 
  },
  barCol:    { flex: 1, alignItems: 'center', gap: 6 },
  barBg:     { flex: 1, width: '100%', justifyContent: 'flex-end' },
  bar:       { width: '100%', borderRadius: 6 },
  barLabel:  { fontSize: 10, color: colorsApp.textGray },
 
  // Savings card
  savingsCard: {
    backgroundColor: colorsApp.purple,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  savingsTitle:  { color: colorsApp.white, fontSize: 18, fontWeight: '700', marginTop: 8 },
  savingsGoal:   { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2, marginBottom: 12 },
  savingsAmount: { color: colorsApp.white, fontSize: 28, fontWeight: '800', marginBottom: 14 },
  progressBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 4,
  },
  progressFill: {
    height: 8,
    backgroundColor: colorsApp.teal,
    borderRadius: 4,
  },
 
  // Veci header
  veciHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  veciTitle:      { fontSize: 18, fontWeight: '700', color: colorsApp.textDark, lineHeight: 24 },
  viewDetailsBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewDetailsText:{ fontSize: 12, color: colorsApp.purple, fontWeight: '600', textAlign: 'right' },
 
  // Stat cards
  statCard: {
    backgroundColor: colorsApp.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statSubLabel: { fontSize: 12, color: colorsApp.textGray, marginBottom: 4 },
  statValue:    { fontSize: 22, fontWeight: '700', color: colorsApp.textDark },
  statRow:      { flexDirection: 'row', alignItems: 'center' },
  statSeparator:{ fontSize: 18, color: colorsApp.textGray, marginHorizontal: 4 },
 
  // Impact card
  impactCard: {
    backgroundColor: colorsApp.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  impactTitle: { fontSize: 16, fontWeight: '700', color: colorsApp.textDark, marginBottom: 20 },
 
  // Donut
  donutWrap:  { alignItems: 'center', marginBottom: 20 },
  donutOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 16,
    borderColor: colorsApp.purple,
    borderTopColor: colorsApp.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInner:   { alignItems: 'center' },
  donutPercent: { fontSize: 24, fontWeight: '800', color: colorsApp.textDark },
  donutLabel:   { fontSize: 9, color: colorsApp.textGray, letterSpacing: 0.5 },
 
  // Legend
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  legendDot:  { width: 10, height: 10, borderRadius: 5 },
  legendKey:  { flex: 1, fontSize: 12, color: colorsApp.textDark, fontWeight: '500' },
  legendVal:  { fontSize: 12, color: colorsApp.textGray },
  legendBar:  { height: 4, backgroundColor: colorsApp.purpleLight, borderRadius: 2, marginBottom: 4 },
  legendBarFill: { height: 4, borderRadius: 2 },
 
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
  navItem:       { flex: 1, alignItems: 'center' },
  navIconWrap:   { paddingVertical: 4 },
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