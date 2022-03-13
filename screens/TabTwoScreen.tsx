import { useState } from 'react'
import { Button, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { Text, View } from '../components/Themed'

export default function TabTwoScreen() {
  const [seedPhrase, onChangeSeedPhrase] = useState('')
  const [whisperKey, onChangeWhisperKey] = useState('')
  const [withdrawAddress, onChangeWithdrawAddress] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receive</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSeedPhrase}
          value={seedPhrase}
          placeholder='Seed Phrase'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeWhisperKey}
          value={whisperKey}
          placeholder='Whisper Key'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeWithdrawAddress}
          value={withdrawAddress}
          placeholder='Withdraw Address (BTC)'
        />
        <View
          style={{
            marginTop: 25,
            marginHorizontal: 50,
          }}
        >
          <Button title='Submit' onPress={() => console.log('Submit pressed')} />
        </View>
      </SafeAreaView>
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
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    backgroundColor: '#222',
    borderRadius: 5,
  },
})
