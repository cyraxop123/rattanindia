import * as Fonts from 'expo-font'
import HomeNavigation from './src/navigation/navigation';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import registerNNPushToken from 'native-notify';

export default function App() {

  registerNNPushToken(6209, 'ldAjMHFiBAsmfC6LEoZmWR');

  const [fontsLoaded] = Fonts.useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
      'Lexend-Medium': require('./assets/fonts/Lexend-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  
  return (
    <>
    <HomeNavigation />
    <Toast />
    </>
  );
}
