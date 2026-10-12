import { Button, StyleSheet, Text, View } from 'react-native';

export const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: "space-between",
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#3f2a56', // Color púrpura
      paddingVertical: 15,
      marginBottom: 10,
      paddingHorizontal: 30,
      borderRadius: 25, // Bordes redondeados
      shadowColor: '#000', // Sombra (opcional)
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // Sombra en Android
    },
    buttonText: {
      color: '#fff', // Texto blanco
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });