import axios, { AxiosResponse } from "axios";
import {
  getAllSelectedContracts,
  getCashkicks,
  getContracts,
  getPayments,
  getSelectedContractIds,
  getUser,
  getUserDetail,
  postCashKick,
  postPayment,
  postSelectedContracts,
  postUser,
  resetPassword,
} from ".";
import {
  BE_BASE_URL,
  cashAcclerationRows,
  cashKickRows,
  mockContracts,
  mockPayments,
} from "../utils/constants";
import instance from "../context/axiosInstance";

jest.mock("axios");
jest.mock("../context/axiosInstance.js", () => {
  const instance = axios.create();
  return {
    create: jest.fn(() => instance),
  };
});

export const defaultNewCashKick = {
  cashKickId: 1,
  name: "",
  status: "",
  maturity: new Date(),
  totalReceived: 0,
  totalFinanced: 0,
  rate: 12,
  createdDate: new Date(),
  updatedDate: new Date(),
  userId: 1,
};

const user = {
  name: "Test",
  email: "test@gmail.com",
  password: "Test@123",
  creditBalance: 880000,
};

const userLoginInfo = {
  email: "test@gmail.com",
  password: "Test@123",
};

const mockCashKickContract = {
  cashKickId: 11,
  contractId: 2,
  paymentAmount: 2000,
};

const mockPayment = {
  id: 1,
  dueDate: new Date(),
  status: "Upcoming",
  expectedAmount: 14204.55,
  outstandingAmount: 99431.85,
  userId: 1
}

describe("services", () => {
  it("verify get request for payments", async () => {
    instance.get = jest.fn().mockResolvedValue({ data: mockPayments });
    const payments = await getPayments(1);
    expect(payments).toEqual(mockPayments);
    expect(instance.get).toHaveBeenCalledWith(`${BE_BASE_URL}payments/1`);
  });

  it("verify get request for contracts", async () => {
    instance.get = jest.fn().mockResolvedValue({ data: cashAcclerationRows });
    const contracts = await getContracts();
    expect(contracts).toEqual(cashAcclerationRows);
    expect(instance.get).toHaveBeenCalledWith(`${BE_BASE_URL}contracts?ids`);
  });

  it("verify get request for cashkicks", async () => {
    instance.get = jest.fn().mockResolvedValue({ data: cashKickRows });
    const cashKicks = await getCashkicks(1);
    expect(cashKicks).toEqual(cashKickRows);
  });

  it("verify network error", async () => {
    instance.get = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch files"));
    instance.post = jest
      .fn()
      .mockRejectedValue(new Error("Failed to post a cashkick"));

    const consoleErrorMock = jest.spyOn(console, "log").mockImplementation();

    await getPayments(1)

    await postPayment(mockPayment)

    await getCashkicks(1);

    await getContracts();

    await postCashKick(defaultNewCashKick, jest.fn(), 1000, 200);

    await postSelectedContracts(mockCashKickContract);

    await getAllSelectedContracts([2, 3, 1]);

    consoleErrorMock.mockRestore();
  });

  it("verify post request for payments",async () => {
    instance.post = jest.fn().mockResolvedValue({});
    await postPayment(mockPayment)
    expect(instance.post).toHaveBeenCalledTimes(1)
    expect(instance.post).toHaveBeenCalledWith(`${BE_BASE_URL}payments`, mockPayment)
  })

  it("verify post request for cashkicks", async () => {
    instance.post = jest.fn().mockResolvedValue({});
    const updateCreditBalance = jest.fn();
    const creditBalance = 1000;
    const paymentAmount = 200;

    await postCashKick(
      defaultNewCashKick,
      updateCreditBalance,
      creditBalance,
      paymentAmount
    );

    expect(instance.post).toHaveBeenCalledWith(
      BE_BASE_URL + `cashkicks`,
      defaultNewCashKick
    );

    expect(updateCreditBalance).toHaveBeenCalledWith(
      creditBalance - (paymentAmount + paymentAmount * 0.12)
    );
  });

  it("verify post request for selected contracts", async () => {
    instance.post = jest.fn().mockResolvedValue({});
    await postSelectedContracts(mockCashKickContract);
    expect(instance.post).toHaveBeenCalledWith(
      BE_BASE_URL + `cashkicks/saveSelectedContracts`,
      mockCashKickContract
    );
  });

  it("verify get request for selected contracts ids", async () => {
    const userId = 1;

    instance.get = jest.fn().mockResolvedValue({ data: cashKickRows });
    const cashKicks = await getCashkicks(userId);
    expect(cashKicks).toEqual(cashKickRows);
    await getSelectedContractIds(userId);
    expect(instance.get).toHaveBeenCalledTimes(3);
  });

  it("verify get request for selected contracts ids for new user", async () => {
    const userId = 1;

    instance.get = jest.fn().mockResolvedValue({ data: [] });

    const cashKicks = await getCashkicks(userId);
    expect(cashKicks).toEqual([]);
    await getSelectedContractIds(userId);
    expect(instance.get).toHaveBeenCalledTimes(2);
  });

  it("verify get request for selected contracts", async () => {
    const contractsList = [1, 2, 3];
    instance.get = jest.fn().mockResolvedValue({ data: mockContracts });
    const selectedContracts = (await getAllSelectedContracts(
      contractsList
    )) as AxiosResponse;
    expect(selectedContracts).toEqual(mockContracts);
  });

  it("should make a POST request to create a user", async () => {
    axios.post = jest
      .fn()
      .mockResolvedValue({ data: "User created successfully" });
    await postUser(user);
    expect(axios.post).toHaveBeenCalledWith(`${BE_BASE_URL}users`, user);
  });

  it("should log an error if the POST request fails", async () => {
    axios.post = jest
      .fn()
      .mockRejectedValue(new Error("Failed to create user"));
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    await postUser(user);
    expect(axios.post).toHaveBeenCalledWith(`${BE_BASE_URL}users`, user);
    consoleLogSpy.mockRestore();
  });

  it("should make a POST request to retrieve user details", async () => {
    axios.post = jest.fn().mockResolvedValue({ data: {} });
    const userInfo = await getUserDetail(userLoginInfo);
    expect(axios.post).toHaveBeenCalledWith(
      `${BE_BASE_URL}users/login`,
      userLoginInfo
    );
    expect(userInfo).toEqual({});
  });

  it("should log an error if the Login request fails", async () => {
    axios.post = jest.fn().mockRejectedValue(new Error("Failed to Login"));
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    await getUserDetail(userLoginInfo);
    expect(axios.post).toHaveBeenCalledWith(
      `${BE_BASE_URL}users/login`,
      userLoginInfo
    );
    consoleLogSpy.mockRestore();
  });

  it("should get User Details of the email", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: user });
    const mockUser = await getUser("test@gmail.com");
    expect(mockUser).toEqual(user);
  });

  it("should handle a network error and log it", async () => {
    axios.get = jest
      .fn()
      .mockRejectedValue(new Error("Failed to login"));
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    await getUser("test@gmail.com");
    expect(axios.get).toHaveBeenCalledWith(`${BE_BASE_URL}users/test@gmail.com`);
    consoleLogSpy.mockRestore();
  });

  it("should update user password", async () => {
    axios.put = jest.fn().mockResolvedValue({ data: user });
    await resetPassword("test@gmail.com", "Password12@");
  });

  it("should handle a network error and errors in resetting password", async () => {
    axios.put = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch payments"));
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    await resetPassword("test@gmail.com", "Password123");
    consoleLogSpy.mockRestore();
  });
});
