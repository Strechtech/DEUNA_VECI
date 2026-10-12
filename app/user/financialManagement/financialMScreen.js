import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ViewScreen } from '../../standars/viewScreen';

export const FinancesScreen = ({navigation}) => {
  return (
    <ViewScreen>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.circleIcon}
        onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Gestión de finanzas</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Saldo disponible</Text>
        <Text style={styles.balanceAmount}>$1000,00</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.tabTextActive}>Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Ingresos</Text>
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Image
            source={require('../../../assets/Images/graficoGastos.jpg')} // URL de la imagen
            style={{width: 380,
                height: 230,}}
        />
      </View>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.tabTextActive}>Top gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Mis objetivos</Text>
        </TouchableOpacity>
      </View>

      {/* Expense List */}
      <View style={styles.expenseList}>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.expenseItem}>
            <View style={styles.expenseIcon} />
            <Text style={styles.expenseText}>Gasto {index + 1}</Text>
          </View>
        ))}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}
      onPress={() => navigation.navigate('ChatScreen')}>
        <Ionicons name="paper-plane" size={24} color="white" />
      </TouchableOpacity>
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#847296',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  balanceCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  balanceText: {
    fontSize: 16,
    color: '#888',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3f2a56',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#3f2a56',
  },
  tabText: {
    color: '#3f2a56',
  },
  tabTextActive: {
    color: 'white',
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    color: '#888',
  },
  chartAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  chartImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#EAEAEA',
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  expenseList: {
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  expenseIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3f2a56',
    marginRight: 10,
  },
  expenseText: {
    fontSize: 16,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3f2a56',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
