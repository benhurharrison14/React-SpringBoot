import axios from "axios";
import {
  BE_BASE_URL,
  UserLoginInfo,
  UserProps,
  cashKickContractProps,
  newCashKickProps,
  paymentProps,
} from "../utils/constants";
import instance from "../context/axiosInstance";

export const getPayments = async (userId: number) => {
  try {
    const payments = await instance.get(`${BE_BASE_URL}payments/${userId}`);
    return payments.data;
  } catch (error) {
    console.log("Failed to fetch payments");
  }
};

export const getContracts = async () => {
  try {
    const contracts = await instance.get(`${BE_BASE_URL}contracts?ids`);
    return contracts.data;
  } catch (error) {
    console.log("Failed to fetch contracts");
  }
};

export const getCashkicks = async (userId: number) => {
  try {
    const cashkicks = await instance.get(
      `${BE_BASE_URL}cashkicks/getCashKicks/${userId}`
    );
    return cashkicks.data;
  } catch (error) {
    console.log("Failed to fetch cashkicks");
  }
};

export const postCashKick = (
  cashKick: newCashKickProps,
  updateCreditBalance: React.Dispatch<React.SetStateAction<number>>,
  creditBalance: number,
  paymentAmount: number
) => {
  return instance
    .post(`${BE_BASE_URL}cashkicks`, cashKick)
    .then((res) => {
      updateCreditBalance(
        creditBalance - (paymentAmount + paymentAmount * 0.12)
      );
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const postSelectedContracts = (
  cashKickContract: cashKickContractProps
) => {
  instance
    .post(`${BE_BASE_URL}cashkicks/saveSelectedContracts`, cashKickContract)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

export const getSelectedContractIds = async (userId: number) => {
  const cashKicks = await getCashkicks(userId);
  const selectedContracts: cashKickContractProps[] = [];
  cashKicks?.map(async (cashkick: newCashKickProps) => {
    await instance
      .get(`${BE_BASE_URL}cashkicks/${cashkick.cashKickId}`)
      .then((res) => {
        res.data.map((cashKickContract: cashKickContractProps) => {
          if (!selectedContracts.includes(cashKickContract)) {
            selectedContracts.push(cashKickContract);
          }
        });
      });
  });
  return selectedContracts;
};

export const getAllSelectedContracts = async (contractIds: number[]) => {
  try {
    const contracts = await instance.get(
      `${BE_BASE_URL}contracts?ids=${contractIds.join(",")}`
    );
    return contracts.data;
  } catch (error) {
    console.log("Failed to fetch selected contracts");
  }
};

export const postUser = async (user: UserProps) => {
  return axios
    .post(`${BE_BASE_URL}users`, user)
    .then((res) => console.log(res))
    .catch((err) => console.log("error : ", err));
};

export const getUserDetail = async (user: UserLoginInfo) => {
  try {
    const userInfo = await axios.post(`${BE_BASE_URL}users/login`, user);
    return userInfo.data;
  } catch (error) {
    console.log("Failed to fetch user");
  }
};

export const getUser = async (email: string | undefined) => {
  try {
    const userDetails = await axios.get(`${BE_BASE_URL}users/${email}`);
    return userDetails.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (email: string, password: string) => {
  await axios
    .put(`${BE_BASE_URL}users/${email}`, {
      password: password,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const postPayment = async (payment: paymentProps) => {
  console.log(payment);
  return await instance
    .post(`${BE_BASE_URL}payments`, payment)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
