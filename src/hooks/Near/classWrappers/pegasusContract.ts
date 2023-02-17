import BigNumber from "big.js";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { unifySymbol, convertToFloat } from "../utils";
import { GAS_FOR_NFT_TRANSFER } from "../constants";

import { Near } from "near-api-js";

interface RaffleInfo {
  raffle_id: number;
  creator_id: string;
  nft_contract_id: string;
  token_id: string;
  ft_contract_id: string;
  price: string;
  end_time: number;
  num_entries: number;
  status: string;
  winner_id?: string;
  ticket_supply: number;
  active: boolean;
  tokenName?: string;
  claimed: boolean;
}

const FETCH_COUNT = 50;

export class PegasusContract {
  pegasusContract: any;
  near: Near;

  constructor(
    pegasusContract: any,
    near: Near
  ) {
    this.pegasusContract = pegasusContract;
    this.near = near;
  }

  get_sale = async (sale_id: string, account_id: string): Promise<number[]> => {
    return await this.pegasusContract.get_raffle_ids_by_creator_id({ account_id: account_id });
  };

  get_sales = async (account_id: string): Promise<Array<string>> => {
    return await this.pegasusContract.get_num_raffles(account_id);
  };

  getNumTicketsSold = async (raffleIndex: number): Promise<number> => {
    return await this.pegasusContract.get_num_tickets_sold({ raffle_index: raffleIndex });
  };

  getNftContractId = async (raffleIndex: number): Promise<string> => {
    return await this.pegasusContract.get_nft_contract_id({ raffle_index: raffleIndex });
  };

  getTokenId = async (raffleIndex: number): Promise<string> => {
    return await this.pegasusContract.get_token_id({ raffle_index: raffleIndex });
  };

  getActive = async (raffleIndex: number): Promise<boolean> => {
    return await this.pegasusContract.get_active({ raffle_index: raffleIndex });
  };

  getEndTime = async (raffleIndex: number): Promise<number> => {
    return await this.pegasusContract.get_end_time({ raffle_index: raffleIndex });
  };

  getClaimed = async (raffleIndex: number): Promise<boolean> => {
    return await this.pegasusContract.get_claimed({ raffle_index: raffleIndex });
  };

  getWinnerId = async (raffleIndex: number): Promise<string> => {
    return await this.pegasusContract.get_winner_id({ raffle_index: raffleIndex });
  };

  getBuyerRaffleSupply = async (accountId: string): Promise<string> => {
    return await this.pegasusContract.get_buyer_raffle_supply({ account_id: accountId });
  };

  getBuyerRaffleIds = async (accountId: string): Promise<number[]> => {
    const supply = await this.getBuyerRaffleSupply(accountId);
    let ids: number[] = [];
    for (let i = 0; i <= Number(supply) / FETCH_COUNT; i++) {
      ids.push(
        ...(await this.pegasusContract.get_buyer_raffle_ids({
          account_id: accountId,
          start_index: i * FETCH_COUNT,
          count: FETCH_COUNT,
        }))
      );
    }
    return ids;
  };

  getRaffleCreationFee = async (): Promise<string> => {
    return await this.pegasusContract.get_raffle_creation_fee();
  };

  getInitialStorageCost = async (): Promise<string> => {
    return await this.pegasusContract.get_initial_storage_cost();
  };

  getTicketStorageCost = async (): Promise<string> => {
    return await this.pegasusContract.get_ticket_storage_cost();
  };

}
