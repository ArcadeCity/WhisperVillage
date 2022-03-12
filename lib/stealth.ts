import bitcoinjs from './bitcoinjs-lib'
import bip32 from './bip32'
import bip39 from './bip39'

export function computeAddress(node: any) {
  return bitcoinjs.payments.p2wpkh({ pubkey: node.publicKey, network: bitcoinjs.networks.testnet })
    .address
}

export function computePubkey(node: any) {
  return node.publicKey.toString('hex')
}

export function computePrivkey(node: any) {
  return bitcoinjs.ECPair.fromPrivateKey(node.privateKey, {
    network: bitcoinjs.networks.testnet,
  }).toWIF()
}

export function computePrivkeyHex(node: any) {
  return node.privateKey.toString('hex')
}

export function toHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2)
  }).join('')
}

export function getAddress(backupwords, path, index) {
  var seed = bip39.mnemonicToSeedSync(backupwords)
  var node = bip32.fromSeed(seed)
  path = 'm/' + path + '/' + index
  var root = node
  var child = root.derivePath(path)
  return computeAddress(child)

  // // option 2, manually
  // var child1b = root
  //     	.derive(0)
  //     	.derive(0);
  // console.log( computeAddress( child1b ) );
}

export function getPrivkey(backupwords, path, index) {
  var seed = bip39.mnemonicToSeedSync(backupwords)
  var node = bip32.fromSeed(seed)
  path = 'm/' + path + '/' + index
  var root = node
  var child = root.derivePath(path)
  return computePrivkey(child)
}

export function getPrivkeyHex(backupwords, path, index) {
  var seed = bip39.mnemonicToSeedSync(backupwords)
  var node = bip32.fromSeed(seed)
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
