import { StatusBar } from 'expo-status-bar'
import { Linking, Platform, Pressable, StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: 'bold' }}>Bitcoin Testnet</Text>
      <Text>Don't use real coins</Text>

      <Pressable
        style={{ marginVertical: 20 }}
        onPress={() => Linking.openURL('https://github.com/ArcadeCity/WhisperVillage')}
      >
        <Text>Code & explainer: </Text>
        <Text style={{ color: 'darkblue' }}>https://github.com/ArcadeCity/WhisperVillage</Text>
      </Pressable>

      <Pressable
        style={{ marginVertical: 20 }}
        onPress={() =>
          Linking.openURL('https://github.com/ArcadeCity/WhisperVillage/wiki/Whisper-Addresses')
        }
      >
        <Text>Whisper Address explainer: </Text>
        <Text style={{ color: 'darkblue' }}>
          https://github.com/ArcadeCity/WhisperVillage/wiki/Whisper-Addresses
        </Text>
      </Pressable>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
