"use client";
import React, {useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/app/firebase";
import {logIn} from "@/app/redux/authSlice";
import {useDispatch} from "react-redux";
import {AppDispatch, useAppSelector} from "@/app/redux/store";

const LoginPage = ({onClose}) => {
    const userId = auth?.currentUser?.uid;

    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

    const [pageType, setPageType] = useState("login");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            try{
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        dispatch(logIn(email));
                        handleCloseModal();
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log('didnt find email');
                    });
            } catch (error) {
                console.log(error);
            }
        } else if (isRegister) {
            try{
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        console.log('successfully registered');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCloseModal = () => {
        /*if (document) {
            (document.getElementById('login_modal') as HTMLFormElement).close();
        }*/
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
                <div className="mt-6 flex gap-10 justify-center">
                    <button className="btn w-[200px]" onClick={handleCloseModal}>
                        Close
                    </button>
                    <button className="btn btn-primary w-[200px]" type="submit">
                        {isLogin ? "LOGIN" : "REGISTER"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;