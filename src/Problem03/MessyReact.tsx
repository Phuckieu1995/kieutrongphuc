import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // them field
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    // type blockchain la string
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // const balancePriority = getPriority(balance.blockchain);
        // if (lhsPriority > -99) {
        //   if (balance.amount <= 0) {
        //     return true;
        //   }
        // }
        // return false;

        // bien balancePriority ko duoc goi o dau ca, WalletBalance interface ko co field blockchain
        // doan code tren filter balance co amount > 0 , de phu hop voi doan code phia duoi
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99) {
          if (balance.amount > 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // if (leftPriority > rightPriority) {
        //   return -1;
        // } else if (rightPriority > leftPriority) {
        //   return 1;
        // }

        // doan code nay sap xep giam dan, nen trai lon hon thi ko doi cho, nguoc lai bang hoac trai nho hon thi swap nen ko can else if o day
        if (leftPriority > rightPriority) {
          return -1;
        }

        return 1;
      });
  }, [balances, prices]);

  //   const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //     return {
  //       ...balance,
  //       formatted: balance.amount.toFixed(),
  //     };
  //   });

  // bien thieu type va khong dc call o dau
  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    }
  );

  //   const rows = sortedBalances.map(
  //     (balance: FormattedWalletBalance, index: number) => {
  //       const usdValue = prices[balance.currency] * balance.amount;
  //       return (
  //         <WalletRow
  //           className={classes.row}
  //           key={index}
  //           amount={balance.amount}
  //           usdValue={usdValue}
  //           formattedAmount={balance.formatted}
  //         />
  //       );
  //     }
  //   );

  // sortedBalances la array WalletBalance nen ko co phan tu co type la FormattedWalletBalance, thay sortedBalances bang bien formattedBalances
  // bai sua hoan chinh o file MessyReactResult cung thu muc
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
