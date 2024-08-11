import React, { useEffect, useState } from 'react';
import Header from '../Layout';
import '../assets/css/main.css'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { setDoc } from 'firebase/firestore/lite';
import { doc , setDoc} from 'firebase/firestore';
import { auth, db } from '../firebaseconfig';
const UserAccount: React.FC = () => {
  const [uName, setUName] = useState('')
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[register,setRegister]=useState(false)
  // const [, setUid]=useState<string|null>('')
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUid(user.uid);
        setIsloggedIn(true);
      } else {
        // setUid(null);
        setIsloggedIn(false);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);

      // Create a document in the Firestore 'users' collection with the user's UID
      const userdb=await setDoc(doc(db, 'users', user.uid), {
        username: uName,
        email: user.email,
      });
      console.log(userdb);
      
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);

      // // Create a document in the Firestore 'users' collection with the user's UID
      // const userdb=await setDoc(doc(db, 'users', user.uid), {
      //   username: uName,
      //   email: user.email,
      // });
      // console.log(userdb);
      
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleLogout=async()=>{
    await signOut(auth)
  }

  return (
    <>
      <Header />
      <main>
        <section id="user-account">
          <h2>User Account</h2>
          <form>
            {register &&
              <>
                <label htmlFor="username">User Name:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                  required
                />
              </>}
            {!isLoggedIn &&
            <>
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </>
            }
            {isLoggedIn && <button type="submit" onClick={handleLogout}>Log out</button>}
            {(!isLoggedIn && !register)&& <button type="submit" onClick={handleSubmitLogin}>Log In</button>}

            {register && <>
              <button type="submit" onClick={handleSubmit}>Register</button>
              <div onClick={()=>setRegister(false)}>Already has account? Click here</div>
            </>
            }
            {(!register && !isLoggedIn ) && <div onClick={()=>setRegister(true)}>New User? Click here</div>}

            {error && <p>{error}</p>}

          </form>
        </section>
      </main>
    </>
  );
};

export default UserAccount;
