import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Text, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {fontsLoaded ? <Text>MEINDICA</Text> : <View />}
    </View>
  );
}
