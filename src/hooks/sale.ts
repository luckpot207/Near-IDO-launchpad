import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { keysToCamel } from "../utils/string";
import { useNearLogin, useNearContext } from "./Near";
import Big from "big.js";

const defaultSales = {
  loading: true,
  sales: [],
};

const OneWeek = 7 * 24 * 60 * 60 * 1000;

const mapSubscription = (obj: any) => {
  return {
    claimedOutBalance: obj.claimedOutBalance.map(Big),
    spentInBalance: Big(obj.spentInBalance),
    remainingInBalance: Big(obj.remainingInBalance),
    unclaimedOutBalances: obj.unclaimedOutBalances.map(Big),
    shares: Big(obj.shares),
    referralId: obj.referralId,
  };
};

const saleRefreshTimers = {};

export const addSaleMethods = (s: any) => {
  s.started = () => s.remainingDuration < s.duration;
  s.ended = () => s.remainingDuration === 0;
  s.farAhead = () => !s.started() && s.startTime - s.currentTime > OneWeek;
  return s;
};

export const mapSale = (obj: any) => {
  obj = keysToCamel(obj);
  obj.outTokens.forEach((o: any) => {
    o.remaining = Big(o.remaining);
    o.distributed = Big(o.distributed);
    if (o.treasuryUnclaimed) {
      o.treasuryUnclaimed = Big(o.treasuryUnclaimed);
    }
  });
  obj.inTokenRemaining = Big(obj.inTokenRemaining);
  obj.inTokenPaidUnclaimed = Big(obj.inTokenPaidUnclaimed);
  obj.inTokenPaid = Big(obj.inTokenPaid);
  obj.totalShares = Big(obj.totalShares);
  obj.startTime = parseFloat(obj.startTime) / 1e6;
  obj.startDate = new Date(obj.startTime);
  obj.duration = parseFloat(obj.duration) / 1e6;
  obj.endTime = obj.startTime + obj.duration;
  obj.endDate = new Date(obj.endTime);
  obj.remainingDuration = parseFloat(obj.remainingDuration) / 1e6;
  if (obj.currentTime) {
    obj.currentTime = parseFloat(obj.currentTime) / 1e6;
    obj.currentDate = new Date(obj.currentTime);
  } else {
    obj.currentDate = new Date(obj.startTime + obj.duration - obj.remainingDuration);
    obj.currentTime = obj.currentDate.getTime();
  }
  if (obj.subscription) {
    obj.subscription = mapSubscription(obj.subscription);
  }
  return addSaleMethods(obj);
};

export const useSales = singletonHook(defaultSales, () => {
  const [sales, setSales] = useState<any>(defaultSales);
  const { isLoggedInNear, accountIdNear } = useNearLogin();
  const { pegasusContract } = useNearContext();

  useEffect(() => {
    if (!isLoggedInNear) {
      return;
    }
    let scheduleRefresh: any = null;

    const localMapSale = (sale: any) => {
      sale = mapSale(sale);
      sale.scheduleRefresh = (fast: any) => scheduleRefresh(sale, fast);
      return sale;
    };

    const fetchSale = async (saleId: string) => {
      return localMapSale(
        await pegasusContract.get_sale(saleId, accountIdNear)
      );
    };
    const refreshSale = async (saleId: string) => {
      const sale = await fetchSale(saleId);
      setSales((prev: any) =>
        Object.assign({}, prev, {
          sales: Object.assign([], prev.sales, { [saleId]: sale }),
        })
      );
    };

    // scheduleRefresh = (sale: any, fast: any) => {
    //   clearTimeout(saleRefreshTimers[sale.saleId]);
    //   saleRefreshTimers[sale.saleId] = null;
    //   if (!sale.ended()) {
    //     saleRefreshTimers[sale.saleId] = setTimeout(
    //       async () => {
    //         if (!document.hidden) {
    //           await refreshSale(sale.saleId);
    //         } else {
    //           scheduleRefresh(sale, fast);
    //         }
    //       },
    //       fast ? 1000 : sale.started() ? 5000 : 30000
    //     );
    //   }
    // };
    const fetchSales = async () => {
      const rawSales = await pegasusContract.get_sales(accountIdNear);
      const sales = rawSales.map(localMapSale);
      return sales;
    };

    fetchSales()
      .then((sales) => {
        setSales({
          loading: false,
          sales,
          fetchSale,
          refreshSale,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [accountIdNear]);

  return sales;
});