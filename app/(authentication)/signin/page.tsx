
import AuthForm from '../auth-components/AuthForm'

const SignInPage = () => {
  return (
    <AuthForm
        title="Sign Into your Account"
        subtitle="Sign in using email and password or gmail"
        actionText="Sign In"
        redirectText="Sign Up"
        redirectLink="/signup"
        isSignIn={true}
        />
  )
}

export default SignInPage