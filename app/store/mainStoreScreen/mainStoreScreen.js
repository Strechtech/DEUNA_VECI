import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ViewScreen } from '../../standars/viewScreen';
import { MyIcon } from '../../standars/Icon';
import { colorsApp } from '../../../assets/data/constants';
import { storeStyles } from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SHOPS, useRewards } from '../../cliente/rewards/RewardsContext';

const ACTIONS = [
  { SelectedIcon: 'MaterialIcons', name: 'credit-card', label: 'Cobrar QR', screen: 'MerchantQrScreen' },
  { SelectedIcon: 'Entypo', name: 'bar-graph', label: 'Estadísticas', screen: 'statisticsStoreScreen' },
  { SelectedIcon: 'Feather', name: 'gift', label: 'Promociones', screen: 'promotionStoreScreen' },
];

export const StoreScreen = ({ navigation }) => {
  const { promotions, progress, cashbackOffers, ready, loadError } = useRewards();
  const activePromotions = SHOPS.filter((shop) => promotions[shop.id].active).length;
  const activeCashbackOffers = cashbackOffers.filter((offer) => offer.active).length;
  const totalPurchases = SHOPS.reduce((total, shop) => total + progress[shop.id].total, 0);
  const totalRewards = SHOPS.reduce((total, shop) => total + progress[shop.id].rewards, 0);

  const openRoute = (route) => navigation.navigate(route);

  return (
    <ViewScreen>
      <View style={storeStyles.root}>
        <StatusBar style="dark" />
        <View style={storeStyles.header}>
          <View style={storeStyles.headerLeft}>
            <View style={storeStyles.avatar}>
              <Ionicons name="storefront-outline" size={21} color={colorsApp.purple} />
            </View>
            <View>
              <Text style={storeStyles.headerEyebrow}>PANEL DEL LOCAL</Text>
              <Text style={storeStyles.headerTitle}>Mi negocio</Text>
            </View>
          </View>
          <View style={storeStyles.openStatus}>
            <View style={storeStyles.openStatusDot} />
            <Text style={storeStyles.openStatusText}>Mi Veci</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={storeStyles.scroll}
        >
          <View style={storeStyles.balanceCard}>
            <Text style={storeStyles.balanceLabel}>SALDO DISPONIBLE</Text>
            <Text style={storeStyles.balanceAmount}>$22.62 <Text style={storeStyles.balanceCurrency}>USD</Text></Text>
            <Text style={storeStyles.balanceNote}>Saldo de demostración</Text>
          </View>

          <View style={storeStyles.actionsGrid}>
            {ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.screen}
                accessibilityRole="button"
                style={storeStyles.actionItem}
                onPress={() => openRoute(action.screen)}
              >
                <View style={storeStyles.actionIconWrap}>
                  <MyIcon
                    SelectedIcon={action.SelectedIcon}
                    name={action.name}
                    color={colorsApp.purpleIcon}
                    size={25}
                  />
                </View>
                <Text style={storeStyles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={storeStyles.sectionHeader}>
            <View>
              <Text style={storeStyles.sectionTitle}>Ofertas para tus clientes</Text>
              <Text style={storeStyles.sectionSub}>Cashback de ejemplo · {ready ? activeCashbackOffers : '—'} activas</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => openRoute('promotionStoreScreen')}
            >
              <Text style={storeStyles.sectionLink}>Gestionar</Text>
            </TouchableOpacity>
          </View>

          {loadError ? (
            <View style={storeStyles.cashbackError}>
              <Ionicons name="alert-circle-outline" size={20} color="#A63B4C" />
              <Text style={storeStyles.cashbackErrorText}>{loadError}</Text>
            </View>
          ) : cashbackOffers.map((offer) => {
            const shop = SHOPS.find((item) => item.id === offer.shopId);
            return (
              <TouchableOpacity
                key={offer.id}
                accessibilityRole="button"
                accessibilityLabel={`Editar oferta ${offer.title}`}
                style={storeStyles.cashbackShopCard}
                onPress={() => openRoute('promotionStoreScreen')}
              >
                <View style={[storeStyles.cashbackShopIcon, { backgroundColor: `${shop.color}1A` }]}>
                  <Ionicons name="pricetag-outline" size={20} color={shop.color} />
                </View>
                <View style={storeStyles.cashbackShopCopy}>
                  <View style={storeStyles.cashbackShopTitleRow}>
                    <Text style={storeStyles.cashbackShopName}>{offer.title}</Text>
                    <View style={[
                      storeStyles.cashbackState,
                      offer.active ? storeStyles.cashbackStateOn : storeStyles.cashbackStateOff,
                    ]}>
                      <Text style={[
                        storeStyles.cashbackStateText,
                        offer.active ? storeStyles.cashbackStateTextOn : storeStyles.cashbackStateTextOff,
                      ]}>
                        {offer.active ? 'Activa' : 'Pausada'}
                      </Text>
                    </View>
                  </View>
                  <Text style={storeStyles.cashbackShopDetail}>
                    {shop.name} · {offer.percent}% cashback · demostración
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#91899D" />
              </TouchableOpacity>
            );
          })}

          <View style={storeStyles.sectionHeader}>
            <View>
              <Text style={storeStyles.sectionTitle}>Metas de fidelidad</Text>
              <Text style={storeStyles.sectionSub}>Compras y premios por local</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => openRoute('promotionStoreScreen')}
            >
              <Text style={storeStyles.sectionLink}>Gestionar</Text>
            </TouchableOpacity>
          </View>

          {loadError ? null : SHOPS.map((shop) => {
            const promotion = promotions[shop.id];
            const shopProgress = progress[shop.id];
            return (
              <TouchableOpacity
                key={shop.id}
                accessibilityRole="button"
                accessibilityLabel={`Gestionar cashback de ${shop.name}`}
                style={storeStyles.cashbackShopCard}
                onPress={() => openRoute('promotionStoreScreen')}
              >
                <View style={[storeStyles.cashbackShopIcon, { backgroundColor: `${shop.color}1A` }]}>
                  <Ionicons name={shop.icon} size={22} color={shop.color} />
                </View>
                <View style={storeStyles.cashbackShopCopy}>
                  <View style={storeStyles.cashbackShopTitleRow}>
                    <Text style={storeStyles.cashbackShopName}>{shop.name}</Text>
                    <View style={[
                      storeStyles.cashbackState,
                      promotion.active ? storeStyles.cashbackStateOn : storeStyles.cashbackStateOff,
                    ]}>
                      <Text style={[
                        storeStyles.cashbackStateText,
                        promotion.active ? storeStyles.cashbackStateTextOn : storeStyles.cashbackStateTextOff,
                      ]}>
                        {promotion.active ? 'Activa' : 'Pausada'}
                      </Text>
                    </View>
                  </View>
                  <Text style={storeStyles.cashbackShopDetail}>
                    {promotion.active
                      ? `${promotion.reward} · ${shopProgress.current}/${promotion.goal} compras`
                      : 'Activa la promoción para sumar compras'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#91899D" />
              </TouchableOpacity>
            );
          })}

          <View style={storeStyles.sectionHeader}>
            <View>
              <Text style={storeStyles.sectionTitle}>Resultados</Text>
              <Text style={storeStyles.sectionSub}>Actividad de Mi Veci</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => openRoute('statisticsStoreScreen')}
            >
              <Text style={storeStyles.sectionLink}>Ver más</Text>
            </TouchableOpacity>
          </View>
          <View style={storeStyles.resultsCard}>
            <View style={storeStyles.resultItem}>
              <Text style={storeStyles.resultValue}>{ready ? totalPurchases : '—'}</Text>
              <Text style={storeStyles.resultLabel}>Compras registradas</Text>
            </View>
            <View style={storeStyles.resultDivider} />
            <View style={storeStyles.resultItem}>
              <Text style={storeStyles.resultValue}>{ready ? totalRewards : '—'}</Text>
              <Text style={storeStyles.resultLabel}>Premios entregados</Text>
            </View>
            <View style={storeStyles.resultDivider} />
            <View style={storeStyles.resultItem}>
              <Text style={storeStyles.resultValue}>{ready ? `${activePromotions}/${SHOPS.length}` : '—'}</Text>
              <Text style={storeStyles.resultLabel}>Metas activas</Text>
            </View>
          </View>
        </ScrollView>

        <View style={storeStyles.bottomNav}>
          {[
            { icon: 'home-outline', label: 'Inicio', route: 'MainScreen', active: true },
            { icon: 'gift-outline', label: 'Promociones', route: 'promotionStoreScreen' },
            { icon: 'qr-code-outline', label: 'Cobrar', route: 'MerchantQrScreen' },
            { icon: 'bar-chart-outline', label: 'Resultados', route: 'statisticsStoreScreen' },
          ].map((item) => (
            <TouchableOpacity
              key={item.route}
              accessibilityRole="button"
              accessibilityState={{ selected: Boolean(item.active) }}
              style={storeStyles.navItem}
              onPress={() => openRoute(item.route)}
            >
              {item.active && <View style={storeStyles.navActiveIndicator} />}
              <Ionicons
                name={item.icon}
                size={20}
                color={item.active ? colorsApp.purple : '#999'}
              />
              <Text style={[storeStyles.navLabel, item.active && storeStyles.navLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ViewScreen>
  );
};