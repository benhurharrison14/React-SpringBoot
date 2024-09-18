import settings from "../../public/images/settings.svg";
import logout from "../../public/images/logoutIcon.svg";
import React from "react";
import { GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import SeederTypography from "../components/atoms/typography";
import theme from "./themes";
import SeederChip from "../components/atoms/chips";

export const iconLabelStyles = {
  width: "210px",
  height: "49px",
  gap: "12px",
  padding: "16px",
  borderRadius: "12px",
};

export const NEW_CASHKICK_HEADER = "Launch a new Cash Kick";
export const NEW_CASHKICK_LEFT_CONTENT = "You have upto ";
export const NEW_CASHKICK_RIGHT_CONTENT = " available for a new cash advance";
export const NEW_CASHKICK_BUTTON = "New Cash Kick";
export const CASH_KICK_LAUNCH_TEXT = "Cash kick launched successfully!";
export const CASH_KICK_REVIEW_TEXT = "We are reviewing your cash kick";
export const CROSS_ICON_ALT = "Cross Icon";
export const CASH_KICK_LOADER_ALT = "Cash Kick Loader";
export const CASH_KICK_UNDER_REVIEW_TEXT = "Your cash kick is under review";
export const CASH_KICK_REVIEW_MAIN_TEXT =
  "It will remain on pending state until we review it internally. This can take upto 5 mins to couple of hours. Once reviewed, the cash will be transferred to your account and you’ll be notified.";
export const CLOSE_BTN_ALT = "Close";
export const CANCEL_BTN_ALT = "Cancel";
export const VIEW_CASH_KICK_ALT = "View cash kicks";
export const PAYMENT_DUE_DATE = "Due in 30 day(s)";
export const DUE_AMOUNT_CONTENT = "Due - May 03, 2021";
export const DUE_AMOUNT_FOOTER_TEXT = "$14,204.55";
export const OUTSATNDING_AMOUNT_CONTENT = "Outstanding amount";
export const OUTSTANDING_AMOUNT_FOOTER_TEXT = "$170,454.55";
export const ResetEmailMolecule = {
  resetEmailTrueHeading: "Reset Email Sent",
  resetEmailTrueFirstHalf: "We have sent mail to ",
  resetEmailSecondHalf: " with reset password instructions",
  resetEmailFalseHeading: "Password Reset successful",
  resetEmailFalseMessage: "Click on button below to proceed to login",
};
export const SUMMARY_HEADER_CONTENT = "Summary";
export const SUMMARY_CARD_INFO = ["Term", "Selected contracts"];
export const SUMMARY_TERM_DURATION = 12;
export const SUMMARY_SLIDER_HEADER = "Slide to autoselect";
export const SUMMARY_SLIDER_RESET_BUTTON = "Reset";
export const SUMMARY_SLIDER_SELECTED_OF = " selected of ";
export const SLIDER_MAX_AMOUNT = 880000;
export const SUMMARY_PAY_BACK_AMOUNT = "Pay back amount";
export const SUMMARY_RATE_PERCENT = "Rate %";
export const SUMMARY_RATE_VALUE = "(12.00%) ";
export const SUMMARY_TOTAL_PAYOUT = "Total Payout";
export const SUMMARY_REVIEW_CREDIT_BUTTON = "Review Your Credit";
export const SUMMARY_SUBMIT_CREDIT_BUTTON = "Submit Your Credit";
export const replaceNumberWithCommas = (value: number | string) => {
  return Number(value)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const CHEQUE_ALT = "Cheque Image";
export const NO_CASH_KICK = "You don’t have any Cash Kick";
export const LAUNCH_NEW_CASHKICK = "Launch A New Cash Kick";
export const FAILED_CONNECTION = "oops! Failed to connect";
export const CONTACT_CUSTOMER =
  "Please contact customer support if this problem persists";
export const CONNECTION_SUCCESS = "Connected Successfully!";
export const FINANCE_PLANNING = "Finance Planning";
export const CONNECT_NOW = "Connect Now";
export const CONNECT_PAYMENT = "Connect your preferred payments or";

export const LOGOUT_DROPDOWN_USER_NAME = "Kane Cooper";
export const LOGOUT_DROPDOWN_EDIT_PROFILE = "Edit Profile";
export const LOGOUT_DROPDOWN_ITEM_INFO = ["Manage Subscriptions", "Help"];
export const LOGOUT_ICON_LABEL_ITEMS = [
  {
    id: 1,
    name: "Settings",
    altText: "settings icon",
    src: settings,
  },
  {
    id: 2,
    name: "Log Out",
    altText: "logout icon",
    src: logout,
  },
];

export const CashAccelerationDataMolecule = {
  termCap: "Term cap",
  availableCredit: "Available credit",
  interestRate: "Max interest rate",
};

export const NAME_CASH_KICK = "Name your cash kick";
export const IDENTIFY_CASH_KICK = "Add a name to identify your cash kick";
export const CASH_KICK_NAME = "Cash kick name";
export const NAME_CASH_KICK_PLACEHOLDER = "Ex: marketing expenses";
export const CREATE_CASH_KICK = "Create cash kick";
export const SideNavBarConstants = {
  header: "Seeder",
  button1: "Home",
  button2: "Cash Acceleration",
  footer: "Watch how to",
};
export const SUBSCRIPTION_PLATFORM =
  "subscriptions platform to import contracts";
export const FAILED_CONTRACTS = "Failed to load contracts!";
export const LOGIN_HEADER_TEXT = "Login to Seeder ✨";
export const ENTER_EMAIL_HEAD_TEXT = "Enter your mail id and password to login";
export const LOGIN_PLACEHOLDER = "Enter your email id";
export const LOGIN_PASSWORD_PLACEHOLDER = "Enter your password";
export const LOCK_ICON_ALT = "Lock Icon";
export const DIRECT_NOTIFICATION_ALT = "Direct Notification Icon";
export const CONTINUE_ALT = "Continue";
export const GOOGLE_ALT = "Google";
export const STRIPE_ALT = "Stripe";
export const XERO_ALT = "Xero";
export const NO_ACCOUNT = "Don’t have an account?";
export const SIGNUP_ALT = "Sign Up";
export const VISIBILITY_ALT = "Visible Icon";
export const NAME_PLACEHOLDER = "Your Name";
export const SMILE_ICON_ALT = "Smile Icon";
export const SIGNIN_ALT = "Login";
export const SIGNUP_HEADER_TEXT = "Sign Up ✨";
export const SIGNUP_EMAIL_PLACEHOLDER = "Email Address";
export const SIGNUP_PASSWORD_PLACEHOLDER = "Password";
export const SINGUP_ALT = "Sign Up";
export const FORGOT_PASSWORD = "Forgot Password?";
export const ALREADY_AN_ACCOUNT = "Already have an account?";
export const VALIDEMAIL =
  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const VALIDPASSWORD = /^(.{0,7}|\D*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
export const PASS_ERROR =
  "Password must contain at least 8 characters, including letters and numbers";
export const EMAIL_ERROR = "Invalid email address";
export const EMPTY_FIELD = "Thie Field can not be empty";

export interface cashAcclerationRowsProps {
  id: number;
  name: string;
  type: string;
  perPayment: number;
  termLength: string[];
  paymentAmount: number[];
}

export interface newContractsProps {
  id?: number;
  contractId: number;
  name: string;
  type: string;
  perPayment: number;
  termLength: number;
  paymentAmount: number[];
}

export interface newContractsPropsResponse {
  id?: number;
  contractId: number;
  name: string;
  type: string;
  perPayment: number;
  termLength: number;
  paymentAmount: string;
}

export interface newCashKickProps {
  cashKickId?: number;
  name: string;
  status: string;
  maturity: Date;
  totalReceived: number;
  totalFinanced: number;
  rate: number;
  createdDate: Date;
  updatedDate: Date;
  userId: number;
}

export interface cashKickResponseProps {
  cashKickId: number;
  name: string;
  status: string;
  maturity: Date;
  totalReceived: number;
  totalFinanced: number;
  rate: number;
  createdDate: Date;
  updatedDate: Date;
  userId: number;
}

export interface cashKickContractProps {
  cashKickId?: number;
  contractId: number;
  paymentAmount: number;
}

export const formatDate = (currentDate: Date) => {
  const newDate = new Date(currentDate);
  return `${newDate.toLocaleString("en-us", {
    month: "short",
  })} ${newDate.getDate()}, ${newDate.getFullYear()}`;
};

export interface cashKickProps {
  id?: number;
  name: string;
  status: string;
  maturity: string;
  totalFinanced: number;
  totalReceived: (string | number)[];
  contracts: GridRowId[];
}

export const cashAcclerationRows = [
  {
    id: 1,
    name: "Contract 1",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: ["12 months", "12.0% fee"],
    paymentAmount: ["$63,360.00"],
  },
  {
    id: 2,
    name: "Contract 2",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: ["12 months", "12.0% fee"],
    paymentAmount: ["$63,360.00"],
  },
  {
    id: 3,
    name: "Contract 3",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: ["12 months", "12.0% fee"],
    paymentAmount: ["$63,360.00"],
  },
  {
    id: 4,
    name: "Contract 4",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: ["12 months", "12.0% fee"],
    paymentAmount: ["$63,360.00"],
  },
  {
    id: 5,
    name: "Contract 5",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: ["12 months", "12.0% fee"],
    paymentAmount: ["$63,360.00"],
  },
  {
    id: 6,
    name: "Contract 6",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: ["12 months", "12.0% fee"],
    paymentAmount: ["$63,360.00"],
  },
  {
    id: 7,
    name: "Contract 7",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: ["12 months", "12.0% fee"],
    paymentAmount: ["$63,360.00"],
  },
  {
    id: 8,
    name: "Contract 8",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: ["12 months", "12.0% fee"],
    paymentAmount: ["$63,360.00"],
  },
];

export const cashKickRows = [
  {
    id: 1,
    name: "My first advance",
    status: "Pending",
    maturity: "Apr 03, 2022",
    totalReceived: ["$150,000.00", "12.0% fee"],
    totalFinanced: "$170,454.55",
  },
];
export const HOME_HEADER_CONTENT = "Good afternoon ✋";
export const HOME_HEADER_FOOTER = "April 03,2021";
export const CASH_ACCELERATION_CONTENT = "Cash Acceleration";
export const CASH_ACCELERATION_FOOTER =
  "Place to create new cash kicks to run your business";
export const NEW_CASHKICK_CONTENT = "New cash kick";
export const NEW_CASHKICK_FOOTER =
  "Let's setup a new cash kick to power your Saas";
export const ChangePasswordConstants = {
  trueHeading: "Forgot Password",
  falseHeading: "Change Password",
  firstPlaceholder: "Enter new password",
  secondPlaceholder: "Confirm password",
  passwordBody: "Password must contain at least 7 letters and 1 number",
  trueButton: "Login Now",
  falseButton: "Change Password",
};

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const ForgotPassowrdConstants = {
  trueButton: "Continue",
  falseButton: "Reset Password",
};

export const ForgotPasswordStories = {
  ForgotPasswordBoxBodyMessage:
    "No worries, we'll send you link to your email id to reset your password",
  ForgotPasswordBoxHeding: "Forgot Password",
  ForgotPasswordBoxPlaceHolder: "Enter your email id",
  ResetPasswordBoxBodyMessage:
    "Please enter reset code sent to your email to proceed further",
  ResetPasswordBoxHeading: "Enter Reset Code",
  ResetSuccessfulBoxHeading: "Forgot Password",
  ResetSuccessfulBoxEmail: "johndoe@gmail.com",
  ResetSuccessfulPlaceholder: "Enter reset code",
};

export const EMAIL_REGEX_PATTERN = /^\S+@\S+\.\S+$/;
export const RESET_CODE_REGEX_PATTERN = /^\d{6}$/;

export const CashAccelerationBoxConstants = {
  heading: "Cash acceleration",
  sideButton: "Sync Now",
};

export const cashAccelerationColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Name"
        sx={{ color: theme.palette.textColor.highemp }}
      />
    ),
    renderCell: (params) => (
      <SeederTypography
        variant="body2"
        text={params.value}
        sx={{ color: theme.palette.textColor.highemp }}
      />
    ),
  },
  {
    field: "type",
    headerName: "Type",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Type"
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
    renderCell: (params) => (
      <SeederTypography
        variant="body2"
        text={params.value}
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
  },
  {
    field: "perPayment",
    headerName: "Per Payment",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Per Payment"
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
    renderCell: (params) => (
      <SeederTypography
        variant="body2"
        text={`$${replaceNumberWithCommas(params.value)}`}
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
  },
  {
    field: "termLength",
    headerName: "Term Length",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Term Length"
        sx={{ color: theme.palette.textColor.lowemp, padding: "20px 12px" }}
      />
    ),
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "12px 20px",
          gap: "8px",
        }}
      >
        <SeederTypography
          variant="body2"
          text={`${params.value} months`}
          sx={{
            color: theme.palette.textColor.lowemp,
          }}
        />
        <SeederTypography
          variant="caption"
          text={`${params.value}% Fee`}
          sx={{
            color: theme.palette.textColor.lowemp,
          }}
        />
      </div>
    ),
  },
  {
    field: "paymentAmount",
    headerName: "Payment Amount",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Payment Amount"
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
    renderCell: (params) => {
      const partial = parseFloat(params?.value?.[1]);

      if (partial && partial !== parseFloat(params.value[0])) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <SeederTypography
              variant="body2"
              text={`$${replaceNumberWithCommas(params.value[0] - partial)}`}
              sx={{ color: theme.palette.textColor.lowemp }}
            />
            <SeederTypography
              variant="body2"
              text={`$${replaceNumberWithCommas(params?.value?.[0])}`}
              sx={{
                color: theme.palette.textColor.lowemp,
                textDecoration: "line-through",
              }}
            />
          </div>
        );
      } else {
        return (
          <SeederTypography
            variant="body2"
            text={`$${replaceNumberWithCommas(params?.value[0])}`}
            sx={{
              color: theme.palette.textColor.lowemp,
            }}
          />
        );
      }
    },
  },
];

