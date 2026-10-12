import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, View, TouchableOpacity , ScrollView, Switch, TextInput } from 'react-native';
import { ViewScreen } from '../../standars/viewScreen';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import React, { useState } from "react";
import { MyIcon } from '../../standars/Icon';
import { colorsApp } from '../../../assets/data/constants';
import { statisticsStoreStyles } from './style';

const BARS = [
  { day: 'Mon', h: 40 },
  { day: 'Tue', h: 55 },
  { day: 'Wed', h: 35 },
  { day: 'Thu', h: 65 },
  { day: 'Fri', h: 100 },
  { day: 'Sat', h: 50 },
  { day: 'Sun', h: 45 },
];

const BAR_CHART_H = 120;
const BAR_WIDTH   = 28;
const GAP         = 14;
const CHART_W     = (BAR_WIDTH + GAP) * BARS.length;

const MAX_BAR_H = 100;

const SpendingChart = () => (
  <Svg width={CHART_W} height={BAR_CHART_H + 24}>
    {BARS.map((b, i) => {
      const barH   = (b.h / 100) * BAR_CHART_H;
      const x      = i * (BAR_WIDTH + GAP);
      const y      = BAR_CHART_H - barH;
      const isFri  = b.day === 'Fri';
      return (
        <React.Fragment key={i}>
          <Rect
            x={x}
            y={y}
            width={BAR_WIDTH}
            height={barH}
            rx={6}
            fill={isFri ? '#5B2D8E' : '#EDE7F6'}
          />
          <SvgText
            x={x + BAR_WIDTH / 2}
            y={BAR_CHART_H + 16}
            fontSize={10}
            fill={isFri ? '#5B2D8E' : '#888'}
            fontWeight={isFri ? '700' : '400'}
            textAnchor="middle"
          >
            {b.day}
          </SvgText>
        </React.Fragment>
      );
    })}
  </Svg>
);

