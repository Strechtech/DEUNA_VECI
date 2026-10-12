import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { ViewScreen } from '../standars/viewScreen';
import { userStyles } from './style';
import { MyIcon } from '../standars/Icon';
import { useState } from 'react';

const userName = "Maria Andrade"

export const UserScreen = ({ navigation }) => {
  const [text, setText] = useState('');

  return (
    <ViewScreen>
      <View style={userStyles.container}>
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent: 'space-evenly', width: '100%', marginTop: 20}}>
            <View style={{backgroundColor:'#3f2a56', flexDirection: 'row', paddingHorizontal: 10, height: 40, alignItems: 'center', borderRadius: 20}}>
                <Text style={{color: 'white'}}>MA</Text>
                </View>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{userName}</Text>
            <MyIcon {...{SelectedIcon:'Feather',  name:"bell", size:30}}/>
            <MyIcon {...{SelectedIcon:'SimpleLineIcons',  name:"earphones-alt", size:30}}/>
        </View>
        <View style={userStyles.inputContainer}>
            <MyIcon {...{SelectedIcon:'EvilIcons',  name:"search", size:30}}/>
            <TextInput
            style={userStyles.textInput}
            placeholder="Ingresa texto..."
            value={text}
            onChangeText={setText}
            />
        </View>
        <Image
          source={require('../../assets/Images/saldoCuenta.jpg')} // URL de la imagen
          style={{width: 350,
            height: 120,
            margin: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 30}}
        />
        <View style={{width: '90%', marginTop: 200}}>
            <View style={{flexDirection: "row", width:'100%', justifyContent: 'space-between', marginVertical: 10}}>
                <View style={userStyles.buttons}>
                    <MyIcon {...{SelectedIcon:'FontAwesome6',  name:"money-bills", size:40}} style={{}}/>
                    <Text style={{fontSize: 14}}>Transferir</Text>
                </View>
                <View style={userStyles.buttons}>
                    <MyIcon {...{SelectedIcon:'Entypo',  name:"wallet", size:40}} style={{}}/>
                    <Text style={{fontSize: 15}}>Recargar</Text>
                </View>
                <View style={userStyles.buttons}>
                    <MyIcon {...{SelectedIcon:'Entypo',  name:"calculator", size:40}} style={{}}/>
                    <Text style={{fontSize: 16}}>Cobrar</Text>
                </View>
                <View style={userStyles.buttons}>
                    <MyIcon {...{SelectedIcon:'Fontisto',  name:"metro", size:40}} style={{}}/>
                    <Text style={{fontSize: 16}}>Metro</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", width:'100%', justifyContent: 'space-between', marginVertical: 10}}>
                <View style={userStyles.buttons}>
                    <MyIcon {...{SelectedIcon:'FontAwesome',  name:"gift", size:40}} style={{}}/>
                    <Text style={{fontSize: 16}}>Regalos</Text>
                </View>
                <View style={userStyles.buttons}>
                    <MyIcon {...{SelectedIcon:'Entypo',  name:"user", size:40}} style={{}}/>
                    <Text style={{fontSize: 16}}>Jovenes</Text>
                </View>
                <View style={userStyles.buttons}>
                    <MyIcon {...{SelectedIcon:'Ionicons',  name:"shield-checkmark", size:40}} style={{}}/>
                    <Text style={{fontSize: 16}}>Verificar</Text>
                </View>
                <TouchableOpacity style={userStyles.buttons}
                onPress={() => navigation.navigate('FinancesMScreen')}>
                    <MyIcon {...{SelectedIcon:'Entypo',  name:"line-graph", size:40}} style={{}}/>
                    <Text style={{fontSize: 17}}>Gestión</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Image
            source={require('../../assets/Images/deunaletras.png')} // URL de la imagen
            style={{width: 180,
                height: 160,}}
        />
      </View>
    </ViewScreen>
  );
}