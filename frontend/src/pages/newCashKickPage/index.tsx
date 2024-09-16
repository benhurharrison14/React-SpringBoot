import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeTemplate from "../../components/templates/homeTemplate";
import Header from "../../components/organisms/header";
import {
  NEW_CASHKICK_CONTENT,
  NEW_CASHKICK_FOOTER,
  SUMMARY_TERM_DURATION,
  cashAccelerationColumns,
  cashKickResponseProps,
  newContractsProps,
  newContractsPropsResponse,
} from "../../utils/constants";
import IconLabel from "../../components/molecules/iconLabel";
import SeederDataGrid from "../../components/organisms/dataGrid";
import theme from "../../utils/themes";
import moreInfo from "../../../public/images/moreInfo.svg";
import SeederIcons from "../../components/atoms/icon";
import leftArrow from "../../../public/images/arrow-left.svg";
import SeederTypography from "../../components/atoms/typography";
import Summary from "../../components/organisms/summary";
import { GridRowId } from "@mui/x-data-grid";
import Button from "../../components/atoms/button";
import Modal from "../../components/organisms/modal";
import NameCashKick from "../../components/organisms/nameCashKickModal";
import CashKickSuccess from "../../components/molecules/cashKickSuccessModal";
import {
  getContracts,
  postCashKick,
  postPayment,
  postSelectedContracts,
} from "../../services";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context";

const MainContainer = styled("div")({
  display: "flex",
  width: "100%",
});

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  padding: "32px",
  gap: "20px",
  maxWidth: "65vw",
  maxHeight: "73vh",
  background: theme.palette.background.elevation1,
  overflow: "auto",
  borderRadius: "12px",
  width: "100%",
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

const buttonSx = {
  color: theme.palette.textColor.highemp,
  border: `1px solid ${theme.palette.border.lowemp}`,
  borderRadius: "12px",
  padding: "6px 12px",
  maxWidth: "100px",
};

const NewCashKickHeader = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
      }}
    >
      <Header
        headerContent={NEW_CASHKICK_CONTENT}
        headerFooter={NEW_CASHKICK_FOOTER}
      />

      <Button
        sx={buttonSx}
        variant="outlined"
        startIcon={<SeederIcons src={leftArrow} alt={"Left Arrow"} />}
        onClick={() => navigate("/home")}
      >
        <SeederTypography variant="button1" text={"Back"} />
      </Button>
    </div>
  );
};

