import { 
    getAuth, 
    setPersistence, 
    browserLocalPersistence, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInAnonymously, 
    signOut 
} from "firebase/auth";
import app from './firebaseConfig';

const auth = getAuth(app);

// Google Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Set Persistence Wrapper
const withPersistence = async (fn) => {
    await setPersistence(auth, browserLocalPersistence);
    return fn();
};

// Email & Password Sign Up
export const signUpWithEmail = (email, password) => withPersistence(() => createUserWithEmailAndPassword(auth, email, password));

// Email & Password Sign In
export const signInWithEmail = (email, password) => withPersistence(() => signInWithEmailAndPassword(auth, email, password));

// Google Sign In
export const signInWithGoogle = () => withPersistence(() => signInWithPopup(auth, provider));

// Anonymous Sign In
export const signInAnonymouslyUser = () => withPersistence(() => signInAnonymously(auth));

// Sign Out
export const logOut = () => signOut(auth);
