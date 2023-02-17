import { connect, Contract, keyStores } from "near-api-js";
import { Buffer } from "buffer";
import { setupSelector, refreshWalletConnection } from "./walletSelector";
import { INearContext } from "./hooks";
import { nearConfig } from "./environment";
import { PegasusContract } from "./classWrappers";

global.Buffer = Buffer;

export async function InitNearContext(): Promise<INearContext> {
    const near = await connect({
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        headers: {},
        ...nearConfig,
    });

    const walletSelector = await setupSelector(nearConfig);

    const pegasusContract: any = await new Contract(
        walletSelector.wallet,
        nearConfig.pegasusContractId,
        {
            viewMethods: [
                "balance_of",
                "balances_of",
                "get_num_balances",
                "get_subscribed_sales",
                "get_account_sales",
                "get_sale",
                "get_sales",
                "get_treasury_balance",
                "get_treasury_balances",
                "get_treasury_num_balances",
                "get_skyward_token_id",
                "get_skyward_circulating_supply",
                "get_listing_fee",
            ],
            changeMethods: [
                "register_token",
                "register_tokens",
                "withdraw_token",
                "donate_token_to_treasury",
                "sale_create",
                "sale_deposit_out_token",
                "sale_deposit_in_token",
                "sale_withdraw_in_token",
                "sale_distribute_unclaimed_tokens",
                "sale_claim_out_tokens",
                "redeem_skyward",
            ],
        }
    );

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
        pegasusContract,
        selector: walletSelector.selector,
        modal: walletSelector.modal,
        wallet: walletSelector.wallet,
        role: "user"
    };
}
