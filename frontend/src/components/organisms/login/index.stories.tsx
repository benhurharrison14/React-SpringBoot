import type { StoryObj, Meta } from "@storybook/react";
import Login from ".";

const meta = {
  title: "Organisms/Login",
  component: Login,
  argTypes: {
    handleForgotPassword: { action: "clicked on Forgot password" },
    handleSignUp: { action: "clicked on Sign Up Button" },
    handleGoogleLogin: { action: "clicked on Google Login" },
    handleContinueSignUp: { action: "clicked on Sign Up Button" },
    handleSignIn: { action: "clicked on Sign In Button" },
  },
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {},
};

export const SignUp: Story = {
  args: {
    signup: true,
  },
};