const NewCashKickBody = () => {
  const [rowId, setRowId] = useState<GridRowId[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [unSelectedRow, setUnSelectedRow] = useState<newContractsProps[]>([]);
  const [partialPayment, setPartialPayment] = useState<number>(0);
  const [review, setReview] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [submitReview, setSubmitReview] = useState<boolean>(false);
  const [cashAccelerationRows, setCashAccelerationRows] = useState<
    newContractsProps[]
  >([]);
  const [nameCashKick, setNameCashKick] = useState<string>("");
  const [alterable, setAlterable] = useState<boolean>(true);

  const { setCreditBalance, creditBalance, userId } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    getContracts().then((res) => {
      const response = res.map(
        (item: newContractsPropsResponse, index: number) => {
          const paymentAmnt = item.paymentAmount.split(",").map(parseFloat);
          return { ...item, id: index + 1, paymentAmount: paymentAmnt };
        }
      );

      setCashAccelerationRows(response);
    });
  }, [userId]);

  const redirectHome = () => {
    navigate("/home");
  };

  const createNewCashKick = () => ({
    name: nameCashKick,
    status: "Pending",
    maturity: new Date(),

    totalFinanced: sliderValue + sliderValue * 0.12,
    totalReceived: sliderValue,
    rate: 12,
    createdDate: new Date(),
    updatedDate: new Date(),
    userId: userId,
  });

  const createCashKickContract = (
    cashKickId: number,
    contractId: number,
    paymentAmount: number
  ) => ({
    cashKickId: cashKickId,
    contractId: contractId,
    paymentAmount: paymentAmount,
  });

  const totalAmount = sliderValue + sliderValue * 0.12;

  const createPayment = (month: number, dueDate: Date) => ({
    dueDate: dueDate,
    status: "Upcoming",
    expectedAmount: totalAmount / 12,
    outstandingAmount: totalAmount - month * (totalAmount / 12),
    userId: userId
  });

  const handleNameSubmit = async () => {
    const savedCashKick: cashKickResponseProps = await postCashKick(
      createNewCashKick(),
      setCreditBalance,
      creditBalance,
      sliderValue
    );

    const lastRow = rowId.pop();
    const lastSelectedContract = cashAccelerationRows[Number(lastRow) - 1];

    rowId.forEach((row) => {
      const currentContract = cashAccelerationRows[Number(row) - 1];
      postSelectedContracts(
        createCashKickContract(
          savedCashKick.cashKickId,
          currentContract.contractId,
          currentContract.paymentAmount[0]
        )
      );
    });

    postSelectedContracts(
      createCashKickContract(
        savedCashKick.cashKickId,
        lastSelectedContract.contractId,
        partialPayment > 0
          ? partialPayment
          : lastSelectedContract.paymentAmount[0]
      )
    );

    const currentDate = new Date();

    for (let i = 1; i <= 12; i++) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      const dueDate = currentDate.toISOString().substring(0,10);
      postPayment(createPayment(i,new Date(dueDate)))
    }

    setSubmitReview(true);
  };

  const handleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setUnSelectedRow((prevUnselectedRow) =>
      [...prevUnselectedRow].sort(
        (a, b) => a.paymentAmount[0] - b.paymentAmount[0]
      )
    );

    setUnSelectedRow(
      cashAccelerationRows.filter(
        (contract) => !rowId.includes(contract.contractId)
      )
    );

    const selectedContractsTotal = cashAccelerationRows
      .filter((contract) => rowId.includes(contract.contractId))
      .reduce((total, contract) => {
        const paymentAmount = contract.paymentAmount[0];
        return total + paymentAmount;
      }, 0);

    setTotalPayment(
      selectedContractsTotal < creditBalance
        ? selectedContractsTotal
        : creditBalance
    );
    if (selectedContractsTotal - partialPayment > 0) {
      const val = selectedContractsTotal - partialPayment;
      setSliderValue(val > creditBalance / 1.12 ? creditBalance / 1.12 : val);
    } else {
      setSliderValue(0);
      setPartialPayment(0);
    }
  }, [rowId]);

  useEffect(() => {
    const selectedRowIds = [...rowId];

    let selectedContractsTotal = cashAccelerationRows
      .filter((contract) => rowId.includes(contract.contractId))
      .reduce((total, contract) => {
        const paymentAmount = contract.paymentAmount[0];
        return total + paymentAmount;
      }, 0);

    const payments = cashAccelerationRows.filter((contract) =>
      rowId.includes(contract.contractId)
    );

    if (selectedContractsTotal > creditBalance) {
      let lastPayment = payments[payments.length - 1].paymentAmount[0];
      while (selectedContractsTotal - lastPayment >= creditBalance) {
        selectedContractsTotal -= lastPayment;
        payments.pop();
        lastPayment = payments[payments.length - 1].paymentAmount[0];
        selectedRowIds.pop();
      }
      const partial = selectedContractsTotal - creditBalance / 1.12;

      setPartialPayment(partial);
      setRowId(selectedRowIds);
    }
  }, [sliderValue]);

  const onHandleSlider = (event: Event, value: number | number[]) => {
    let totalSelectedPayment = totalPayment;
    const selectedRowIds = [...rowId];
    const currValue = value as number;

    const shiftUnselectedRows = () => {
      const firstRow = unSelectedRow.shift();
      if (firstRow) {
        selectedRowIds.push(firstRow.contractId);
        totalSelectedPayment += firstRow.paymentAmount[0];
      }
    };

    const shiftSelectedRows = () => {
      const firstRow = cashAccelerationRows.find(
        (contract) => contract.id === selectedRowIds[0]
      );
      if (firstRow) {
        const shiftRowId = selectedRowIds.shift();
        if (shiftRowId) {
          totalSelectedPayment -= firstRow.paymentAmount[0];
          unSelectedRow.push(firstRow);
          setPartialPayment(totalSelectedPayment - currValue);
        }
      }
    };

    setUnSelectedRow(
      cashAccelerationRows.filter(
        (contract) => !rowId.includes(contract.contractId)
      )
    );

    const handlePositiveChange = () => {
      const first = unSelectedRow[0];
      if (first) {
        const firstPayment = first.paymentAmount[0];
        if (totalSelectedPayment + firstPayment > currValue) {
          const partialAmount = totalSelectedPayment + firstPayment - currValue;
          setPartialPayment(partialAmount);
          shiftUnselectedRows();
        } else {
          shiftUnselectedRows();
        }
      }
    };

    if (currValue > totalSelectedPayment) {
      while (currValue > totalSelectedPayment && unSelectedRow.length > 0) {
        handlePositiveChange();
      }
    } else {
      while (currValue < totalSelectedPayment && selectedRowIds.length > 0) {
        const firstId = selectedRowIds[0];
        const firstRow = cashAccelerationRows.find(
          (contract) => contract.id === firstId
        );
        if (firstRow) {
          const firstPayment = firstRow.paymentAmount[0];
          if (totalSelectedPayment - firstPayment < currValue) {
            if (
              !(
                currValue > 0 &&
                selectedRowIds.length > 1 &&
                currValue < totalSelectedPayment - firstPayment
              )
            ) {
              break;
            }
          } else {
            shiftSelectedRows();
          }
        }
      }
    }
    setTotalPayment(totalSelectedPayment);

    setRowId(selectedRowIds);
  };

  const handleReset = () => {
    setRowId([]);
    setPartialPayment(0);
  };

  const handleReview = () => {
    setReview(false);
    setAlterable(false);
    const lastRowId = rowId[rowId.length - 1];
    const lastRow = cashAccelerationRows.find(
      (contract) => contract.id === lastRowId
    );
    if (partialPayment > 0 && lastRow) {
      lastRow.paymentAmount.push(partialPayment);
    }
  };

  const selectedRowId = (): newContractsProps[] => {
    return cashAccelerationRows.filter((contract) =>
      rowId.includes(contract.contractId)
    );
  };

  const handleViewCashKick = () => {
    navigate("/cash-acceleration");
  };

  return (
    <>
      <StyledBox>
        <IconLabel
          typographySx={{ color: theme.palette.textColor.highemp }}
          typographyText="Your Contracts"
          typographyVariant="heading2"
          iconSrc={moreInfo}
          iconAltText="information icon"
          iconFirst={false}
          sx={{ gap: "8px" }}
        />
        <SeederDataGrid
          columns={cashAccelerationColumns}
          rows={alterable ? cashAccelerationRows : selectedRowId()}
          type={alterable}
          handleSelection={setRowId}
          selectedRows={alterable ? rowId : []}
        />
      </StyledBox>
      <Box
        sx={{
          display: "flex",
          maxWidth: "20vw",
          width: "100%",
          maxHeight: "73vh",
        }}
      >
        <Summary
          slider={review}
          selectedContracts={rowId.length}
          termDuration={SUMMARY_TERM_DURATION}
          maxSliderAmount={creditBalance / 1.12}
          value={sliderValue}
          setValue={setSliderValue}
          onHandleResetBtn={handleReset}
          onHandleSlider={onHandleSlider}
          handleReview={handleReview}
          handleSubmit={handleModal}
        />
      </Box>
      {
        <Modal modalOpen={open} modalOnClose={handleModal}>
          {submitReview ? (
            <CashKickSuccess
              handleCancelButton={redirectHome}
              handleCrossIcon={redirectHome}
              handleViewCashKickButton={handleViewCashKick}
            />
          ) : (
            <NameCashKick
              handleCreateCashKickButton={handleNameSubmit}
              handleCancelButton={handleModal}
              handleCrossIcon={handleModal}
              setNameCashKick={setNameCashKick}
            />
          )}
        </Modal>
      }
    </>
  );
};

const NewCashkickPage = () => {
  return (
    <MainContainer>
      <HomeTemplate
        headerContent={<NewCashKickHeader />}
        bodyContent={<NewCashKickBody />}
        currentPage={false}
      />
    </MainContainer>
  );
};

export default NewCashkickPage;
