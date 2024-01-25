// authentication.js
import { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCBE0R_uNRCr4swEna4M0Bgw_PLGNHA0Cg",
  authDomain: "budgetbuddy-9abb0.firebaseapp.com",
  projectId: "budgetbuddy-9abb0",
  storageBucket: "budgetbuddy-9abb0.appspot.com",
  messagingSenderId: "41880223738",
  appId: "1:41880223738:web:30d3ced46a0bec18dfee43",
  measurementId: "G-Z2JQJ4XL61"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const AuthContext = createContext();

const useAuthentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return {
    user,
    signInWithGoogle,
  };
};

const AuthenticationProvider = ({ children }) => {
  const value = useAuthentication();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthenticationProvider, useAuth };
