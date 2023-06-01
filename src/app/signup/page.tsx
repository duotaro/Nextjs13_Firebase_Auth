'use client';
import styles from '../page.module.css'
import { useState, useContext } from 'react';
import {FormValidError, emailValidation, passwordValidation, passwordConfirmValidation} from '../../utils/form_validation'
//import { signupWithEmailAndPassword, AuthItem } from '@/lib/NEXT_PUBLIC_FIREBASE_auth';
import { User, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Link from 'next/link';
//import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { FirebaseContext } from '@/context/firebase.context';
import { getApps,  initializeApp, getApp} from "firebase/app"


export default function Signup() {
  // Your web app's Firebase configuration
  const firebaseConfig:Object = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUYH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGEING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };
  console.log(process.env)
  console.log(firebaseConfig)

  const initializeFirebaseApp = () => {
    return !getApps().length ? initializeApp(firebaseConfig) : getApp()
  }


  const defaulyFormError:FormValidError = {
    isValid: true,
    message: ''
  } 
  const [email, setEmail] = useState('');
  const [validEmail, setvalidEmail] = useState(defaulyFormError);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(defaulyFormError);

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(defaulyFormError);

  const [user, setUser] = useState<User>();
 

  const handleChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setvalidEmail(emailValidation(e.target.value));
  }
  const handleChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setValidPassword(passwordValidation(e.target.value));
  }
  const handleChangePasswordConfirm = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value)
    setValidPasswordConfirm(passwordConfirmValidation(password, e.target.value));
  }

  /**
   * 新規登録
   */
  const submit = async (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()

      const firebase = initializeFirebaseApp();
      const auth = getAuth(firebase);

      await createUserWithEmailAndPassword(auth, email, password).then((res) => {
        console.log("createUserWithEmailAndPassword")
        console.log(res)
        if(res.user){
          setUser(res.user);
          alert("登録完了")
        } else {
          console.log("エラーーーーーーー")
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  // useEffect(() => {
  //   firebase = initializeFirebaseApp()
  //   console.log("■■■■■■")
  //   console.log(firebase)
  //   const auth = getAuth(firebase)
  // }, []);

  return (
    <main className={`${styles.main} row`}>
      <div className="col">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">メールアドレス</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" defaultValue={email} onChange={handleChangeEmail}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          {!validEmail.isValid && (
            <div id="emailFeedback" className="invalid-feedback">{validEmail.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">パスワード</label>
          <input type="password" className="form-control" id="password" defaultValue={password} onChange={handleChangePassword} />
          {!validPassword.isValid && (
            <div id="passwordFeedback" className="invalid-feedback">{validPassword.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirm" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordConfirm" defaultValue={passwordConfirm} onChange={handleChangePasswordConfirm} />
          {!validPasswordConfirm.isValid && (
            <div id="passwordConfirmFeedback" className="invalid-feedback">{validPasswordConfirm.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
      </form>
      <Link href="/">トップに戻る</Link>
      </div>
    </main>
  )
}