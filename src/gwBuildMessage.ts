import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

const sender =
  "0xd79a4c7a655aa80cf92069bbac9666705f1d7181ff9c2d59efbc7e6ec4c3379d";
const recipient =
  "0x2e3d52393c9035afd1ef38abd7fce2dad71f0e276b522fb274f4e14d1df97472";
const amountToSend = 0.5 * 1000000000;

async function main() {
  console.log("\n\n\n\n\t\t\t\t GATEWAY BUILD MESSAGE SCRIPT");

  console.log(
    "\n\n\t\t Tx Details: Transfer " +
      amountToSend +
      " SUI from " +
      sender +
      " to " +
      recipient
  );

  // 2. Crear el cliente
  const client = new SuiClient({ url: getFullnodeUrl("testnet") });

  // 3. Crear transacción
  const tx = new Transaction();
  const [coin] = tx.splitCoins(tx.gas, [amountToSend]);

  tx.transferObjects([coin], recipient);
  tx.setSender(sender);

  // 4. Construir la transacción y obtener los bytes
  console.log("\n\n\t\t Building the Message...");
  const txBytes = await tx.build({ client });

  console.log(
    "\n\n\t\t Message to Sign: txBytes (hex):",
    Buffer.from(txBytes).toString("hex")
  );
  console.log("\n\n Message must be sended to the offline signer device... \n");
}

main().catch(console.error);
