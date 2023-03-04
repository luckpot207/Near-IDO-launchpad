import { connect, Contract, keyStores, Near } from "near-api-js";
import { Buffer } from "buffer";
import { setupSelector, refreshWalletConnection, SelectorAccount } from "./walletSelector";
import { nearConfig } from "./environment";
import { FtContract, PegasusContract } from "./classWrappers";
import { WalletSelector } from "@near-wallet-selector/core";
import { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { NearAppConfig } from "./config";
import { MultiWalletConnection } from "./types";

global.Buffer = Buffer;

export interface INearContext {
    near: Near;
    config: NearAppConfig;
    walletConnection: MultiWalletConnection;
    keyStore: any;
    pegasusContract: PegasusContract,
    initFtContract: Function,
    selector: WalletSelector;
    modal: WalletSelectorModal;
    wallet: SelectorAccount;
    role: string
}

export async function InitNearContext(): Promise<INearContext> {
    const near = await connect({
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        headers: {},
        ...nearConfig,
    });

    const walletSelector = await setupSelector(nearConfig);

    const pegasusContract: any = new Contract(
        walletSelector.wallet,
        nearConfig.pegasusContractId,
        {
            viewMethods: [
                "get_project",
                "get_projects",
                "get_projects_by_id",
                "get_num_balances",
                "get_listing_fee_near",
                "get_listing_fee_denominator",
            ],
            changeMethods: [
                "set_listing_fee_denominator",
                "project_withdraw_in_token"
            ],
        }
    );

    const initFtContract = (contractId: string) => {
        return new Contract(walletSelector.wallet, contractId, {
            viewMethods: ["ft_balance_of", "ft_metadata"],
            changeMethods: ["ft_transfer_call", "storage_deposit"],
        });
    };

    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    return {
        near,
        config: nearConfig,
        walletConnection: await refreshWalletConnection(
            walletSelector.selector,
            keyStore,
            nearConfig
        ),
        keyStore,
        pegasusContract: new PegasusContract(
            pegasusContract,
            near
        ),
        initFtContract,
        selector: walletSelector.selector,
        modal: walletSelector.modal,
        wallet: walletSelector.wallet,
        role: "user"
    };
}
