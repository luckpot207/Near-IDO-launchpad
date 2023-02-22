export interface NearAppConfig {
    networkId: string,
    nodeUrl: string,
    pegasusContractId: string,
    walletUrl: string,
    helperUrl: string,
    explorerUrl: string,
    usdtContractId: string
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
            };
        case "development":
        case "testnet":
            return {
                networkId: "testnet",
                nodeUrl: "https://rpc.testnet.near.org",
                pegasusContractId: 'pegasus002.testnet',
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
                usdtContractId: "usdt.fakes.testnet",
            };
        default:
            throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
}

