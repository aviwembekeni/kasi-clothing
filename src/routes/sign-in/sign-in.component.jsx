import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils.js";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDefRef = createUserDocumentFromAuth(user);
    console.log(userDefRef);
  };

  return (
    <div>
      <h1>Sign IN</h1>
      <button type="button" onClick={logGoogleUser}>
        Sign In With Google
      </button>

      <SignUpForm />
    </div>
  );
};

export default SignIn;
