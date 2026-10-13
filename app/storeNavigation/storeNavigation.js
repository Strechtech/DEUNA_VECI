import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StoreScreen } from "../store/mainStoreScreen/mainStoreScreen";
import { PromotionStoreScreen } from "../store/promotionStoreScreen/promotionStoreScreen";
import { EditPromotionStoreScreen } from "../store/editPromotionStoreScreen copy/editPromotionStoreScreen";
import { StatisticsStoreScreen } from "../store/statisticsStoreScreen/statisticsStoreScreen";
import { MerchantQrScreen } from "../store/merchantQrScreen";
const Stack = createNativeStackNavigator();

export const StoreNavigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="MainScreen"           component={StoreScreen}            options={{ headerShown: false }}/>
        <Stack.Screen name="promotionStoreScreen" component={PromotionStoreScreen}   options={{ headerShown: false }}/>
        <Stack.Screen name="statisticsStoreScreen" component={StatisticsStoreScreen}   options={{ headerShown: false }}/>
        <Stack.Screen name="editPromotionStoreScreen" component={EditPromotionStoreScreen}   options={{ headerShown: false }}/>
        <Stack.Screen name="MerchantQrScreen" component={MerchantQrScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}
