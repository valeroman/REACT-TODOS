import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore, createdUserResult  } from "firebase/firestore";
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import { doesUsernameExist } from '../services/firebase';

export const Register = () => {

    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';
    
    const handleSignUp = async (event) => {
        event.preventDefault();
        const db = getFirestore(firebase);
        try {
          const auth = getAuth();
          const res = await createUserWithEmailAndPassword(auth, emailAddress, password);
          const user = res.user;

          user.displayName = username;

          await addDoc(collection(db, "users"), {
            userId: user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            dateCreated: Date.now()
          });

          navigate( '/home', {
            replace: true
          });

        } catch (err) {
          console.error(err);
          setError('That username is already taken, please try another.');
        }
    }
  return (
      <div className="container flex mx-auto justify-center max-w-screen-md items-center h-screen" >
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                      <p className="font-bold text-blue-medium mb-5 text-xl">Registro</p>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignUp} method="POST">
                        <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username || ''}
                        />

                        <input
                            aria-label="Enter your full name"
                            type="text"
                            placeholder="Full Name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName || ''}
                        />

                        <input
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />

                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />

                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                            ${isInvalid && 'opacity-50'}`}
                        >Sign Up</button>
                    </form>
                </div> 
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm">Have an account?{` `} 
                        <Link to='/login' className="font-bold text-blue-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
      </div>
  )
}
