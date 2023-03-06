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
  near: Near;

  constructor(
    pegasusContract: any,
    near: Near,
  ) {
    this.pegasusContract = pegasusContract;
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

  getAstroDaoAccount = async (): Promise<string> => {
    return await this.pegasusContract.get_astrodao_account();
  };

  registerProject = async (
    accoun_id: string,
    inTokenContract: FtContract,
    outTokenContract: FtContract,
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
    const callbackUrl = `${window.location.origin}/project/`;
    const balance = await inTokenContract!.getFtBalanceOfOwner(this.pegasusContract.contractId);
    const inTokenMetadata = await inTokenContract!.getFtMetadata();
    const outTokenMetadata = await outTokenContract!.getFtMetadata();
    const projectRegisterValue = (projectRegisterFee * BigInt(10 ** inTokenMetadata.decimals))
    const attachDeposit = (projectRegisterValue);
    const totalTokens = parseNearAmount(total_tokens.toString())

    const msg = JSON.stringify({
      msg_type: true,
      msg_data: JSON.stringify({
        title,
        sub_title,
        token_ticker,
        logo,
        starting_price: starting_price * (10 ** inTokenMetadata.decimals),
        email,
        telegram,
        in_token_account_id,
        out_token_account_id,
        total_tokens: totalTokens?.substring(0, totalTokens.length - (24 - outTokenMetadata.decimals)),
        coingecko,
        facebook,
        instagram,
        twitter,
        description,
        start_time: (start_time * (10 ** 6)).toString(),
        end_time: (end_time * (10 ** 6)).toString(),
        cliff_period: cliff_period.toString(),
      })
    });

    if (BigNumber(balance) > BigNumber(0)) {
      return await inTokenContract.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl);
    } else {
      const account: any = await this.near.account(accoun_id);
      await account.signAndSendTransaction(
        this.pegasusContract.contractId,
        [
          inTokenContract.storageDeposit(this.pegasusContract.contractId),
          inTokenContract.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl),
        ],
      );
    }
  };

  activeProject = async (
    accoun_id: string,
    project_id: number,
    ftContract: FtContract,
    amount: number
  ) => {

    const callbackUrl = `${window.location.origin}/projects/`;
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
      return await account.signAndSendTransaction({
        receiverId: ftContract.contractId,
        actions: [
          ftContract!.storageDeposit(this.pegasusContract.contractId),
          ftContract!.ftTransferCall(this.pegasusContract.contractId, attachDeposit.toString(), msg, callbackUrl),
        ],
      });
    }
  };

  projectDepositInToken = async (
    accoun_id: string,
    project_id: number,
    ftContract: FtContract,
    amount: number
  ) => {

    const callbackUrl = `${window.location.origin}/project/${project_id}`;

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

  projectWithdrawInToken = async (
    project_id: number,
    amount: number | null
  ) => {
    const callbackUrl = `${window.location.origin}`;
    const amountBalance = parseNearAmount(amount?.toString())

    return await this.pegasusContract.project_withdraw_in_token({
      args: {
        project_id,
        amount: amountBalance?.substring(0, amountBalance.length - (24 - 6))
      },
      amount: 1,
      // attachDeposit: parseNearAmount('1'),
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
