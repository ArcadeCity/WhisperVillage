import * as nobleSecp256k1 from '@noble/secp256k1'
import * as bitcoinjs from './bitcoinjs-lib'
import bip32 from './bip32'
import bip39 from './bip39'

export const DEMO_PUBKEY_1 = '03446801102d378f09aa200debc1acdff0f6fcf1c6d9bc1e2c7e14076d5fbc740e' // linking
export const DEMO_PUBKEY_2 = '021bdff9549d3aec645cd57499648b4eda06fd0a426048857c0c456c73500e128e' // ephemeral

export function sendtostealthaddress() {
  var linkingpubkey = "03446801102d378f09aa200debc1acdff0f6fcf1c6d9bc1e2c7e14076d5fbc740e";
  var ephemeralpubkey = "021bdff9549d3aec645cd57499648b4eda06fd0a426048857c0c456c73500e128e";
  var stealthpubkey = nobleSecp256k1.Point.fromHex( linkingpubkey ).add( nobleSecp256k1.Point.fromHex( ephemeralpubkey ) ).toHex();
  var ecPair = bitcoinjs.ECPair.fromPublicKey( buffer.Buffer.from( stealthpubkey, "hex" ) );
  var address = bitcoinjs.payments.p2wpkh({ pubkey: ecPair.publicKey, network: bitcoinjs.networks.testnet }).address;
  console.log( "to address:", address );
}

export function sendfromstealthaddress() {
  var linkingprivkey = "64c2a35ea7eb34f49f23ff42f7479e00613e01c3335acaaa5adf63aea41e81fc";
  var whisperkey = "142037554249ad0daeae84ad02793921b8bf804fd47939a3d0ee5e1404849310";
  var stealthprivkey = "78e2dab3ea34e2024dd283eff9c0d72219fd821307d4044e2bcdc1c2a8a3150c";

  var senderPrivkeyWif = bitcoinjs.ECPair.fromPrivateKey( buffer.Buffer.from( stealthprivkey, "hex" ), { network: bitcoinjs.networks.testnet } ).toWIF();

  var inputtxid = "f14c1680b8477668d0cb8e191b6dc107c14b1eb5a4c7d41b3a253e22a066fc65";
  var inputindex = 1;

  var ecPair = bitcoinjs.ECPair.fromPrivateKey( buffer.Buffer.from( stealthprivkey, "hex" ) );

  var address = bitcoinjs.payments.p2wpkh({ pubkey: ecPair.publicKey, network: bitcoinjs.networks.testnet });

  console.log( "from address:", address.address );

  var frompubkey = address.pubkey.toString('hex');

  var fromamount = 100000;

  var to = "tb1q3gxjr9ey7k526kq2nvhnanuh4k9k7hyt04h7x6wyzve0kghsnrksjg67ww";
  var toamount = 99500;

  sendCoins( senderPrivkeyWif, inputtxid, inputindex, frompubkey, fromamount, to, toamount );
}

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
  console.log('public key:', nobleSecp256k1.Point.fromPrivateKey(privkey3).toHexX())
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

export function computeWifPrivkey( node ) {
  return bitcoinjs.ECPair.fromPrivateKey( node.privateKey, { network: bitcoinjs.networks.testnet } ).toWIF();
}

export function getPrivkeyWif( backupwords, path, index ) {
  var seed = bip39.mnemonicToSeedSync( backupwords );
  var node = bip32.fromSeed( seed );
  var path = "m/" + path + "/" + index;
  var root = node;
  var child = root.derivePath( path );
  return computeWifPrivkey( child );
}

export function sendCoins( senderPrivkeyWif, inputtxid, inputindex, frompubkey, fromamount, to, toamount ) {
  var psbt = new bitcoinjs.Psbt({ network: bitcoinjs.networks.testnet })
    .addInput({
      hash: inputtxid,
      index: inputindex,
      witnessUtxo: {
        script: buffer.Buffer.from( '0014' + bitcoinjs.crypto.ripemd160( bitcoinjs.crypto.sha256( buffer.Buffer.from( frompubkey, "hex" ) ) ).toString( 'hex' ), 'hex' ),
        value: fromamount,
      },
    })
    .addOutput({
      address: to,
      value: toamount,
    });
    var keyPairSender = bitcoinjs.ECPair.fromWIF( senderPrivkeyWif, bitcoinjs.networks.testnet );
    psbt.signInput(0, keyPairSender);
    psbt.validateSignaturesOfInput(0);
    psbt.finalizeAllInputs();
    console.log( psbt.extractTransaction().toHex() );
}