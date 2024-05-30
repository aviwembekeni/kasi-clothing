import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils.js";

const SignIn = () => {
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDefRef = createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign IN</h1>
      <button type="button" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

export default SignIn;
