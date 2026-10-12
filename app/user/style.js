import { Button, StyleSheet, Text, View } from 'react-native';

export const userStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 10,
      width: '90%',
      height: 50,
      borderRadius: 50
    },
    buttons:{
      width: '20%',
      height: 80,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 20,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      shadowColor: 'gray', // Color de la sombra
      shadowOffset: { width: -20, height: -5 }, // Desplazamiento de la sombra (esquina inferior izquierda)
      shadowOpacity: 0.3, // Opacidad de la sombra
      shadowRadius: 2, // Difuminado de la sombra
      elevation: 10, // Altura de la sombra para Android
    },
    icon: {
      marginRight: 10,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
  });