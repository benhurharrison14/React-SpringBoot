import React from "react";
import HomeTemplate from "../../components/templates/homeTemplate";
import Header from "../../components/organisms/header";
import {
  CASH_ACCELERATION_CONTENT,
  CASH_ACCELERATION_FOOTER,
  replaceNumberWithCommas,
} from "../../utils/constants";
import { CashAccelerationData } from "../../components/molecules/cashAccelerationData";
import NewCashKick from "../../components/molecules/newCashKick";
import { CashAccelerationBox } from "../../components/organisms/cashAccelerationBox";
import { useAppContext } from "../../context";

const CashAccelerationPage = () => {
  const { creditBalance } = useAppContext();

  return (
    <HomeTemplate
      headerContent={
        <Header
          headerContent={CASH_ACCELERATION_CONTENT}
          headerFooter={CASH_ACCELERATION_FOOTER}
        />
      }
      bodyContent={
        <>
          <CashAccelerationData
            termCap={"12 Months"}
            availableCredit={`$${replaceNumberWithCommas(creditBalance)}`}
            maxInterestRate={"12.00%"}
          />
          <NewCashKick creditBalance={creditBalance} />
        </>
      }
      footerContent={<CashAccelerationBox />}
      currentPage={false}
    />
  );
};

export default CashAccelerationPage;
