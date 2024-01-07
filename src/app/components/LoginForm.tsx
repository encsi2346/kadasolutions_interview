"use client";
import React, {useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/app/firebase";
import {logIn} from "@/app/redux/authSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/redux/store";
import {toast, ToastContainer} from "react-toastify";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const LoginPage = ({onClose}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [pageType, setPageType] = useState("login");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user] = useAuthState(auth);

    const googleAuth = new GoogleAuthProvider();
    const googleLogin = async () => {
        const result = await signInWithPopup(auth, googleAuth);
        console.log(result);
        dispatch(logIn(user.email));
        handleCloseModal();

        toast.success('You have successfully logged in!', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            try{
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        dispatch(logIn(email));
                        handleCloseModal();
                        toast.success('You have successfully logged in!', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    })
                    .catch((error) => {
                        toast.error('Wrong password or email address!', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    });
            } catch (error) {
                toast.error('Oops, something went wrong!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } else if (isRegister) {
            try{
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        toast.success('You have successfully registered!', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    })
                    .catch((error) => {
                        toast.error('The registration failed!', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    });
            } catch (error) {
                toast.error('Oops, something went wrong!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    };

    const handleCloseModal = () => {
        onClose();
    }

    return (
        <div>
            <h3 className="font-bold text-lg">{isLogin ? "Login" : "Register"}</h3>
            <p className="pt-6 px-3">Sorry, you cannot make any purchases unless you are signed in.</p>
            <form onSubmit={handleFormSubmit}>
                <div className="form-control py-5">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        className="input input-bordered"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover" onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                        }}>
                            {isLogin ?
                                "Don't have an account? Sign Up here." :
                                "Already have an account? Login here."
                            }
                        </a>
                    </label>
                </div>
                <div className="mt-6 flex gap-5 justify-center">
                    <button className="btn w-[120px]" onClick={handleCloseModal}>
                        Close
                    </button>
                    <button className="btn btn-primary w-[150px]" onClick={googleLogin}>
                        Sign in with Google
                    </button>
                    <button className="btn btn-primary w-[150px]" type="submit">
                        {isLogin ? "LOGIN" : "REGISTER"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;