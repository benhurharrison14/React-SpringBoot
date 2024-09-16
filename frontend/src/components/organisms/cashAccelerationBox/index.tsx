import { Box, Stack, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import SeederTypography from "../../atoms/typography";
import theme from "../../../utils/themes";
import SeederIcons from "../../atoms/icon";
import info from "../../../../public/images/moreInfo.svg";
import SeederTabs from "../../molecules/tabs";
import SeederDataGrid from "../dataGrid";
import {
  CashAccelerationBoxConstants,
  EMPTY_CASHKICKS_BUTTON,
  EMPTY_CASHKICKS_CONTENT,
  EMPTY_CONTRACTS_BUTTON,
  EMPTY_CONTRACTS_CONTENT,
  cashAccelerationColumns,
  cashKickColumns,
  cashKickContractProps,
  newCashKickProps,
  newContractsProps,
} from "../../../utils/constants";
import sync from "../../../../public/images/sync-now.svg";
import cheque from "../../../../public/images/cheque.svg";
import {
  getAllSelectedContracts,
  getCashkicks,
  getSelectedContractIds,
} from "../../../services";
import { useAppContext } from "../../../context";
import EmptyCashAccleration from "../../molecules/emptyCashAccleration";

const StyledBox = styled(Box)({
  width: "85vw",
  maxHeight: "49vh",
  border: theme.palette.border.lowemp,
  backgroundColor: theme.palette.background.elevation1,
  padding: "32px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  overflow: "auto",
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

export const CashAccelerationBox = () => {
  const [contracts, setContracts] = useState<newContractsProps[]>([]);
  const [cashKicks, setCashKicks] = useState<newCashKickProps[]>([]);
  const { userId } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      const cashKicksResponse = await getCashkicks(userId);

      if (Array.isArray(cashKicksResponse)) {
        const idArray = cashKicksResponse.map(
          (item: newCashKickProps, index: number) => {
            return { ...item, id: index };
          }
        );
        setCashKicks(idArray);
      }

      const selectedContractIdsResponse = await getSelectedContractIds(userId);

      selectedContractIdsResponse.sort(
        (contract1, contract2) => contract1.contractId - contract2.contractId
      );

      await new Promise((r) => setTimeout(r, 2000));

      if (Array.isArray(selectedContractIdsResponse)) {
        const number = selectedContractIdsResponse.map(
          (contract) => contract.contractId
        );

        const allSelectedContractsResponse = await getAllSelectedContracts(
          number
        );

        const response = selectedContractIdsResponse.map(
          (item: cashKickContractProps, index: number) => {
            const currentContract: newContractsProps[] =
              allSelectedContractsResponse.filter(
                (contract: newContractsProps) =>
                  contract.contractId === item.contractId
              );

            return {
              ...item,
              id: index,
              name: currentContract[0].name,
              type: currentContract[0].type,
              termLength: currentContract[0].termLength,
              perPayment: currentContract[0].perPayment,
              paymentAmount: [
                Number(currentContract[0].paymentAmount),
                item.paymentAmount,
              ],
            };
          }
        );
        setContracts(response);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <StyledBox>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={1}>
          <SeederTypography
            text={CashAccelerationBoxConstants.heading}
            variant="heading2"
            color={theme.palette.textColor.highemp}
          />
          <SeederIcons src={info} alt={"Info Icon"} />
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <SeederIcons src={sync} alt={"syncIcon"} />
          <SeederTypography
            text={CashAccelerationBoxConstants.sideButton}
            variant="button1"
            color={theme.palette.purple[400]}
          />
        </Stack>
      </Stack>
      <SeederTabs
        contractContent={
          <>
            <SeederDataGrid
              columns={cashAccelerationColumns}
              rows={contracts}
            />
            {contracts.length === 0 && (
              <Box
                sx={{
                  alignSelf: "center",
                  paddingTop: "1.5%",
                }}
              >
                <EmptyCashAccleration
                  src={cheque}
                  alt={"empty contracts image"}
                  button={true}
                  text={EMPTY_CONTRACTS_BUTTON}
                >
                  <SeederTypography
                    text={EMPTY_CONTRACTS_CONTENT}
                    variant="heading3"
                    sx={{ color: theme.palette.textColor.lowemp }}
                  />
                </EmptyCashAccleration>
              </Box>
            )}
          </>
        }
        myCashKickContent={
          <>
            <SeederDataGrid columns={cashKickColumns} rows={cashKicks} />
            {cashKicks.length === 0 && (
              <Box
                sx={{
                  alignSelf: "center",
                  paddingTop: "1.5%",
                }}
              >
                <EmptyCashAccleration
                  src={cheque}
                  alt={"empty cashkicks image"}
                  button={true}
                  text={EMPTY_CASHKICKS_BUTTON}
                >
                  <SeederTypography
                    text={EMPTY_CASHKICKS_CONTENT}
                    variant="heading3"
                    sx={{ color: theme.palette.textColor.lowemp }}
                  />
                </EmptyCashAccleration>
              </Box>
            )}
          </>
        }
      />
    </StyledBox>
  );
};
