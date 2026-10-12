import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, View, TouchableOpacity } from 'react-native';
import { loginStyles } from './style';
import { ViewScreen } from '../standars/viewScreen';

export const LoginScreen = ({ navigation }) => {
  return (
    <ViewScreen>
      <View style={loginStyles.container}>
        <Image
          source={require('../../assets/Images/deunaletras.png')} // URL de la imagen
          style={{width: 180,
            height: 160,}}
        />
        <Image
          source={require('../../assets/Images/QR.jpg')} // URL de la imagen
          style={{width: 225,
            height: 225,}}
        />
        <Text>Usa este QR o Nro de cuenta para cobrar</Text>
        <Image
          source={require('../../assets/Images/BotonesLogin.jpg')} // URL de la imagen
          style={{width: '100%',
            height: 100,}}
        />
        <TouchableOpacity 
          style={loginStyles.button} 
          onPress={() => navigation.navigate('HomeNav')}>
          <Text style={loginStyles.buttonText}>Seguir a la aplicación</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ViewScreen>
  );
}


