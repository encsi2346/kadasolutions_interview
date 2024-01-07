'use client';
import React, {useEffect, useState} from 'react';
import AddButton from "@/app/components/AddButton";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { logIn, addCartItem } from '@/app/redux/authSlice';
import { useDispatch } from 'react-redux';
import {AppDispatch, useAppSelector} from "@/app/redux/store";
import { addDoc, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "./../firebase";
import { collection } from 'firebase/firestore';
import {Product} from "../../../common.types";
import Modal from "@/app/components/Modal";
import LoginForm from "@/app/components/LoginForm";
import ImageViewer from "@/app/components/ImageViewer";

type Props = {
    product: Product,
}

const ProductPage = ({ product }: Props) => {
    const userId = auth?.currentUser?.uid;

    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

    const [pageType, setPageType] = useState("login");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

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
            addCartDatabase(itemData);
        } else {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const addCartDatabase = (itemData) => {
        console.log(itemData);
        if (itemData.id === ''){
            return;
        }

        const userCartItemsRef = collection(db, `${userId}`);
        const id = itemData.id;
        const savedItem = {
            id: itemData.id,
            title: itemData.title,
            price: itemData.price,
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
                    <ImageViewer images={product.images} />
                </div>
                <div className='space-y-3'>
                    <div className="flex justify-between">
                        <p className="text-[48px] font-[600] leading-[64.8px]">{product.title}</p>
                        <p className="text-[24px] font-[600] leading-[32.4px] pl-20 mr-0 pr-0">{product.rating} $</p>
                    </div>
                    <p className="text-[24px] font-[500] leading-[32.4px] w-[400px]">{product.description}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Stock: {product.stock}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Brand: {product.brand}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Category: {product.category}</p>
                    <p>
                        <a className="rounded-full bg-[#6100FF] text-white font-[600] text-[20px] leading-[27px] py-1 px-4">
                            {product.discountPercentage}%
                        </a>
                    </p>
                    <div className="flex justify-between align-center">
                        <p className="text-[64px] font-[600] leading-[86.4px]">{product.price} $</p>
                        <AddButton text={'Add to cart'} onClick={() => handleAddToCart(product)}/>
                    </div>
                </div>
            </div>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <LoginForm onClose={() => setShowModal(false)}/>
            </Modal>
        </div>
    );
};

export default ProductPage;