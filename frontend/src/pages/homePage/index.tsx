import React, { useEffect, useState } from "react";
import HomeTemplate from "../../components/templates/homeTemplate";
import Header from "../../components/organisms/header";
import PaymentDueDate from "../../components/molecules/paymentDueDate";
import {
  DUE_AMOUNT_CONTENT,
  DUE_AMOUNT_FOOTER_TEXT,
  EMPTY_PAYMENTS_BUTTON,
  EMPTY_PAYMENTS_CONTENT,
  OUTSATNDING_AMOUNT_CONTENT,
  PAYMENTS_ICONLABEL,
  PAYMENT_DUE_DATE_STYLES,
  months,
  paymentColumns,
  paymentProps,
  replaceNumberWithCommas,
} from "../../utils/constants";
import NewCashKick from "../../components/molecules/newCashKick";
import receipt from "../../../public/images/receipt.svg";
import circularProgress from "../../../public/images/circularProgress.svg";
import greeting from "../../../public/images/greeting.svg";
import moreInfo from "../../../public/images/moreInfo.svg";
import cheque from "../../../public/images/cheque.svg";
import Image from "../../components/atoms/image";
import { Box, styled } from "@mui/material";
import IconLabel from "../../components/molecules/iconLabel";
import theme from "../../utils/themes";
import SeederDataGrid from "../../components/organisms/dataGrid";
import EmptyCashAccleration from "../../components/molecules/emptyCashAccleration";
import SeederTypography from "../../components/atoms/typography";
import { getPayments } from "../../services";
import { useAppContext } from "../../context";

interface HomePageProps {
  isExistingUser: boolean;
}

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  padding: "32px",
  gap: "20px",
  maxWidth: "82.5vw",
  width: "100%",
  maxHeight: "49vh",
  background: theme.palette.background.elevation1,
  overflow: "auto",
  borderRadius: "12px",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },

  "&::-webkit-scrollbar-track": {
    background: theme.palette.background.elevation2,
    height: "8px",
    borderRadius: "4px",
    padding: "4px 3px",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.icon.lowemp,
    borderRadius: "20px",
    height: "8px",
  },
});

const HomePage = ({ ...props }: HomePageProps) => {
  const [payments, setPayments] = useState<paymentProps[]>([]);
  const { creditBalance, userId } = useAppContext();

  const currentDate = new Date();

  const date = `${
    months[currentDate.getMonth()]
  } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const time = currentDate.getHours();
  let salutationTime;
  switch (true) {
    case time >= 0 && time < 12:
      salutationTime = "Morning";
      break;
    case time < 18 && time >= 12:
      salutationTime = "Afternoon";
      break;
    default:
      salutationTime = "Evening";
  }

  const salutation = `Good ${salutationTime} ✋`;

  payments.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA.getTime() - dateB.getTime();
  });

  useEffect(() => {
    getPayments(userId).then((res) => {
      if (Array.isArray(res)) {
        const tempArray = res.map((item: paymentProps, index: number) => {
          return { ...item, id: index };
        });
        setPayments(tempArray);
      }
    });
  }, [userId]);

  const greetingNode: React.ReactNode = props.isExistingUser ? (
    <Box
      sx={{
        display: "flex",
        width: "66%",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <PaymentDueDate
        dueDateState={true}
        iconSrc={receipt}
        iconAltText="receipt icon"
        sx={PAYMENT_DUE_DATE_STYLES}
        typographyText={DUE_AMOUNT_CONTENT}
        footerText={DUE_AMOUNT_FOOTER_TEXT}
      />
      <PaymentDueDate
        dueDateState={false}
        iconSrc={circularProgress}
        iconAltText="circular progress icon"
        typographyText={OUTSATNDING_AMOUNT_CONTENT}
        footerText={`$${replaceNumberWithCommas(880000 - creditBalance)}`}
      />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        width: "68%",
        backgroundColor: theme.palette.purple[500],
        borderRadius: "12px",
      }}
    >
      <Image
        src={greeting}
        alt="greeting image"
        style={{ width: "100%", maxHeight: "310px" }}
      />
    </Box>
  );

  return (
    <HomeTemplate
      currentPage
      headerContent={<Header headerContent={salutation} headerFooter={date} />}
      bodyContent={
        <>
          {greetingNode}
          <Box sx={{ display: "flex", width: "33%" }}>
            <NewCashKick creditBalance={creditBalance} />
          </Box>
        </>
      }
      footerContent={
        <StyledBox>
          <IconLabel
            typographyVariant={"heading2"}
            typographyText={PAYMENTS_ICONLABEL}
            typographySx={{ color: theme.palette.textColor.highemp }}
            iconSrc={moreInfo}
            iconAltText={"more information icon"}
            iconFirst={false}
            sx={{ gap: "8px" }}
          />
          <SeederDataGrid
            columns={paymentColumns}
            rows={payments.length === 0 ? [] : payments}
          />
          {payments.length === 0 && (
            <Box
              sx={{
                alignSelf: "center",
                paddingTop: "1.5%",
              }}
            >
              <EmptyCashAccleration
                src={cheque}
                alt={"empty payments image"}
                button={true}
                text={EMPTY_PAYMENTS_BUTTON}
              >
                <SeederTypography
                  text={EMPTY_PAYMENTS_CONTENT}
                  variant="heading3"
                  sx={{ color: theme.palette.textColor.lowemp }}
                />
              </EmptyCashAccleration>
            </Box>
          )}
        </StyledBox>
      }
    />
  );
};

export default HomePage;
