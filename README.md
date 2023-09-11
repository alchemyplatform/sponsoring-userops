# Sponsoring user operations using AA-SDK and Gas Manager

This repository serves as the codebase for Alchemy's tutorial on sponsoring userops [tutorial](https://docs.alchemy.com/docs/how-to-sponsor-userops-using-aa-sdk-and-gas-manager). This tutorial walks you through the process of using Alchemy AA-SDK and Gas Manager to execute sponsored userops (such as sending ETH).

## Prerequisites

You will need the latest recommended [Node](https://nodejs.org/en) version v18.16.1 to use this repository.

To check which version you have, run the following in your preferred terminal:

```
node -v
```

If v18.16.1 appears, you are ready to use the repository! If it does not, the best way to install and change your node versions is through [Node Version Manager](https://github.com/nvm-sh/nvm#intro)

Click the above link to install nvm if you do not already have it. Then run the following command.

```
nvm install 18.16.1
node -v
```

In your terminal, you should now see

```
Now using node v18.16.1 (npm v9.5.1)
v18.16.1
```

## Setup and running the scripts

Clone the repository and install the dependencies:

```
git clone https://github.com/alchemyplatform/sponsoring-userops.git
cd sponsoring-userops
npm install
```

Then create your `.env` file based on `.env.example`.

Once you have created and populated your `.env`, run the following command:

```
npm run index
```

The command executes a sponsored user operation to send ETH from your SCA to the specified wallet adddress in [index.ts](https://github.com/alchemyplatform/sponsoring-userops/blob/main/src/index.ts#L7).

## Explaining the Scripts

Let's briefly review the files within the [src](https://github.com/alchemyplatform/sponsoring-userops/tree/main/src) folder.

#### `createSigner.ts`

- Creates a signer for your smart contract account ( existing or new account ) coupled with Alchemy's Gas Manager that can be used to send sponsored user operations ( i.e. their gas is paid by Alchemy's Gas Manager ).

#### `index.ts`

- Sends a sponsored user operation that sends ETH from your SCA to the specified wallet adddress in [index.ts](https://github.com/alchemyplatform/sponsoring-userops/blob/main/src/index.ts#L7).

