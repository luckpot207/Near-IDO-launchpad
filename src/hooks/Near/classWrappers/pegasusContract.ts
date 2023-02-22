import BigNumber from "big.js";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { unifySymbol, convertToFloat } from "../utils";
import { GAS_FOR_NFT_TRANSFER } from "../constants";
import { Project } from "../types";

import { Contract, Near } from "near-api-js";
import { FtContractFactory, FtContract } from "./ftContract";

const FETCH_COUNT = 50;

export class PegasusContract {
  pegasusContract: any;
  initFtContract: Function;
  near: Near;

  constructor(
    pegasusContract: any,
    initFtContract: Function,
    near: Near,
  ) {
    this.pegasusContract = pegasusContract;
    this.initFtContract = initFtContract
    this.near = near;
  }

  getProject = async (project_id: number): Promise<Project> => {
    const res = await this.pegasusContract.get_project({ project_id: project_id });
    return res;
  };

  getProjects = async (from_index: number | null, limit: number | null): Promise<Array<Project>> => {
    const res = await this.pegasusContract.get_projects({ from_index, limit });
    return res;
  };

  getProjectsById = async (project_ids: Array<number>): Promise<Array<Project>> => {
    return await this.pegasusContract.get_projects_by_id({ project_ids });
  };

  getNumBalances = async (project_id: number, account_id: string): Promise<number> => {
    return await this.pegasusContract.get_num_balances({ project_id, account_id });
  };

  getListingFeeNear = async (): Promise<number> => {
    return await this.pegasusContract.get_listing_fee_near();
  };

  getListingFeeDenominator = async (): Promise<number> => {
    return await this.pegasusContract.get_listing_fee_denominator();
  };

  registerProject = async (
    accoun_id: string,
    ft_contract_id: string,
    title: string,
    sub_title: string,
    token_ticker: string,
    logo: string,
    starting_price: number,
    email: string,
    telegram: string,
    in_token_account_id: string,
    out_token_account_id: string,
    total_tokens: number,
    coingecko: string,
    facebook: string,
    instagram: string,
    twitter: string,
    description: string,
    start_time: number,
    end_time: number,
    cliff_period: number,
  ) => {

    const projectRegisterFee = BigInt(await this.getListingFeeNear());
    const callbackUrl = `${window.location.origin}/raffles/`;

    const ftContract = new FtContract(this.initFtContract(ft_contract_id));
    const balance = await ftContract!.getFtBalanceOfOwner(this.pegasusContract.contractId);
    const metadata = await ftContract!.getFtMetadata();
    const projectRegisterValue = BigInt(20 * (10 ** metadata.decimals))
    const attachDeposit = (projectRegisterValue);

    const msg = JSON.stringify({
      msg_type: true,
      msg_data: JSON.stringify({
        title,
        sub_title,
        token_ticker,
        logo,
        starting_price: starting_price * (10 ** metadata.decimals),
        email,
        telegram,
        in_token_account_id,
        out_token_account_id,
        total_tokens,
        coingecko,
        facebook,
        instagram,
        twitter,
        description,
        start_time: (start_time * 10 ** 6).toString(),
        end_time: (end_time * 10 ** 6).toString(),
        cliff_period: cliff_period.toString(),
      })
    });

    if (BigNumber(balance) > BigNumber(0)) {
      return await ftContract!.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl);
    } else {
      const account: any = await this.near.account(accoun_id);
      await account.signAndSendTransaction({
        receiverId: this.pegasusContract.contractId,
        actions: [
          ftContract!.storageDeposit(this.pegasusContract.contractId),
          ftContract!.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl),
        ],
      });
    }
  };

  activeProject = async (
    accoun_id: string,
    ft_contract_id: string,
    project_id: number,
    amount: number
  ) => {

    const callbackUrl = `${window.location.origin}/projects/`;

    const ftContract = new FtContract(this.initFtContract(ft_contract_id));
    const balance = await ftContract!.getFtBalanceOfOwner(this.pegasusContract.contractId);
    const metadata = await ftContract!.getFtMetadata();
    const projectRegisterValue = BigInt(amount * (10 ** metadata.decimals))
    const attachDeposit = (projectRegisterValue)

    const msg = JSON.stringify({
      msg_type: false,
      msg_data: JSON.stringify({
        project_id,
      })
    });

    if (BigNumber(balance) > BigNumber(0)) {
      return await ftContract!.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl);
    } else {
      const account: any = await this.near.account(accoun_id);
      await account.signAndSendTransaction({
        receiverId: this.pegasusContract.contractId,
        actions: [
          ftContract!.storageDeposit(this.pegasusContract.contractId),
          ftContract!.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl),
        ],
      });
    }
  };

  projectDepositInToken = async (
    accoun_id: string,
    ft_contract_id: string,
    project_id: number,
    amount: number
  ) => {

    const callbackUrl = `${window.location.origin}/project/${project_id}`;

    const ftContract = new FtContract(this.initFtContract(ft_contract_id));
    const balance = await ftContract!.getFtBalanceOfOwner(this.pegasusContract.contractId);
    const metadata = await ftContract!.getFtMetadata();
    const attachDeposit = BigInt(amount * (10 ** metadata.decimals))
    console.log(attachDeposit)

    const msg = JSON.stringify({
      msg_type: false,
      msg_data: JSON.stringify({
        project_id,
      })
    });

    if (BigNumber(balance) > BigNumber(0)) {
      return await ftContract!.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl);
    } else {
      const pegasusAccount: any = await this.near.account(this.pegasusContract.contractId);
      await pegasusAccount.signAndSendTransaction({
        receiverId: this.pegasusContract.contractId,
        actions: [
          ftContract!.storageDeposit(this.pegasusContract.contractId),
          ftContract!.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl),
        ],
      });
    }
  };

  projectWithdrawInToken = async (
    project_id: number,
    amount: number | null
  ) => {

    const raffleCreationFee = BigInt(await this.getListingFeeNear());

    const attachDeposit = (raffleCreationFee);
    const callbackUrl = `${window.location.origin}/projects/`;

    return await this.pegasusContract.project_withdraw_in_token({
      args: {
        project_id,
        amount
      },
      amount: attachDeposit.toString(),
      callbackUrl,
    });
  };

  projectWithdrawOutToken = async (
    project_id: number,
    amount: number | null
  ) => {

    const raffleCreationFee = BigInt(await this.getListingFeeNear());

    const attachDeposit = (raffleCreationFee);
    const callbackUrl = `${window.location.origin}/projects/`;

    return await this.pegasusContract.project_withdraw_out_token({
      args: {
        project_id,
        amount
      },
      amount: attachDeposit.toString(),
      callbackUrl,
    });
  };

}
