import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContent from '../context/firebase';
import { getAuth, signInWithEmailAndPassword, signOut,} from "firebase/auth";
import { Link } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();

    const { firebase } = useContext(FirebaseContent)

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, emailAddress, password);
           
            navigate( '/home', {
                replace: true
            });

        } catch (error) {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }

    };

    useEffect(() => {
        document.title = 'Login - Todo'
    }, []);

    return (
        <div className="container flex mx-auto justify-center max-w-screen-md items-center h-screen" >
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full items-center">
                        <p className="font-bold text-blue-medium mb-5 text-xl">Login</p>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleLogin} method="POST">
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
                        >Sign In</button>
                    </form>
                </div> 
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm">Don't have an account?{` `} 
                        <Link to='/register' className="font-bold text-blue-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
