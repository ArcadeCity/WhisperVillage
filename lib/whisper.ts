import * as nobleSecp256k1 from '@noble/secp256k1'
import * as bitcoinjs from './bitcoinjs-lib'
import * as bip32 from './bip32'
// import * as bip32test from './bip32'
import bip39 from './bip39'
import { mnemonicToSeedSync } from '@scure/bip39'
import { HDKey } from '@scure/bip32'

export const DEMO_PUBKEY_1 = '03446801102d378f09aa200debc1acdff0f6fcf1c6d9bc1e2c7e14076d5fbc740e' // linking
export const DEMO_PUBKEY_2 = '021bdff9549d3aec645cd57499648b4eda06fd0a426048857c0c456c73500e128e' // ephemeral

export function deriveKeyFromMnemonic(mnemonic: string) {
  const seed = Buffer.from(mnemonicToSeedSync(mnemonic)).toString('hex')
  // console.log('seed:', seed)
  let root = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
  const rootPriv = root.derive(`m/44'/60'/0'/0`).privateKey as Uint8Array
  const privBuffer = Buffer.from(rootPriv)
  const privateKey = new Uint8Array(privBuffer)
  // console.log('root?', root)
  // console.log('rootPriv?', rootPriv)
  return privateKey
}

export function getEphkey(path: number, indexnum: number = 0, backupwords: string) {
  console.log('GETEPHKEY')
  if (getPrivkeyHex(backupwords, 0, indexnum).substring(0, 1) != '0') {
    let newindexnum = indexnum + 1
    return getEphkey(path, newindexnum, backupwords)
  } else {
    var ephemeralprivkey = getPrivkeyHex(backupwords, 0, indexnum)
    var ephemeralpubkey = bitcoinjs.ECPair.fromPrivateKey(
      Buffer.from(getPrivkeyHex(backupwords, 0, indexnum), 'hex')
    ).publicKey.toString('hex')
    console.log('privkey:', ephemeralprivkey)
    console.log('pubkey:', ephemeralpubkey)
    return {
      ephemeralprivkey,
      ephemeralpubkey,
    }
  }
}

export function sendtostealthaddress(linkingpubkey: string, ephemeralpubkey: string) {
  var stealthpubkey = nobleSecp256k1.Point.fromHex(linkingpubkey)
    .add(nobleSecp256k1.Point.fromHex(ephemeralpubkey))
    .toHex()
  var ecPair = bitcoinjs.ECPair.fromPublicKey(Buffer.from(stealthpubkey, 'hex'))
  var address = bitcoinjs.payments.p2wpkh({
    pubkey: ecPair.publicKey,
    network: bitcoinjs.networks.testnet,
  }).address
  // console.log('to address:', address)
  return address
}

export function sendtostealthaddress_DEMO() {
  var linkingpubkey = '03446801102d378f09aa200debc1acdff0f6fcf1c6d9bc1e2c7e14076d5fbc740e'
  var ephemeralpubkey = '021bdff9549d3aec645cd57499648b4eda06fd0a426048857c0c456c73500e128e'
  var stealthpubkey = nobleSecp256k1.Point.fromHex(linkingpubkey)
    .add(nobleSecp256k1.Point.fromHex(ephemeralpubkey))
    .toHex()
  var ecPair = bitcoinjs.ECPair.fromPublicKey(Buffer.from(stealthpubkey, 'hex'))
  var address = bitcoinjs.payments.p2wpkh({
    pubkey: ecPair.publicKey,
    network: bitcoinjs.networks.testnet,
  }).address
  console.log('to address:', address)
}