export const cashKickColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Name"
        sx={{ color: theme.palette.textColor.highemp }}
      />
    ),
    renderCell: (params) => (
      <SeederTypography
        variant="body2"
        text={params.value}
        sx={{ color: theme.palette.textColor.highemp }}
      />
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Status"
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
    renderCell: (params) => (
      <div style={{ padding: "12px 20px", paddingLeft: 0 }}>
        <SeederChip
          variant="filled"
          sx={{
            display: "flex",
            padding: "4px 8px",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
            background: `${theme.palette.background.elevation2}`,
          }}
          label={
            <SeederTypography
              variant="body2"
              text={params.value}
              sx={{
                color: theme.palette.textColor.medemp,
              }}
            />
          }
        />
      </div>
    ),
  },
  {
    field: "maturity",
    headerName: "Maturity",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Maturity"
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
    renderCell: (params) => (
      <SeederTypography
        variant="body2"
        text={formatDate(params.value)}
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
  },
  {
    field: "totalReceived",
    headerName: "Total Received",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Total Received"
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "12px 20px",
          paddingLeft: 0,
          gap: "8px",
        }}
      >
        <SeederTypography
          variant="body2"
          text={`$${replaceNumberWithCommas(params.value)}`}
          sx={{
            color: theme.palette.textColor.lowemp,
          }}
        />
        <SeederTypography
          variant="caption"
          text={"12% fee"}
          sx={{
            color: theme.palette.textColor.lowemp,
          }}
        />
      </div>
    ),
  },
  {
    field: "totalFinanced",
    headerName: "Total Financed",
    width: 275,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant="body2"
        text="Total Financed"
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
    renderCell: (params) => (
      <SeederTypography
        variant="body2"
        text={`$${replaceNumberWithCommas(params.value)}`}
        sx={{ color: theme.palette.textColor.lowemp }}
      />
    ),
  },
];

