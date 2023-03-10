export interface NearAppConfig {
    networkId: string,
    nodeUrl: string,
    pegasusContractId: string,
    walletUrl: string,
    helperUrl: string,
    explorerUrl: string,
    usdtContractId: string,
    usdcContractId: string,
    nearContractId: string,
}

export function getConfig(env: string): NearAppConfig {
    switch (env) {
        case "production":
        case "mainnet":
            return {
                networkId: "mainnet",
                nodeUrl: "https://rpc.mainnet.near.org",
                pegasusContractId: "pegasusContractId",
                walletUrl: "https://wallet.near.org",
                helperUrl: "https://helper.mainnet.near.org",
                explorerUrl: "https://explorer.mainnet.near.org",
                usdtContractId: "usdt.near",
                usdcContractId: "usdc.near",
                nearContractId: "near.near",
            };
        case "development":
        case "testnet":
            return {
                networkId: "testnet",
                nodeUrl: "https://rpc.testnet.near.org",
                pegasusContractId: 'pegasus006.testnet',
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
                usdtContractId: "usdt.fakes.testnet",
                usdcContractId: "usdc.fakes.testnet",
                nearContractId: "near.fakes.testnet",
            };
        default:
            throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
}

