// Import the necessary packages
import {
    type SimpleSmartAccountOwner,
    SimpleSmartContractAccount,
    SmartAccountProvider,
    LocalAccountSigner
  } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();
import { withAlchemyGasManager } from "@alchemy/aa-alchemy";

// Import the environment variables
const PRIV_KEY = process.env.PRIV_KEY!;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL!;
const PAYMASTER_POLICY_ID = process.env.PAYMASTER_POLICY_ID!;

// Define the constants
const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

/**
 * @description Creates a smart contract account that can be used to send user operations.
 * @returns The smart contract account owner + provider, as a signer, that can be used to send user operations from the SCA
 */
export async function createSigner() {
  const owner: SimpleSmartAccountOwner = LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIV_KEY}`);

  const chain = sepolia;
  const provider = new SmartAccountProvider(
    ALCHEMY_API_URL,
    ENTRYPOINT_ADDRESS,
    chain,
    undefined,
    {
      txMaxRetries: 10,
      txRetryIntervalMs: 5000,
    }
  );

  let signer = provider.connect(
    (rpcClient) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chain,
        owner,
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient,
      })
  );

  // Using Alchemy Gas Manager to sponsor the UserOps
  signer = withAlchemyGasManager(signer, {
    policyId: PAYMASTER_POLICY_ID,
    entryPoint: ENTRYPOINT_ADDRESS,
  });

  return signer;
}