export const PAYMENTS_ICONLABEL = "Your payments";
export const EMPTY_PAYMENTS_CONTENT = "You don't have any payments";
export const EMPTY_PAYMENTS_BUTTON = "Make a new Payment";
export const EMPTY_CONTRACTS_CONTENT = "You don't have any contracts";
export const EMPTY_CONTRACTS_BUTTON = "Add a new Contract";
export const EMPTY_CASHKICKS_CONTENT = "You don't have any cashkicks";
export const EMPTY_CASHKICKS_BUTTON = "Create a new CashKick";

export const PAYMENT_DUE_DATE_STYLES = {
  width: "80px",
  height: "80px",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: theme.palette.gray[100],
  border: `1px solid ${theme.palette.border.lowemp}`,
};

export const paymentHeaderTypoStyles = {
  padding: "12px 20px",
  color: theme.palette.textColor.lowemp,
};

export const calculateNumberofDays = (targetDate: string) => {
  const inputDate = new Date(targetDate);
  const currentDate = new Date();
  return Math.ceil(
    (inputDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};

export const mockPayments = [
  {
    id: 1,
    dueDate: new Date(),
    status: "Upcoming",
    expectedAmount: -14204.55,
    outstanding: 99431.85,
  },
  {
    id: 2,
    dueDate: new Date(),
    status: "Upcoming",
    expectedAmount: -14204.55,
    outstanding: 85227.3,
  },
];

export const paymentColumns = [
  {
    field: "dueDate",
    width: 363,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant={"body2"}
        text={"Due Date"}
        sx={paymentHeaderTypoStyles}
      />
    ),
    renderCell: (params: GridRenderCellParams) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "12px 20px",
          gap: "8px",
        }}
      >
        <SeederTypography
          variant="body2"
          text={formatDate(params.value)}
          sx={{
            color: theme.palette.textColor.lowemp,
          }}
        />
        <SeederTypography
          variant="caption"
          text={`${calculateNumberofDays(params.value)} day(s) from now`}
          sx={{
            color: theme.palette.textColor.lowemp,
          }}
        />
      </div>
    ),
  },
  {
    field: "status",
    width: 363,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant={"body2"}
        text={"Status"}
        sx={paymentHeaderTypoStyles}
      />
    ),
    renderCell: (params: GridRenderCellParams) => (
      <div style={{ padding: "12px 20px" }}>
        <SeederChip
          variant="filled"
          sx={{
            display: "flex",
            padding: "4px 8px",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
            background: `${theme.palette.background.elevation2}`,
          }}
          label={
            <SeederTypography
              variant="body2"
              text={params.value}
              sx={{
                color: theme.palette.textColor.medemp,
              }}
            />
          }
        />
      </div>
    ),
  },
  {
    field: "expectedAmount",
    width: 363,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant={"body2"}
        text={"Expected amount"}
        sx={paymentHeaderTypoStyles}
      />
    ),
    renderCell: (params: GridRenderCellParams) => (
      <SeederTypography
        variant={"body2"}
        text={`$${replaceNumberWithCommas(params.value)}`}
        sx={paymentHeaderTypoStyles}
      />
    ),
  },
  {
    field: "outstandingAmount",
    width: 363,
    sortable: false,
    renderHeader: () => (
      <SeederTypography
        variant={"body2"}
        text={"Outstanding"}
        sx={paymentHeaderTypoStyles}
      />
    ),
    renderCell: (params: GridRenderCellParams) => (
      <SeederTypography
        variant={"body2"}
        text={`$${replaceNumberWithCommas(params.value)}`}
        sx={paymentHeaderTypoStyles}
      />
    ),
  },
];

