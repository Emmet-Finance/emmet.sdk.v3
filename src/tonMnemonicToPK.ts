import { 
    KeyPair, 
    mnemonicNew, 
    mnemonicToPrivateKey 
} from "@ton/crypto";

(async () => {

    // Generate new key ``.split('\n');
    let mnemonics = await mnemonicNew();

    console.log("mnemonics", mnemonics)

    let keyPair: KeyPair = await mnemonicToPrivateKey(mnemonics);

    // Convert the buffers to hex strings (or another encoding if needed)
    const publicKeyString = keyPair.publicKey.toString('hex');
    const secretKeyString = keyPair.secretKey.toString('hex');

    console.log('Public Key:', publicKeyString);
    console.log('Secret Key:', secretKeyString);

})()