export async function sendfromstealthaddress(
  linkingprivkey: string,
  whisperkey: string, // ephem pubkey
  withdrawTo: string
) {
  var stealthprivkey = (
    (BigInt('0x' + linkingprivkey) + BigInt('0x' + whisperkey)) %
    BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f')
  ).toString(16)

  var senderPrivkeyWif = bitcoinjs.ECPair.fromPrivateKey(Buffer.from(stealthprivkey, 'hex'), {
    network: bitcoinjs.networks.testnet,
  }).toWIF()

  const pubkey = getPubkeyFromPrivkey(linkingprivkey)
  const ephpubkey = getPubkeyFromPrivkey(whisperkey)
  const stealthaddr = sendtostealthaddress(pubkey, ephpubkey)
  console.log('?:', stealthaddr)

  var inputtxid = await getIdOfTxThatSentMeMoneyAsync(stealthaddr)
  console.log('THE ID IS:', inputtxid)
  var inputindex = await getOutputNumberOfTxThatSentMeMoneyAsync(stealthaddr, inputtxid)
  console.log('THE INDEX IS:', inputindex)

  var ecPair = bitcoinjs.ECPair.fromPrivateKey(Buffer.from(stealthprivkey, 'hex'))

  var address = bitcoinjs.payments.p2wpkh({
    pubkey: ecPair.publicKey,
    network: bitcoinjs.networks.testnet,
  })

  console.log('from address:', address.address)

  var frompubkey = address.pubkey.toString('hex')

  const fromamount = await getAmountOfTxThatSentMeMoneyAsync(stealthaddr, id)
  console.log('from amount:', fromamount)
  const toamount = fromamount - 500
  console.log('to amount:', toamount)

  sendCoins(senderPrivkeyWif, inputtxid, inputindex, frompubkey, fromamount, withdrawTo, toamount)
}

// export function sendfromstealthaddress_DEMO() {
//   var linkingprivkey = '64c2a35ea7eb34f49f23ff42f7479e00613e01c3335acaaa5adf63aea41e81fc'
//   var whisperkey = '142037554249ad0daeae84ad02793921b8bf804fd47939a3d0ee5e1404849310'
//   var stealthprivkey = '78e2dab3ea34e2024dd283eff9c0d72219fd821307d4044e2bcdc1c2a8a3150c'

//   var senderPrivkeyWif = bitcoinjs.ECPair.fromPrivateKey(Buffer.from(stealthprivkey, 'hex'), {
//     network: bitcoinjs.networks.testnet,
//   }).toWIF()

//   var inputtxid = 'f14c1680b8477668d0cb8e191b6dc107c14b1eb5a4c7d41b3a253e22a066fc65'
//   var inputindex = 1

//   var ecPair = bitcoinjs.ECPair.fromPrivateKey(Buffer.from(stealthprivkey, 'hex'))

//   var address = bitcoinjs.payments.p2wpkh({
//     pubkey: ecPair.publicKey,
//     network: bitcoinjs.networks.testnet,
//   })

//   console.log('from address:', address.address)

//   var frompubkey = address.pubkey.toString('hex')

//   var fromamount = 100000

//   var to = 'tb1q3gxjr9ey7k526kq2nvhnanuh4k9k7hyt04h7x6wyzve0kghsnrksjg67ww'
//   var toamount = 99500

//   sendCoins(senderPrivkeyWif, inputtxid, inputindex, frompubkey, fromamount, to, toamount)
// }

