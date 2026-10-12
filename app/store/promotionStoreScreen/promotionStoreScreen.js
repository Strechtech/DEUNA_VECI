import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, View, TouchableOpacity , ScrollView, Switch, TextInput } from 'react-native';
import { ViewScreen } from '../../standars/viewScreen';
import React, { useState } from "react";
import { MyIcon } from '../../standars/Icon';
import { colorsApp } from '../../../assets/data/constants';
import { promotionStoreStyles } from './style';

const PROMOS = [
  {
    id: 1,
    title: 'Promo uno cashback 10%',
    desc: 'Válido en comercios seleccionados',
    SelectedIcon: 'MaterialCommunityIcons',
    name: 'cash-multiple',
    iconBg: '#E8F5E9',
  },
  {
    id: 2,
    title: 'Cashback 5% en compras de $10 o más',
    desc: 'Se aplica automáticamente sin necesidad de cupón',
    SelectedIcon: 'Feather',
    name: 'shopping-bag',
    iconBg: '#EDE7F6',
  },
  {
    id: 3,
    title: 'Compra desde $8 y recibe 4% de cashback',
    desc: 'Tope máximo de cashback: $0.80',
    SelectedIcon: 'Feather',
    name: 'shopping-bag',
    iconBg: '#EDE7F6',
  },
];

export const PromotionStoreScreen = ({ navigation }) => {
  const [autoPromo, setAutoPromo]       = useState(false);
  const [selected, setSelected]         = useState({});
  const [totalCompra, setTotalCompra]   = useState('');
 
  const CASHBACK_RATE = 0.05;
  const cashback = parseFloat(totalCompra || '0') * CASHBACK_RATE;
 
  const togglePromo = (id) =>
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
 
  return (
    <ViewScreen>
      <View style={promotionStoreStyles.root}>
        <StatusBar style="dark" />
  
        {/* Header */}
        <View style={promotionStoreStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={promotionStoreStyles.backBtn}>
            <MyIcon SelectedIcon="Feather" name="arrow-left" color={colorsApp.purple} size={22} />
          </TouchableOpacity>
          <Text style={promotionStoreStyles.headerTitle}>Activar Promociones</Text>
          <View style={promotionStoreStyles.avatar} />
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={promotionStoreStyles.scroll}>
  
          {/* AutoPromo toggle */}
          <View style={promotionStoreStyles.autoPromoCard}>
            <View style={promotionStoreStyles.autoPromoLeft}>
              <View style={promotionStoreStyles.autoPromoIconWrap}>
                <MyIcon SelectedIcon="MaterialCommunityIcons" name="shimmer" color={colorsApp.purpleIcon} size={30} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={promotionStoreStyles.autoPromoTitle}>
                  AutoPromo: {autoPromo ? 'Activo' : 'Inactivo'}
                </Text>
                <Text style={promotionStoreStyles.autoPromoDesc}>
                  Activa para gestionar tus beneficios{' '}
                  <Text style={{ fontWeight: '700' }}>automáticamente</Text>
                </Text>
              </View>
            </View>
            <Switch
              value={autoPromo}
              onValueChange={setAutoPromo}
              trackColor={{ false: '#ccc', true: colorsApp.purple }}
              thumbColor={colorsApp.white}
            />
          </View>
  
          {/* Selección manual */}
          {!autoPromo && (
            <>
              <Text style={promotionStoreStyles.sectionLabel}>
                Selecciona las promos que quieres activar manualmente:
              </Text>
  
              {PROMOS.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={promotionStoreStyles.promoCard}
                  onPress={() => togglePromo(p.id)}
                  activeOpacity={0.8}
                >
                  <View style={[promotionStoreStyles.promoIconWrap, { backgroundColor: p.iconBg }]}>
                    <MyIcon
                      SelectedIcon={p.SelectedIcon}
                      name={p.name}
                      color={colorsApp.purpleIcon}
                      size={30}
                    />
                  </View>
                  <View style={promotionStoreStyles.promoText}>
                    <Text style={promotionStoreStyles.promoTitle}>{p.title}</Text>
                    <Text style={promotionStoreStyles.promoDesc}>{p.desc}</Text>
                  </View>
                  <View style={[promotionStoreStyles.checkbox, selected[p.id] && promotionStoreStyles.checkboxActive]}>
                    {selected[p.id] && (
                      <MyIcon SelectedIcon="Feather" name="check" color={colorsApp.white} size={14} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
  
              <Text style={promotionStoreStyles.footNote}>
                * Al activar el interruptor superior, estas opciones se ocultarán y aplicaremos todo automáticamente.
              </Text>
            </>
          )}

          {autoPromo && (
          <>
            <TouchableOpacity style={promotionStoreStyles.activarBtn} onPress={() => navigation.navigate('editPromotionStoreScreen')}>
              <Text style={promotionStoreStyles.activarBtnText}>Ver mis promociones Activas</Text>
            </TouchableOpacity>
          </>
          )}
  
          <View style={{ height: 100 }} />
        </ScrollView>
  
        {/* Bottom nav */}
        <View style={promotionStoreStyles.bottomNav}>
          {[
            { SelectedIcon: 'Feather', icon: 'home',       label: 'Home',    active: false },
            { SelectedIcon: 'Feather', icon: 'tag',        label: 'Promos',  active: true  },
            { SelectedIcon: 'Feather', icon: 'grid',       label: 'Scan',    active: false },
            { SelectedIcon: 'Feather', icon: 'briefcase',  label: 'Wallet',  active: false },
            { SelectedIcon: 'Feather', icon: 'user',       label: 'Profile', active: false },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={promotionStoreStyles.navItem}>
              {item.active && <View style={promotionStoreStyles.navActiveIndicator} />}
              <View style={item.active ? promotionStoreStyles.navActivePill : null}>
                <MyIcon
                  SelectedIcon={item.SelectedIcon}
                  name={item.icon}
                  color={item.active ? colorsApp.white : '#aaa'}
                  size={20}
                />
              </View>
              <Text style={[promotionStoreStyles.navLabel, item.active && promotionStoreStyles.navLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ViewScreen>
  );
};