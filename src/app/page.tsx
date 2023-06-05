'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';
import { useFirebaseContext } from '@/context/firebase.context';
import { SET_USER } from '@/context/firebase.context';

export default function Home() {

  const { state, dispatch } = useFirebaseContext()
  console.log(state)

  const signOut = () => {
    dispatch({type: SET_USER, value: null})
    alert("ログアウトしました。")
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          
        </p>
        <div>
          {!state.user && (
            <>
            <Link href="/signup">Signup</Link>
            <Link href="/signin">Signin</Link>
            </>
          )}
          {state.user && (
            <button type="submit" className="btn btn-primary" onClick={signOut}>サインアウト</button>
          )}
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
