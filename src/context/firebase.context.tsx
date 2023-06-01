"use client";
import React, { Dispatch, createContext, useReducer } from "react";
import { Firebase, initializeFirebaseApp } from '../lib/firebase/firebase'
import { getAuth } from "firebase/auth";

type StateType = {
  firebase: any;
  firebaseAuth: any;
};

type ActionType = {
  type: string;
};

const initialState: StateType = {
  firebase: null,
  firebaseAuth: null
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INIT_NEXT_PUBLIC_FIREBASE_APP":
        return { ...state, firebase: initializeFirebaseApp() };
    case "INIT_NEXT_PUBLIC_FIREBASE_AUTH":
        if(state.firebase){
            console.log(state.firebase)
            //return { ...state, firebaseAuth: getAuth(state.firebase) };
        }
        return { ...state, firebaseAuth: null } 
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

  return (
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  );
};