export const StatisticsStoreScreen = ({ navigation }) => {
  const savingsProgress = 1850 / 2500;
 
  return (
    <View style={statisticsStoreStyles.root}>
      <StatusBar style="dark" />
 
      {/* Header */}
      <View style={statisticsStoreStyles.header}>
        <MyIcon SelectedIcon="Feather" name="menu" color={colorsApp.purple} size={24} />
        <Text style={statisticsStoreStyles.headerTitle}>Statistics</Text>
        <MyIcon SelectedIcon="Feather" name="bell" color={colorsApp.purple} size={22} />
      </View>
 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={statisticsStoreStyles.scroll}>
 
        {/* Portfolio overview */}
        <Text style={statisticsStoreStyles.portfolioLabel}>PORTFOLIO OVERVIEW</Text>
        <Text style={statisticsStoreStyles.portfolioAmount}>$42,580.00</Text>
        <View style={statisticsStoreStyles.growthBadge}>
          <MyIcon SelectedIcon="Feather" name="trending-up" color={colorsApp.white} size={13} />
          <Text style={statisticsStoreStyles.growthText}>+12.4% this month</Text>
        </View>
 
        {/* Spending Analysis */}
        <View style={statisticsStoreStyles.card}>
          <Text style={statisticsStoreStyles.cardTitle}>Spending Analysis</Text>
          <View style={{ alignItems: 'center' }}>
            <SpendingChart />
          </View>
        </View>
 
        {/* Monthly Savings */}
        <View style={statisticsStoreStyles.savingsCard}>
          <MyIcon SelectedIcon="MaterialCommunityIcons" name="shimmer" color={colorsApp.white} size={28} />
          <Text style={statisticsStoreStyles.savingsTitle}>Monthly Savings</Text>
          <Text style={statisticsStoreStyles.savingsGoal}>Goal: $2,500</Text>
          <Text style={statisticsStoreStyles.savingsAmount}>$1,850</Text>
          {/* Progress bar */}
          <View style={statisticsStoreStyles.progressBg}>
            <View style={[statisticsStoreStyles.progressFill, { width: `${savingsProgress * 100}%` }]} />
          </View>
        </View>
 
        {/* Estadísticas Veci Promo header */}
        <View style={statisticsStoreStyles.veciHeader}>
          <Text style={statisticsStoreStyles.veciTitle}>Estadísticas Veci{'\n'}Promo</Text>
          <TouchableOpacity style={statisticsStoreStyles.viewDetailsBtn}>
            <Text style={statisticsStoreStyles.viewDetailsText}>View{'\n'}Details</Text>
            <MyIcon SelectedIcon="Feather" name="arrow-right" color={colorsApp.purple} size={16} />
          </TouchableOpacity>
        </View>
 
        {/* Stat: Clients reached */}
        <View style={statisticsStoreStyles.statCard}>
          <View style={[statisticsStoreStyles.statIconWrap, { backgroundColor: colorsApp.purpleLight }]}>
            <MyIcon SelectedIcon="MaterialCommunityIcons" name="account-group" color={colorsApp.purple} size={26} />
          </View>
          <Text style={statisticsStoreStyles.statSubLabel}>Clients reached</Text>
          <Text style={statisticsStoreStyles.statValue}>491</Text>
        </View>
 
        {/* Stat: Costo/Ganancia */}
        <View style={statisticsStoreStyles.statCard}>
          <View style={[statisticsStoreStyles.statIconWrap, { backgroundColor: '#E0F2F1' }]}>
            <MyIcon SelectedIcon="MaterialCommunityIcons" name="wallet-outline" color={colorsApp.teal} size={26} />
          </View>
          <Text style={statisticsStoreStyles.statSubLabel}>Costo/Ganancia Estimado</Text>
          <View style={statisticsStoreStyles.statRow}>
            <Text style={[statisticsStoreStyles.statValue, { color: colorsApp.red }]}>$135</Text>
            <Text style={statisticsStoreStyles.statSeparator}> / </Text>
            <Text style={[statisticsStoreStyles.statValue, { color: colorsApp.green }]}>+$256</Text>
          </View>
        </View>
 
        {/* Stat: Projected recurrence */}
        <View style={statisticsStoreStyles.statCard}>
          <View style={[statisticsStoreStyles.statIconWrap, { backgroundColor: '#FFF3E0' }]}>
            <MyIcon SelectedIcon="Feather" name="refresh-cw" color="#E65100" size={22} />
          </View>
          <Text style={statisticsStoreStyles.statSubLabel}>Projected recurrence</Text>
          <Text style={[statisticsStoreStyles.statValue, { color: colorsApp.yellow }]}>+27.6%</Text>
        </View>
 
        {/* Expected impact */}
        <View style={statisticsStoreStyles.impactCard}>
          <Text style={statisticsStoreStyles.impactTitle}>Expected impact of the campaign</Text>
 
          {/* Donut chart */}
          <View style={statisticsStoreStyles.donutWrap}>
            <View style={statisticsStoreStyles.donutOuter}>
              <View style={statisticsStoreStyles.donutInner}>
                <Text style={statisticsStoreStyles.donutPercent}>75%</Text>
                <Text style={statisticsStoreStyles.donutLabel}>SUCCESS RATE</Text>
              </View>
            </View>
          </View>
 
          {/* Legends */}
          <View style={statisticsStoreStyles.legendRow}>
            <View style={[statisticsStoreStyles.legendDot, { backgroundColor: colorsApp.purple }]} />
            <Text style={statisticsStoreStyles.legendKey}>Ventas adicionales</Text>
            <Text style={statisticsStoreStyles.legendVal}>$1.472</Text>
          </View>
          <View style={statisticsStoreStyles.legendBar}>
            <View style={[statisticsStoreStyles.legendBarFill, { width: '80%', backgroundColor: colorsApp.purple }]} />
          </View>
 
          <View style={[statisticsStoreStyles.legendRow, { marginTop: 10 }]}>
            <View style={[statisticsStoreStyles.legendDot, { backgroundColor: colorsApp.teal }]} />
            <Text style={statisticsStoreStyles.legendKey}>Uso actual Deuna</Text>
            <Text style={statisticsStoreStyles.legendVal}>62.9%</Text>
          </View>
          <View style={statisticsStoreStyles.legendBar}>
            <View style={[statisticsStoreStyles.legendBarFill, { width: '75%', backgroundColor: colorsApp.teal }]} />
          </View>

          <View style={[statisticsStoreStyles.legendRow, { marginTop: 10 }]}>
            <View style={[statisticsStoreStyles.legendDot, { backgroundColor: colorsApp.yellow }]} />
            <Text style={statisticsStoreStyles.legendKey}>Ticket promedio</Text>
            <Text style={statisticsStoreStyles.legendVal}>$10.90</Text>
          </View>
          <View style={statisticsStoreStyles.legendBar}>
            <View style={[statisticsStoreStyles.legendBarFill, { width: '70%', backgroundColor: colorsApp.yellow }]} />
          </View>
        </View>
 
        <View style={{ height: 100 }} />
      </ScrollView>
 
      {/* Bottom nav */}
      <View style={statisticsStoreStyles.bottomNav}>
        {[
          { SelectedIcon: 'Feather', icon: 'home',       label: 'Home',      active: false },
          { SelectedIcon: 'Feather', icon: 'bar-chart-2',label: 'Analytics', active: true  },
          { SelectedIcon: 'Feather', icon: 'briefcase',  label: 'Wallet',    active: false },
          { SelectedIcon: 'Feather', icon: 'user',       label: 'Profile',   active: false },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={statisticsStoreStyles.navItem}>
            <View style={item.active ? statisticsStoreStyles.navActivePill : statisticsStoreStyles.navIconWrap}>
              <MyIcon
                SelectedIcon={item.SelectedIcon}
                name={item.icon}
                color={item.active ? colorsApp.white : '#aaa'}
                size={20}
              />
            </View>
            <Text style={[statisticsStoreStyles.navLabel, item.active && statisticsStoreStyles.navLabelActive]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};