import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from './app/login';
import { HomeNavigation } from './app/homeNavigation';
import { RewardsProvider } from './app/cliente/rewards/RewardsContext';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <RewardsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginNavigation" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeNav" component={HomeNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </RewardsProvider>
  );
}