export function logWalkthrough() {
  console.log(
    'The payer starts off with a "linking pubkey" created by the recipient a long time ago and displayed on a website somewhere.'
  )
  var pubkey1 = DEMO_PUBKEY_1
  console.log('In this case, the linking pubkey is', pubkey1)
  var pubkey2 = DEMO_PUBKEY_2
  console.log(
    'The payer also has an ephemeral private/public keypair created by the payer’s browser when he loaded the website.'
  )
  console.log('In this case, the ephemeral pubkey is', pubkey2)
  console.log(
    'The payer’s browser combines his ephemeral pubkey with the linking pubkey to generate the stealth address.'
  )
  console.log('What the payer knows about the stealth address:')

  var stealthaddress = nobleSecp256k1.Point.fromHex(pubkey1)
    .add(nobleSecp256k1.Point.fromHex(pubkey2))
    .toHex() // CHANGED FROM toHexX
  console.log('public key:', stealthaddress)
  console.log('private key: unknown')

  const buff = Buffer.from(stealthaddress, 'hex')
  console.log('buff:', buff)
  const ecPair = bitcoinjs.ECPair.fromPublicKey(buff)
  console.log('pair:', ecPair)
  var address = bitcoinjs.payments.p2wpkh({
    pubkey: ecPair.publicKey,
    network: bitcoinjs.networks.mainnet,
  }).address
  console.log('ADDRESS:', address)

  console.log(
    "Basically there's a math equation going on here:\n",
    pubkey1,
    '\n+',
    pubkey2,
    '\n=',
    stealthaddress
  )
  console.log(
    'Note that this stealth address has never been seen before and no one except the payer can associate it with the recipient or his linking key.'
  )
  console.log(
    'The payer sends bitcoins to the stealth address and then sends his ephemeral private key to the recipient, e.g. via email, telegram, or similar.'
  )
  //The recipient uses the following script whose only secret part is privkey1, which he must not disclose
  var privkey1 = '64c2a35ea7eb34f49f23ff42f7479e00613e01c3335acaaa5adf63aea41e81fc'
  console.log(
    'The recipient of the money already knows the private key to the linking key. It is',
    privkey1
  )
  var privkey2 = '142037554249ad0daeae84ad02793921b8bf804fd47939a3d0ee5e1404849310'
  console.log(
    'The private key of the ephemeral key was sent to him by the payer, so he also knows that. It is',
    privkey2
  )
  console.log(
    'The money recipient can thus add them together using the following equation, and the resulting pubkey can sign messages on behalf of the stealth address generated earlier.'
  )
  var privkey3 = (
    (BigInt('0x' + privkey1) + BigInt('0x' + privkey2)) %
    BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f')
  ).toString(16)
  console.log(privkey1, '\n+', privkey2, '\n=', privkey3)
  console.log(
    "So here's what the recipient knows about the stealth address once he receives the ephemeral private key:"
  )
  console.log('public key:', nobleSecp256k1.Point.fromPrivateKey(privkey3).toHexX()) // should be toHex too?
  console.log('private key:', privkey3)
  console.log(
    "The recipient uses the stealth address's private key to move the bitcoins out of the stealth address at his discretion and is careful not to mix those bitcoins with his other bitcoins without a coinjoin."
  )
}

export function computeAddress(node: any) {
  return bitcoinjs.payments.p2wpkh({ pubkey: node.publicKey, network: bitcoinjs.networks.testnet })
    .address
}

export function computePubkey(node: any) {
  return node.publicKey.toString('hex')
}

export function computePrivkeyHex(node: any) {
  return node.privateKey.toString('hex')
}

export function getAddress(backupwords, path, index) {
  var seed = bip39.mnemonicToSeedSync(backupwords)
  var node = bip32.fromSeed(seed)
  path = 'm/' + path + '/' + index
  var root = node
  var child = root.derivePath(path)
  return computeAddress(child)
}

export function getPrivkeyHex(backupwords, path, index) {
  var seed = mnemonicToSeedSync(backupwords)
  var node = bip32.fromSeed(Buffer.from(seed))
  path = 'm/' + path + '/' + index
  var root = node
  var child = root.derivePath(path)
  return computePrivkeyHex(child)
}

export function getPubkey(backupwords, path, index) {
  var seed = bip39.mnemonicToSeedSync(backupwords)
  var node = bip32.fromSeed(seed)
  path = 'm/' + path + '/' + index
  var root = node
  var child = root.derivePath(path)
  return computePubkey(child)
}

export function computeWifPrivkey(node) {
  return bitcoinjs.ECPair.fromPrivateKey(node.privateKey, {
    network: bitcoinjs.networks.testnet,
  }).toWIF()
}

export function getPrivkeyWif(backupwords, path, index) {
  var seed = bip39.mnemonicToSeedSync(backupwords)
  var node = bip32.fromSeed(seed)
  path = 'm/' + path + '/' + index
  var root = node
  var child = root.derivePath(path)
  return computeWifPrivkey(child)
}

export function sendCoins(
  senderPrivkeyWif,
  inputtxid,
  inputindex,
  frompubkey,
  fromamount,
  to,
  toamount
) {
  var psbt = new bitcoinjs.Psbt({ network: bitcoinjs.networks.testnet })
    .addInput({
      hash: inputtxid,
      index: inputindex,
      witnessUtxo: {
        script: Buffer.from(
          '0014' +
            bitcoinjs.crypto
              .ripemd160(bitcoinjs.crypto.sha256(Buffer.from(frompubkey, 'hex')))
              .toString('hex'),
          'hex'
        ),
        value: fromamount,
      },
    })
    .addOutput({
      address: to,
      value: toamount,
    })
  var keyPairSender = bitcoinjs.ECPair.fromWIF(senderPrivkeyWif, bitcoinjs.networks.testnet)
  psbt.signInput(0, keyPairSender)
  psbt.validateSignaturesOfInput(0)
  psbt.finalizeAllInputs()
  console.log(psbt.extractTransaction().toHex())
}

