import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, View, TouchableOpacity , ScrollView } from 'react-native';
import { ViewScreen } from '../../standars/viewScreen';
import { MyIcon } from '../../standars/Icon';
import { colorsApp } from '../../../assets/data/constants';
import { storeStyles } from './style';

const ACTIONS = [
  { SelectedIcon: 'Feather',      name: 'send',          label: 'Transferir' },
  { SelectedIcon: 'Feather',      name: 'battery-charging', label: 'Recargar' },
  { SelectedIcon: 'MaterialIcons',name: 'credit-card',   label: 'Cobrar'},
  { SelectedIcon: 'Entypo',       name: 'bar-graph',     label: 'Estadísictas' , isNew: true , screen:'statisticsStoreScreen' },
  { SelectedIcon: 'Feather',      name: 'gift',          label: 'Invita y\nGana' },
  { SelectedIcon: 'MaterialIcons',name: 'train',         label: 'Metro de\nQuito' },
  { SelectedIcon: 'Feather',      name: 'check-circle',  label: 'Verificar\npago' },
  { SelectedIcon: 'MaterialIcons',name: 'storefront',    label: 'Mi Veci\nPromo', isNew: true , screen:'promotionStoreScreen' },
];

const PROMOS = [
  {
    title: 'Noche de Sushi',
    desc: 'Aplica en locales seleccionados pagando con Ethereal.',
    discount: '30% OFF',
    expires: 'Termina en 2 días',
    bg: '#1a0a2e',
  },
  {
    title: 'Super Fresh',
    desc: 'Recarga con código y obtén descuento en tu compra.',
    discount: 'CA...',
    expires: '⭐ Favorito',
    bg: '#0f3d1a',
  },
];

const ACTIVITY = [
  { icon: '🛍', name: 'Tienda Mango',  sub: 'Hoy, 10:45 AM',   amount: '-$45.00', neg: true },
  { icon: '↙', name: 'De: Maria Lopez', sub: 'Ayer, 08:20 PM', amount: '+$12.50', neg: false },
];
 


export const StoreScreen = ({ navigation }) => {
  return (
    <ViewScreen>
        <View style={storeStyles.root}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={storeStyles.header}>
            <View style={storeStyles.headerLeft}>
                <View style={storeStyles.avatar} />
                <Text style={storeStyles.headerTitle}>Ethereal Ledger</Text>
            </View>
            <TouchableOpacity style={storeStyles.bellBtn}>
                <Text style={storeStyles.bellIcon}>🔔</Text>
            </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={storeStyles.scroll}>

            {/* Balance card */}
            <View style={storeStyles.balanceCard}>
                <Text style={storeStyles.balanceLabel}>SALDO DISPONIBLE</Text>
                <Text style={storeStyles.balanceAmount}>$22.62 <Text style={storeStyles.balanceCurrency}>USD</Text></Text>
                <TouchableOpacity style={storeStyles.rechargeBtn}>
                <Text style={storeStyles.rechargeBtnText}>＋  Recargar</Text>
                </TouchableOpacity>
            </View>

            {/* Quick actions grid */}
            <View style={storeStyles.actionsGrid}>
                {ACTIONS.map((a, i) => (
                <TouchableOpacity key={i} style={storeStyles.actionItem} onPress={() => a.isNew && navigation.navigate(a.screen)}>
                    {a.isNew && <View style={storeStyles.newBadge}><Text style={storeStyles.newBadgeText}>NUEVO</Text></View>}
                    <View style={storeStyles.actionIconWrap}>
                        <MyIcon {...{SelectedIcon:a.SelectedIcon,  name:a.name, color:colorsApp.purpleIcon, size:30}}/>
                    </View>
                    <Text style={storeStyles.actionLabel}>{a.label}</Text>
                </TouchableOpacity>
                ))}
            </View>

            {/* Promociones */}
            <View style={storeStyles.sectionHeader}>
                <View>
                <Text style={storeStyles.sectionTitle}>Mis promociones</Text>
                <Text style={storeStyles.sectionSub}>Descuentos exclusivos para ti</Text>
                </View>
                <TouchableOpacity><Text style={storeStyles.sectionLink}>Ver todas</Text></TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={storeStyles.promoScroll}>
                {PROMOS.map((p, i) => (
                <View key={i} style={[storeStyles.promoCard, { backgroundColor: p.bg }]}>
                    <View style={storeStyles.discountBadge}>
                    <Text style={storeStyles.discountText}>{p.discount}</Text>
                    </View>
                    <View style={storeStyles.promoInfo}>
                    <Text style={storeStyles.promoTitle}>{p.title}</Text>
                    <Text style={storeStyles.promoDesc}>{p.desc}</Text>
                    <View style={storeStyles.promoExpiry}>
                        <Text style={storeStyles.promoExpiryText}>🕐 {p.expires}</Text>
                    </View>
                    </View>
                </View>
                ))}
            </ScrollView>

            {/* Actividad reciente */}
            <View style={storeStyles.sectionHeader}>
                <Text style={storeStyles.sectionTitle}>Actividad reciente</Text>
                <TouchableOpacity><Text style={storeStyles.sectionLink}>Ver historial</Text></TouchableOpacity>
            </View>

            <View style={storeStyles.activityList}>
                {ACTIVITY.map((a, i) => (
                <View key={i} style={storeStyles.activityItem}>
                    <View style={[storeStyles.activityIcon, { backgroundColor: a.neg ? '#e8f5e9' : '#ede7f6' }]}>
                    <Text style={storeStyles.activityIconText}>{a.icon}</Text>
                    </View>
                    <View style={storeStyles.activityInfo}>
                    <Text style={storeStyles.activityName}>{a.name}</Text>
                    <Text style={storeStyles.activitySub}>{a.sub}</Text>
                    </View>
                    <Text style={[storeStyles.activityAmount, { color: a.neg ? '#e53935' : '#43a047' }]}>
                    {a.amount}
                    </Text>
                </View>
                ))}
            </View>

            <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom nav */}
            <View style={storeStyles.bottomNav}>
            {[
                { icon: '🏠', label: 'Home',    active: true },
                { icon: '🏷',  label: 'Promos',  active: false },
                { icon: '⊞',  label: 'Scan',    active: false },
                { icon: '👛', label: 'Wallet',  active: false },
                { icon: '👤', label: 'Profile', active: false },
            ].map((item, i) => (
                <TouchableOpacity key={i} style={storeStyles.navItem}>
                {item.active && <View style={storeStyles.navActiveIndicator} />}
                <Text style={[storeStyles.navIcon, item.active && storeStyles.navIconActive]}>{item.icon}</Text>
                <Text style={[storeStyles.navLabel, item.active && storeStyles.navLabelActive]}>{item.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
    </ViewScreen>
  );
};