import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../main";
import { StoreNavigation } from "../storeNavigation/storeNavigation";
import { ClienteNavigator } from "../cliente";

const Stack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen}   options={{ headerShown: false }}/>
        <Stack.Screen name="Cliente" component={ClienteNavigator}   options={{ headerShown: false }}/>
        <Stack.Screen name="StoreScreen" component={StoreNavigation}   options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}
