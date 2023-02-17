export type RaffleId = number;

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

export interface NftToken {
    contractId: string;
    collectionId: string;
    compositeId: string;
    tokenId: string;
    tokenName: string;
    collectionName: string;
    referenceUrl: string;
    imageUri?: string;
    propertyVersion?: number;
    creator?: string;
    description?: string;
    maximum?: string;
    supply?: number;
}

export interface FtToken {
    contractId: string;
    symbol: string;
    decimals: number;
    name: string;
    icon?: string;
}

export const nearFtMetadata: FtToken = {
    contractId: "near",
    name: "near",
    symbol: "near",
    decimals: 24,
};