import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { ViewScreen } from '../standars/viewScreen';
import { homeStyles } from './style';

export const HomeScreen = ({ navigation }) => {
  return (
    <ViewScreen>
      <View style={homeStyles.container}>
        <StatusBar style="light" />

        <Text style={homeStyles.logo}>deuna!</Text>
        <Text style={homeStyles.subtitle}>Selecciona cómo deseas ingresar</Text>

        <View style={homeStyles.buttonsContainer}>

          <TouchableOpacity
            style={homeStyles.cardOutline}
            onPress={() => navigation.navigate('Cliente')}
          >
            <View style={homeStyles.iconCircleGreen}>
              <Image
                source={require('../../assets/Images/iconoUsuario.png')}
                style={homeStyles.icon}
              />
            </View>
            <View style={homeStyles.cardText}>
              <Text style={homeStyles.cardTitleLight}>Soy Cliente</Text>
              <Text style={homeStyles.cardSubLight}>Explorar tiendas y pagar</Text>
            </View>
            <Text style={homeStyles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.cardGreen}
            onPress={() => navigation.navigate('StoreScreen')}
          >
            <View style={homeStyles.iconCirclePurple}>
              <Image
                source={require('../../assets/Images/iconoTienda.png')}
                style={homeStyles.icon}
              />
            </View>
            <View style={homeStyles.cardText}>
              <Text style={homeStyles.cardTitleDark}>Soy Dueño</Text>
              <Text style={homeStyles.cardSubDark}>Gestionar mi negocio</Text>
            </View>
            <Text style={homeStyles.arrowDark}>›</Text>
          </TouchableOpacity>

        </View>

        <View style={homeStyles.stepsContainer}>
          {['Descarga\nla app', 'Escanea\nel QR', 'Paga\ny listo'].map((label, i) => (
            <View key={i} style={homeStyles.step}>
              <View style={homeStyles.stepCircle}>
                <Text style={homeStyles.stepNumber}>{i + 1}</Text>
              </View>
              <Text style={homeStyles.stepLabel}>{label}</Text>
            </View>
          ))}
        </View>

      </View>
    </ViewScreen>
  );
};