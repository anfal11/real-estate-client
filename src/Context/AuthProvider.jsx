import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxios from "../Hooks/useAxios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxios();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, passowrd) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, passowrd)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //forget password
  const resetPassword = (email, passowrd) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email, passowrd)
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = {email: currentUser.email}
        axiosPublic.post('/jwt', userInfo)
        .then(res => {
          if (res.data.token){
            localStorage.setItem('access token', res.data.token);
          }
        })
      }
      else {
        localStorage.removeItem('access token');
      
      }
      setLoading(false);
    })
    return  () => {
        unsubscribe();
    }
  }, [axiosPublic]);

    const userUpdateProfile = (name, photo) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    }

    const authInfo = {
        user,
        createUser,
        logOut,
        signIn,
        signInWithGoogle,
        loading,
        userUpdateProfile,
        resetPassword,
      };
      
    return (
        <AuthContext.Provider value={authInfo}>
    {children}
    </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
export default AuthProvider;