import { connect, Contract, keyStores } from "near-api-js";
import { Buffer } from "buffer";
import { setupSelector, refreshWalletConnection } from "./walletSelector";
import { INearContext } from "./hooks";
import { nearConfig } from "./environment";

global.Buffer = Buffer;

export async function InitNearContext(): Promise<INearContext> {
    const near = await connect({
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        headers: {},
        ...nearConfig,
    });

    const walletSelector = await setupSelector(nearConfig);

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
        selector: walletSelector.selector,
        modal: walletSelector.modal,
        wallet: walletSelector.wallet,
        role: "user"
    };
}
