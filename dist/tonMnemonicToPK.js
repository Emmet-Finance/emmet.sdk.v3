"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("@ton/crypto");
(async () => {
    // Generate new key ``.split('\n');
    let mnemonics = await (0, crypto_1.mnemonicNew)();
    console.log("mnemonics", mnemonics);
    let keyPair = await (0, crypto_1.mnemonicToPrivateKey)(mnemonics);
    // Convert the buffers to hex strings (or another encoding if needed)
    const publicKeyString = keyPair.publicKey.toString('hex');
    const secretKeyString = keyPair.secretKey.toString('hex');
    console.log('Public Key:', publicKeyString);
    console.log('Secret Key:', secretKeyString);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9uTW5lbW9uaWNUb1BLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rvbk1uZW1vbmljVG9QSy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUlxQjtBQUVyQixDQUFDLEtBQUssSUFBSSxFQUFFO0lBRVIsbUNBQW1DO0lBQ25DLElBQUksU0FBUyxHQUFHLE1BQU0sSUFBQSxvQkFBVyxHQUFFLENBQUM7SUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFFbkMsSUFBSSxPQUFPLEdBQVksTUFBTSxJQUFBLDZCQUFvQixFQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTdELHFFQUFxRTtJQUNyRSxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUxRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUVoRCxDQUFDLENBQUMsRUFBRSxDQUFBIn0=