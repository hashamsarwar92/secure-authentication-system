
import AuthForm from "../auth-components/AuthForm";

const SignUpPage = () => {
  return (
    <AuthForm
      title="Sign Up New Account"
      subtitle="Create new account using email and password or Gmail"
      actionText="Sign Up"
      redirectText="Sign In"
      redirectLink="/signin"
      isSignIn={false}
    />
  );
};

export default SignUpPage;
