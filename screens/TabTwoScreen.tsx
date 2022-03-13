import { useState } from 'react'
import { Button, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import * as bitcoinjs from '../lib/bitcoinjs-lib'
import { Text, View } from '../components/Themed'
import { deriveKeyFromMnemonic, sendfromstealthaddress } from '../lib/whisper'
import { generateMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

export default function TabTwoScreen() {
  const [privateKey, onChangePrivateKey] = useState(
    '0267cc8d461861f62e356c3cd93cfdb89c0ff48fd0da8364b17e157a40971499'
  )
  // const [seedPhrase, onChangeSeedPhrase] = useState(
  //   'reward salt predict beef cabin ignore rib fever skill genre pelican oval'
  // )
  const [whisperKey, onChangeWhisperKey] = useState(
    '0f73121b5ca2fddbb29dbcaf1551d783345207520b31fa5288102d357c9c0451'
  )
  const [withdrawAddress, onChangeWithdrawAddress] = useState('mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt')
  const pressedSubmit = () => {
    console.log({ privateKey, whisperKey, withdrawAddress })

    sendfromstealthaddress(privateKey, whisperKey, withdrawAddress)
    // const seedPhrase2 = generateMnemonic(wordlist)
    // console.log('1:', JSON.stringify(seedPhrase))
    // console.log('2:', JSON.stringify(seedPhrase2))

    // Derive the linking privkey from the seed phrase
    // const linkingPrivkey = deriveKeyFromMnemonic(seedPhrase2)
    // console.log('Derived linking privkey:', linkingPrivkey)
    // privateKey
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receive</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangePrivateKey}
          value={privateKey}
          placeholder='Private Key'
        />
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangeSeedPhrase}
          value={seedPhrase}
          placeholder='Seed Phrase'
        /> */}
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
