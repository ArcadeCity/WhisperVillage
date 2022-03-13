import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from '../components/Themed'
import { DEMO_PUBKEY_1, getEphkey, sendtostealthaddress } from '../lib/whisper'
import { RootTabScreenProps } from '../types'
import { FeedConversation } from '../components/FeedConversation'
import { images } from '../lib/images'
import { generateMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [ephKeypair, setEphKeypair] = useState<any>()
  useEffect(() => {
    const mnemonic = generateMnemonic(wordlist)
    const kp = getEphkey(44, 0, mnemonic)
    console.log(kp)
    setEphKeypair(kp)
    conversations.forEach((conversation) => {
      const addr = sendtostealthaddress(conversation.linkingKey, kp.ephemeralpubkey)
      conversation.stealthAddress = addr
      console.log(conversation)
    })
    // logWalkthrough()
  }, [])
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.containerStyle}>
      {/* <Text style={styles.title}>Send</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <Text style={{ marginBottom: 10 }}>Demo ephemeral pubkey:</Text>
      <Text style={{ marginBottom: 20 }}>{DEMO_PUBKEY_2}</Text>
      <View style={{ backgroundColor: '#888', padding: 20, borderRadius: 10, marginBottom: 30 }}>
        <Text style={{ marginBottom: 30, fontSize: 20 }}>Alice</Text>
        <Text style={{ marginBottom: 5 }}>Linking key:</Text>
        <Text>{DEMO_PUBKEY_1}</Text>
        <Button title='Generate stealth address' onPress={() => console.log('ehehehe')} />
      </View> */}
      {conversations.map((conversation) => {
        return <FeedConversation key={conversation.id} conversation={conversation} />
      })}
      <Text style={{ marginBottom: 20, color: 'black' }}>
        Ephemeral pubkey: {ephKeypair?.ephemeralpubkey ?? 'loading...'}
      </Text>
      <Text style={{ marginBottom: 40, color: 'black' }}>
        Ephemeral privkey: {ephKeypair?.ephemeralprivkey ?? 'loading...'}
      </Text>
      {/* <Text style={{ marginBottom: 20, color: 'black' }}>{JSON.stringify(ephKeypair)}</Text> */}
    </ScrollView>
  )
}

const conversations: any[] = [
  {
    id: 'isaodjfw8h42oifh8',
    // content: `Linking key: ${DEMO_PUBKEY_1}`,
    username: 'Alice',
    communityName: 'Poland Helpers',
    time: '1d',
    picture: images.refugee,
    userPicture: images.refugee,
    communityPhoto: images.comm1,
    linkingKey: DEMO_PUBKEY_1,
    stealthAddress: null,
  },
  {
    id: 'isaodjfw8h42342342oifh8',
    // content: `Linking key: ${DEMO_PUBKEY_1}`,
    username: 'Bob',
    communityName: 'Ottawa Trucker',
    time: '1d',
    picture: images.trucker,
    userPicture: images.trucker,
    communityPhoto: images.comm1,
    linkingKey: '021fe59f57418f6e7928defcf44897e69739d67919e41b1b75c41324d90b8d9cbf',
    stealthAddress: null,
  },
]

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
