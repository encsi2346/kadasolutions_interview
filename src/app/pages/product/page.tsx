'use client';
import React, {useEffect, useState} from 'react';
import AddButton from "@/app/components/AddButton";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { logIn, addCartItem } from '@/app/redux/authSlice';
import { useDispatch } from 'react-redux';
import {AppDispatch, useAppSelector} from "@/app/redux/store";
import { addDoc, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { collection } from 'firebase/firestore';

interface Props {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

const ProductPage = ({ id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images }: Props) => {
    const userId = auth?.currentUser?.uid;

    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
    const cartItems = useAppSelector((state) => state.authReducer.value.cartItems);

    const [pageType, setPageType] = useState("login");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const coreProduct = {
        "id": 2,
        "title": "iPhone 2",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "...",
        "images": ["...", "...", "..."]
    }

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

    const handleAddToCart = (itemData) => {
        if (isAuth) {
            addCartDatabase({id: 3, title: 'Iphone'}); //TODO
        } else {
            if (document) {
                (document.getElementById('login_modal') as HTMLFormElement).showModal();
            }
        }
    };

    const handleCloseModal = () => {
        if (document) {
            (document.getElementById('login_modal') as HTMLFormElement).close();
        }
    }

    const addCartDatabase = (itemData) => {
        if (itemData.id === ''){
            return;
        }

        const userCartItemsRef = collection(db, `${userId}`);
        const id = itemData.id;
        const savedItem = {
            id: itemData.id,
            title: itemData.title
        }
        getDocs(userCartItemsRef)
            .then(response => {
                const tempArray = response.docs.map(doc => (
                    { id: doc.id, data: doc.data() }
                ))

                const foundItem = tempArray.find(element => element.data.savedItem.id === id);
                (foundItem === undefined ? (
                    addDoc(userCartItemsRef, {savedItem})
                        .then(response => {
                            console.log('You added: ', response.id);
                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                ) : (<div/>))
            })
            .catch(error => {
                console.log('You already saved it:', id);
            })
    }

    useEffect(() => {
        const userCartItemsRef = collection(db, `${userId}`);
        const unsubscribe = onSnapshot(userCartItemsRef, snapshot => {
            addCartItem(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div>
            <div className='flex grid-cols-2 m-20 align-center justify-center'>
                <div className='w-[620px] h-[481px]'>
                    Carousel
                </div>
                <div className='space-y-3'>
                    <div className="flex justify-between">
                        <p className="text-[48px] font-[600] leading-[64.8px]">{coreProduct.title}</p>
                        <p className="text-[24px] font-[600] leading-[32.4px] pl-20 mr-0 pr-0">{coreProduct.rating} $</p>
                    </div>
                    <p className="text-[24px] font-[500] leading-[32.4px] w-[400px]">{coreProduct.description}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Stock: {coreProduct.stock}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Brand: {coreProduct.brand}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Category: {coreProduct.category}</p>
                    <p>
                        <a className="rounded-full bg-[#6100FF] text-white font-[600] text-[20px] leading-[27px] py-1 px-4">
                            {coreProduct.discountPercentage}%
                        </a>
                    </p>
                    <div className="flex justify-between align-center">
                        <p className="text-[64px] font-[600] leading-[86.4px]">{coreProduct.price} $</p>
                        <AddButton text={'Add to cart'} onClick={handleAddToCart}/>
                    </div>
                </div>
            </div>

            <dialog id="login_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{isLogin ? "Login" : "Register"}</h3>
                    <p className="pt-6 px-3">Sorry, you cannot make any purchases unless you are signed in.</p>
                    <form className="card-body" method="dialog" onSubmit={handleFormSubmit}>
                        <div className="form-control">
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
                        <div className="modal-action mt-6 flex">
                            <button className="btn w-[200px]" onClick={handleCloseModal}>
                                Close
                            </button>
                            <button className="btn btn-primary w-[200px]" type="submit">
                                {isLogin ? "LOGIN" : "REGISTER"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ProductPage;