'use client';
import React, {useEffect, useState} from 'react';
import {AppDispatch, useAppSelector} from '@/app/redux/store';
import {useDispatch} from "react-redux";
import {logOut} from "@/app/redux/authSlice";
import {signOut} from "@firebase/auth";
import {auth} from "@/app/firebase";
import { db } from "@/app/firebase";
import { collection } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import Link from "next/link";
import Modal from "@/app/components/Modal";
import LoginForm from "@/app/components/LoginForm";
import {toast, ToastContainer} from "react-toastify";

const Navbar = () => {
    const userId = auth?.currentUser?.uid;
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
    const email = useAppSelector((state) => state.authReducer.value.email);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleLogOut = () => {
        try{
            signOut(auth).then(() => {
                dispatch(logOut());
                toast.success('You have successfully logged out!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }).catch((error) => {
                toast.error('Oops, something went wrong!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            });
        } catch(error) {
            toast.error('Oops, something went wrong!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    useEffect(() => {
        const userFavouriteRef = collection(db, `${userId}`);
        const unsubscribe = onSnapshot(userFavouriteRef, snapshot => {
            setCartItems(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })
        return () => {
            unsubscribe();
        }
    }, [userId, cartItems])

    useEffect(() => {
        console.log('price', cartItems[0]);
    }, [setCartItems])

    return (
        <header>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" href='/'>kadasolutions's ecommershop</Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{cartItems.length} Items</span>
                                <span className="text-info">Subtotal: {subtotal}</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <a>{isAuth ? email : (
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                </svg>
                            )}</a>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                {isAuth ? (
                                    <a onClick={handleLogOut}>Logout</a>
                                ) : (
                                    <a onClick={() => setShowModal(true)}>
                                        Login
                                    </a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <LoginForm onClose={() => setShowModal(false)}/>
            </Modal>
            <ToastContainer />
        </header>
    );
};

export default Navbar;