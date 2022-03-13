import { useState } from 'react'
import { Button, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import * as bitcoinjs from '../lib/bitcoinjs-lib'
import { Text, View } from '../components/Themed'
import { deriveKeyFromMnemonic } from '../lib/whisper'

export default function TabTwoScreen() {
  const [seedPhrase, onChangeSeedPhrase] = useState('')
  const [whisperKey, onChangeWhisperKey] = useState('')
  const [withdrawAddress, onChangeWithdrawAddress] = useState('')
  const pressedSubmit = () => {
    console.log({ seedPhrase, whisperKey, withdrawAddress })

    // Derive the linking privkey from the seed phrase
    const linkingPrivkey = deriveKeyFromMnemonic(seedPhrase)
    console.log('Derived linking privkey:', linkingPrivkey)

    // var senderPrivkeyWif = bitcoinjs.ECPair.fromPrivateKey(Buffer.from(whisperKey, 'hex'), {
    //   network: bitcoinjs.networks.testnet,
    // }).toWIF()
  }
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
          <Button title='Submit' onPress={pressedSubmit} />
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
    color: 'black',
    backgroundColor: '#fefefe',
    borderRadius: 5,
  },
})
