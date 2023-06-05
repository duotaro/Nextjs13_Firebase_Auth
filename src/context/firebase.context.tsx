"use client";

import React, { Dispatch, createContext, useReducer, useContext, useEffect } from "react";
import { initializeFirebaseApp } from '../lib/firebase/firebase'
import { getAuth, User, onAuthStateChanged } from "firebase/auth";

type StateType = {
  firebase: any;
  firebaseAuth: any;
  user: User | null;
};

type ActionType = {
  type: string;
  value: any;
};

const initialState: StateType = {
  firebase: null,
  firebaseAuth: null,
  user: null
};

export const INIT_FIREBASE_APP =  'INIT_FIREBASE_APP';
export const INIT_FIREBASE_AUTH = 'INIT_FIREBASE_AUTH';
export const SET_FIREBASE_APP = 'SET_FIREBASE_APP'
export const SET_USER =  'SET_USER';
export const SET_FIREBASE_AUTH = 'SET_FIREBASE_AUTH';

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case INIT_FIREBASE_APP:
        return { ...state, firebase: initializeFirebaseApp() };
    case INIT_FIREBASE_AUTH:
        return { ...state, firebaseAuth: null } 
    case SET_FIREBASE_APP:
        return { ...state, firebase: action.value } 
    case SET_FIREBASE_AUTH:
        return { ...state, firebaseAuth: action.value } 
    case SET_USER:
        return { ...state, user: action.value } 
    default:
        return state;
  }
};

export const FirebaseContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const FirebaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      console.log("▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲")
      console.log(state)
      console.log(state.firebase)
      console.log("▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲")
      if(state.firebase){
        const auth = getAuth(state.firebase)
        return onAuthStateChanged(auth, (user) => {
          dispatch({type: SET_USER, value: user})
        })
      }
    } catch (error) {
      dispatch({type: SET_USER, value: null})
      throw error
    }
  }, [])

  return (
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext)