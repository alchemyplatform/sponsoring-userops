// Import the necessary packages
import { type SmartAccountSigner, LocalAccountSigner } from "@alchemy/aa-core";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactory,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();

// Import the environment variables
const PRIV_KEY = process.env.PRIV_KEY!;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;
const PAYMASTER_POLICY_ID = process.env.PAYMASTER_POLICY_ID!;

// Define the constants
const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const LIGHT_ACCOUNT_FACTORY_ADDRESS = getDefaultLightAccountFactory(sepolia);

/**
 * @description Creates a smart contract account that can be used to send user operations.
 * @returns The smart contract account owner + provider, as a signer, that can be used to send user operations from the SCA
 */
export async function createSigner() {
  const owner: SmartAccountSigner =
    LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIV_KEY}`);

  const chain = sepolia;
  const provider = new AlchemyProvider({
    apiKey: ALCHEMY_API_KEY,
    entryPointAddress: ENTRYPOINT_ADDRESS,
    chain,
  });

  let signer = provider
    .connect(
      (rpcClient) =>
        new LightSmartContractAccount({
          entryPointAddress: ENTRYPOINT_ADDRESS,
          chain,
          owner,
          factoryAddress: LIGHT_ACCOUNT_FACTORY_ADDRESS,
          rpcClient,
        })
    )
    .withAlchemyGasManager({
      policyId: PAYMASTER_POLICY_ID,
      entryPoint: ENTRYPOINT_ADDRESS,
    });

  return signer;
}