export const BASE_URL = "https://api-gateway-107202934169.us-central1.run.app/";
export const BE_BASE_URL =
  "https://api-gateway-107202934169.us-central1.run.app/";

export interface paymentProps {
  dueDate: Date;
  status: string;
  expectedAmount: number;
  outstandingAmount: number;
  userId: number;
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const defaultCashKick = {
  id: 1,
  name: "",
  status: "",
  maturity: "",
  totalFinanced: 0,
  totalReceived: ["1", 1],
  contracts: [],
};

export const mockCashAcclerationData = () => [
  {
    id: 1,
    name: "Contract 1",
    status: "Available",
    type: "Monthly",
    perPayment: 12000.25,
    totalFinanced: "-",
    totalAvailable: 126722.64,
    termLength: ["12 months", "12% Fee"],
    paymentAmount: [126722.64],
  },
  {
    id: 2,
    name: "Contract 2",
    status: "Available",
    type: "Monthly",
    perPayment: 6000,
    totalFinanced: "-",
    totalAvailable: 63360,
    termLength: ["12 months", "12% Fee"],
    paymentAmount: [63360],
  },
  {
    id: 3,
    name: "Contract 3",
    status: "Available",
    type: "Monthly",
    perPayment: 6000,
    totalFinanced: "-",
    totalAvailable: 63360,
    termLength: ["12 months", "12% Fee"],
    paymentAmount: [63360],
  },
  {
    id: 4,
    name: "Contract 4",
    status: "Available",
    type: "Monthly",
    perPayment: 6000,
    totalFinanced: "-",
    totalAvailable: 63360,
    termLength: ["12 months", "12% Fee"],
    paymentAmount: [63360],
  },
];

export interface newMockCashKickProps {
  cashKickId?: number;
  name: string;
  status: string;
  maturity: string;
  totalReceived: number;
  totalFinanced: number;
  rate: number;
  createdDate: string;
  updatedDate: string;
  userId: number;
}

export const mockCashKicks: newMockCashKickProps[] = [
  {
    cashKickId: 11,
    name: "First Advance",
    status: "pending",
    maturity: "2023-10-03T07:51:44.000+00:00",
    totalReceived: 64641.67,
    totalFinanced: 72398.6704,
    rate: 12,
    createdDate: "2023-10-02T18:30:00.000+00:00",
    updatedDate: "2023-10-02T18:30:00.000+00:00",
    userId: 11,
  },
  {
    cashKickId: 12,
    name: "New CashKicks",
    status: "pending",
    maturity: "2023-10-03T08:20:02.000+00:00",
    totalReceived: 63366,
    totalFinanced: 70969.92,
    rate: 12,
    createdDate: "2023-10-02T18:30:00.000+00:00",
    updatedDate: "2023-10-02T18:30:00.000+00:00",
    userId: 11,
  },
];

export const mockContracts = [
  {
    contractId: 1,
    name: "Contract 1",
    status: "Available",
    type: "Monthly",
    perPayment: 6000.0,
    termLength: 12,
    paymentAmount: "63360",
  },
  {
    contractId: 2,
    name: "Contract 2",
    status: "Available",
    type: "Monthly",
    perPayment: 6000,
    termLength: 12,
    paymentAmount: "63360",
  },
  {
    contractId: 3,
    name: "Contract 3",
    status: "Available",
    type: "Monthly",
    perPayment: 6000,
    termLength: 12,
    paymentAmount: "63360",
  },
  {
    contractId: 4,
    name: "Contract 4",
    status: "Available",
    type: "Monthly",
    perPayment: 6000,
    termLength: 12,
    paymentAmount: "63360",
  },
  {
    contractId: 5,
    name: "Contract 5",
    status: "Available",
    type: "Monthly",
    perPayment: 6000,
    termLength: 12,
    paymentAmount: "420360",
  },
  {
    contractId: 5,
    name: "Contract 5",
    status: "Available",
    type: "Monthly",
    perPayment: 6000,
    termLength: 12,
    paymentAmount: "126360",
  },
];

export const REDIRECT_URL = window.location.origin + "/home";

export interface UserProps {
  name: string | undefined;
  email: string | undefined;
  password: string;
  creditBalance: number;
}

export interface UserLoginInfo {
  email: string | undefined;
  password: string;
}

export interface UserToken {
  userId: number;
  name: string;
  email: string;
  creditBalance: number;
  token: string;
}

export interface contextValueProps {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  creditBalance: number;
  setCreditBalance: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}
