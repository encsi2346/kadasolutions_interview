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
import { GrCart } from "react-icons/gr";
import { IoLogInOutline } from "react-icons/io5";
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
        const sum = cartItems.reduce((total, product) => total + product.price, 0);
        setSubtotal(sum);
    }, [subtotal, setCartItems])

    return (
        <header>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" href='/'>
                        dummyJSONs ecommershop
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <GrCart />
                                <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{cartItems.length} Items</span>
                                <span className="text-info">Subtotal: {subtotal} $</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <a>{isAuth ? email : (<IoLogInOutline size={25} />)}</a>
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