async function getIdOfTxThatSentMeMoneyAsync(stealthaddress) {
  try {
    const url = 'https://api.blockcypher.com/v1/btc/test3/addrs/' + stealthaddress
    console.log(url)
    const response = await fetch(url)
    const json = await response.json()
    console.log('RESPONSE:', json)
    if (!json.txrefs) {
      alert('That address has no transactions')
    } else {
      length = json['txrefs'].length
      var txid = json['txrefs'][length - 1]['tx_hash']
      sessionStorage['txid'] = txid
      console.log('transaction id:', txid)
      return txid
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getOutputNumberOfTxThatSentMeMoneyAsync(
  stealthaddress: string,
  txid: string
) {
  try {
    const url = 'https://api.blockcypher.com/v1/btc/test3/txs/' + txid
    console.log(url)
    const response = await fetch(url)
    const json = await response.json()
    console.log('RESPONSE:', json)
    var i
    for (i = 0; i < json['outputs'].length; i++) {
      var j
      for (j = 0; j < json['outputs'][i]['addresses'].length; j++) {
        if (stealthaddress == json['outputs'][i]['addresses'][j]) {
          console.log('output number:', i)
          return i
        }
      }
    }
  } catch (e) {}
}

async function getAmountOfTxThatSentMeMoneyAsync(stealthaddress: string, txid: string) {
  try {
    const url = 'https://api.blockcypher.com/v1/btc/test3/txs/' + txid
    console.log(url)
    const response = await fetch(url)
    const json = await response.json()
    console.log('RESPONSE:', json)
    var i
    for (i = 0; i < json['outputs'].length; i++) {
      var j
      for (j = 0; j < json['outputs'][i]['addresses'].length; j++) {
        if (stealthaddress == json['outputs'][i]['addresses'][j]) {
          console.log('amount', json['outputs'][i]['value'])
          return json['outputs'][i]['value']
        }
      }
    }
  } catch (e) {}
}

function getPubkeyFromPrivkey(privkey) {
  return bitcoinjs.ECPair.fromPrivateKey(
    Buffer.from(privkey, 'hex'),
    bitcoinjs.networks.testnet
  ).publicKey.toString('hex')
}

// async function getAmountOfTxThatSentMeMoney() {

// }

// export function getOutputNumberOfTxThatSentMeMoney(stealthaddress, txid) {
//   var xhttp = new XMLHttpRequest()
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var json = JSON.parse(xhttp.responseText)
//       var i
//       for (i = 0; i < json['outputs'].length; i++) {
//         var j
//         for (j = 0; j < json['outputs'][i]['addresses'].length; j++) {
//           if (stealthaddress == json['outputs'][i]['addresses'][j]) {
//             console.log('output number:', i)
//           }
//         }
//       }
//     }
//   }
//   xhttp.open('GET', 'https://api.blockcypher.com/v1/btc/test3/txs/' + txid, true)
//   xhttp.send()
// }

// function getAmountOfTxThatSentMeMoney(stealthaddress, txid) {
//   var xhttp = new XMLHttpRequest()
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var json = JSON.parse(xhttp.responseText)
//       var i
//       for (i = 0; i < json['outputs'].length; i++) {
//         var j
//         for (j = 0; j < json['outputs'][i]['addresses'].length; j++) {
//           if (stealthaddress == json['outputs'][i]['addresses'][j]) {
//             console.log('amount', json['outputs'][i]['value'])
//           }
//         }
//       }
//     }
//   }
//   xhttp.open('GET', 'https://api.blockcypher.com/v1/btc/test3/txs/' + txid, true)
//   xhttp.send()
// }

// export function getIdOfTxThatSentMeMoney(stealthaddress) {
//   var xhttp = new XMLHttpRequest()
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var json = JSON.parse(xhttp.responseText)
//       length = json['txrefs'].length
//       var txid = json['txrefs'][length - 1]['tx_hash']
//       sessionStorage['txid'] = txid
//       console.log('transaction id:', txid)
//     }
//   }
//   xhttp.open('GET', 'https://api.blockcypher.com/v1/btc/test3/addrs/' + stealthaddress, true)
//   xhttp.send()
// }
