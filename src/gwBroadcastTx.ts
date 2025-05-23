import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { fromHex } from "@mysten/sui/utils";

const message =
  "00000200080065cd1d0000000000202e3d52393c9035afd1ef38abd7fce2dad71f0e276b522fb274f4e14d1df974720202000101000001010300000000010100d79a4c7a655aa80cf92069bbac9666705f1d7181ff9c2d59efbc7e6ec4c3379d0180dc491e55e7caabfcdd1b0f538928d8d54107b9c1def3ed0baa3aa5106ba8674f0dd01400000000204b7e9da00f30cd1edf4d40710213c15a862e1fc175f2edb2b2c870c8559d65cdd79a4c7a655aa80cf92069bbac9666705f1d7181ff9c2d59efbc7e6ec4c3379de80300000000000040ab3c000000000000";

const cHexSignature =
  "00099c4ec9bdb3fa46874b5e57c62e023ee473a35a614c09183f1f9a60a9fad0449b5166a8056f974ccdaeb27ec6587ea8ffa99cb0cd0c803e19684f3bd8fc400d6309ede0a480229c12b578364ca13bc36cbf61786c47aa75f323127462b32405";

async function main() {
  console.log("\n\n\n\n\t\t\t\t GATEWAY BROADCAST SIGNED TX SCRIPT");

  console.log(
    "\n\n\t\t Broadcasting Tx Details:" +
      " \n\t\t\t Message: " +
      message +
      " \n\t\t\t Device Offline Signature : " +
      cHexSignature
  );

  // 1. Creating client
  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  const cSignature = suiSignatureHexToBase64(cHexSignature);

  // 2. Send the signed transaction
  console.log("\n\n\t\t Broadcasting the Transaction...\n");
  const result = await client.executeTransactionBlock({
    transactionBlock: fromHex(message),
    signature: cSignature,
    options: {
      showEffects: true,
      showEvents: true,
    },
  });

  console.log("\n\t\t TX SENDED TO THE NETWORK!\n\n");

  const digest = result.digest;

  console.log("\t digest:", digest);
  console.log("\t https://testnet.suivision.xyz/txblock/" + digest + "\n\n");
}

main().catch(console.error);

function suiSignatureHexToBase64(hex: string): string {
  if (hex.startsWith("0x")) hex = hex.slice(2);
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return Buffer.from(bytes).toString("base64");
}
