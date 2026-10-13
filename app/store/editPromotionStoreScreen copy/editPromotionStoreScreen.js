import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, View, TouchableOpacity , ScrollView, Switch, TextInput } from 'react-native';
import { ViewScreen } from '../../standars/viewScreen';
import React, { useState } from "react";
import { MyIcon } from '../../standars/Icon';
import { colorsApp } from '../../../assets/data/constants';
import { editPromotionStoreStyles } from './style';

const OFFERS = [
  {
    id: 1,
    tag: 'MULTI-PACK',
    tagColor: colorsApp.purple,
    title: '5% cashback hora valle → tope $1.00',
    SelectedIcon: 'Ionicons',
    name: 'brush-outline',
    iconBg: '#EDE7F6',
    borderColor: colorsApp.purple,
  },
  {
    id: 2,
    tag: 'CASHBACK',
    tagColor: '#00897B',
    title: '3% próxima visita → tope $1.00',
    SelectedIcon: 'Ionicons',
    name: 'wallet-outline',
    iconBg: '#E0F2F1',
    borderColor: '#00897B',
  },
  {
    id: 3,
    tag: 'DIRECTO',
    tagColor: '#E65100',
    title: 'Beneficio fijo por compra > $10 → $1.50 fijo',
    SelectedIcon: 'Feather',
    name: 'shopping-bag',
    iconBg: '#FBE9E7',
    borderColor: '#E65100',
  },
];

export const EditPromotionStoreScreen = ({ navigation }) => {
  return (
      <ViewScreen>
      <View style={editPromotionStoreStyles.root}>
        <StatusBar style="dark" />
  
        {/* Header */}
        <View style={editPromotionStoreStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={editPromotionStoreStyles.backBtn}>
            <MyIcon SelectedIcon="Feather" name="arrow-left" color={colorsApp.purple} size={22} />
          </TouchableOpacity>
          <Text style={editPromotionStoreStyles.headerTitle}>Promociones{'\n'}Activas</Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={editPromotionStoreStyles.scroll}>
  
          {/* Ofertas disponibles */}
          <Text style={editPromotionStoreStyles.sectionTitle}>Ofertas Disponibles</Text>
  
          {OFFERS.map((o) => (
            <View key={o.id} style={[editPromotionStoreStyles.offerCard, { borderRightColor: o.borderColor }]}>
              <View style={[editPromotionStoreStyles.offerIconWrap, { backgroundColor: o.iconBg }]}>
                <MyIcon SelectedIcon={o.SelectedIcon} name={o.name} color={o.borderColor} size={28} />
              </View>
              <View style={editPromotionStoreStyles.offerContent}>
                <View style={editPromotionStoreStyles.offerTopRow}>
                  <Text style={[editPromotionStoreStyles.offerTag, { color: o.tagColor }]}>{o.tag}</Text>
                  <View style={editPromotionStoreStyles.activaBadge}>
                    <Text style={editPromotionStoreStyles.activaBadgeText}>ACTIVA</Text>
                  </View>
                </View>
                <Text style={editPromotionStoreStyles.offerTitle}>{o.title}</Text>
              </View>
            </View>
          ))}
  
          {/* ¿Cómo funciona AutoPromo? */}
          <View style={editPromotionStoreStyles.autoPromoSection}>
            <View style={editPromotionStoreStyles.autoPromoImgWrap}>
              <View style={editPromotionStoreStyles.autoPromoImg}>
                <MyIcon SelectedIcon="Ionicons" name="phone-portrait-outline" color={colorsApp.white} size={40} />
              </View>
              <View style={editPromotionStoreStyles.checkCircle}>
                <MyIcon SelectedIcon="Feather" name="check" color={colorsApp.white} size={12} />
              </View>
            </View>
  
            <Text style={editPromotionStoreStyles.autoPromoTitle}>¿Cómo funciona AutoPromo?</Text>
            <Text style={editPromotionStoreStyles.autoPromoDesc}>
              No necesitas activar nada. Al pagar, nuestro motor de reglas evalúa las{' '}
              <Text style={editPromotionStoreStyles.bold}>3 promociones vigentes</Text>
              {' '}y selecciona automáticamente la combinación que te dé el mayor ahorro posible.
            </Text>
          </View>
  
          {/* Nota legal */}
          <View style={editPromotionStoreStyles.noteCard}>
            <MyIcon SelectedIcon="Feather" name="info" color={colorsApp.textGray} size={16} />
            <Text style={editPromotionStoreStyles.noteText}>
              Las promociones no se aplican sobre otras promociones, se aplicará la de mayor valor. Sujeto a términos y condiciones vigentes para usuarios de AutoPromo.
            </Text>
          </View>
  
          <View style={{ height: 100 }} />
        </ScrollView>
  
        {/* Bottom nav */}
        <View style={editPromotionStoreStyles.bottomNav}>
          {[
            { SelectedIcon: 'Feather', icon: 'home',      label: 'Inicio',  active: false },
            { SelectedIcon: 'Feather', icon: 'tag',       label: 'Promos',  active: true  },
            { SelectedIcon: 'Feather', icon: 'briefcase', label: 'Cartera', active: false },
            { SelectedIcon: 'Feather', icon: 'user',      label: 'Perfil',  active: false },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={editPromotionStoreStyles.navItem}>
              <View style={item.active ? editPromotionStoreStyles.navActivePill : editPromotionStoreStyles.navIconWrap}>
                <MyIcon
                  SelectedIcon={item.SelectedIcon}
                  name={item.icon}
                  color={item.active ? colorsApp.white : '#aaa'}
                  size={20}
                />
              </View>
              <Text style={[editPromotionStoreStyles.navLabel, item.active && editPromotionStoreStyles.navLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ViewScreen>
  );
};