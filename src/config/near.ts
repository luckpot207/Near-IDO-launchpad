export interface NearAppConfig {
  networkId: string,
  nodeUrl: string,
  raffleContractName: string,
  walletUrl: string,
  helperUrl: string,
  explorerUrl: string,
}

export function getConfig(env: string): NearAppConfig {
  switch (env) {
    case "production":
    case "mainnet":
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        raffleContractName: process.env.REACT_APP_RAFFLE_CONTRACT_NAME || "raffles.antisociallabs.near",
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      };
    case "development":
    case "testnet":
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        raffleContractName: process.env.REACT_APP_RAFFLE_CONTRACT_NAME || "raffle.raffles.aslabs.testnet",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
  }
}

export interface MultiWalletConnection {
  isLoggedIn: boolean;
  accountId: string | null;
  signOut: () => Promise<void>;
  sign: (message: string) => Promise<SignOutcome>;
}

export interface SignOutcome {
  accountId: string;
  message: string;
  publicKey: string;
  signature: string;
}