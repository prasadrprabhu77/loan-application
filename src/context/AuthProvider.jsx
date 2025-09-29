import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";  

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const userRef = doc(db, "users", u.uid);
          const snap = await getDoc(userRef);
          setProfile(snap.exists() ? snap.data() : null);
        } catch (err) {
          console.error("AuthProvider: error fetching user doc", err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

   
  const signin = async ({ email, password, name }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

     
    const userDoc = {
      uid,
      email,
      name: name || "",
      createdAt: new Date().toISOString(),
    };

     
    await setDoc(doc(db, "users", uid), userDoc);

    setProfile(userDoc);

    return cred;
  };

   
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

   
  const logout = () => signOut(auth);

  const value = { user, profile, signin, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="p-6">Loading authentication...</div> : children}
    </AuthContext.Provider>
  );
}
