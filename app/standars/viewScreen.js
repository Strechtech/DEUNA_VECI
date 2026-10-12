import {View } from 'react-native';
import { HeadBarSpace } from './headbarSpace';
import { StatusBar } from 'expo-status-bar';

export const ViewScreen = ({ navigation, children }) => {
  return (
    <View style={{flex:1, marginHorizontal: 5}}>
        <HeadBarSpace/>
        {children}
        <StatusBar style="auto" />
      </View>
  );
}