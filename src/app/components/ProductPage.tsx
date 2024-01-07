'use client';
import React, {useEffect, useState} from 'react';
import AddButton from "@/app/components/AddButton";
import { addCartItem } from '@/app/redux/authSlice';
import { useAppSelector} from "@/app/redux/store";
import { addDoc, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "./../firebase";
import { collection } from 'firebase/firestore';
import {Product} from "../../../common.types";
import Modal from "@/app/components/Modal";
import LoginForm from "@/app/components/LoginForm";
import ImageViewer from "@/app/components/ImageViewer";
import {toast, ToastContainer} from "react-toastify";
import RatingComponent from "@/app/components/RatingComponent";

interface Props {
    product: Product,
}

const ProductPage = ({ product }: Props) => {
    const userId = auth?.currentUser?.uid;
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
    const [showModal, setShowModal] = useState(false);

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
                            toast.success('You have successfully added a product to your shopping cart!', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            });
                        })
                        .catch(error => {
                            toast.error('Oops, something went wrong!', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            });
                        })
                ) : (<div/>))
            })
            .catch(error => {
                toast.error('You have already added the product to your cart!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
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
                        <div className="flex items-center space-x-1 ml-10">
                            <RatingComponent rating={product.rating} />
                            <p className="text-[24px] font-[600] leading-[32.4px] pl-2 mr-0 pr-0">{product.rating}</p>
                        </div>
                    </div>
                    <p className="text-[24px] font-[500] leading-[32.4px] w-[400px]">{product.description}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Stock: {product.stock}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Brand: {product.brand}</p>
                    <p className="text-[24px] font-[500] leading-[32.4px] text-black/[.6]">Category: {product.category}</p>
                    <p className="py-5">
                        <a className="rounded-full bg-[#6100FF] text-white font-[600] text-[20px] leading-[27px] py-2 px-6">
                            -{product.discountPercentage}%
                        </a>
                    </p>
                    <div className="flex items-center space-x-20">
                        <p className="text-[64px] font-[600] leading-[86.4px]">{product.price} $</p>
                        <AddButton text={'Add to cart'} onClick={() => handleAddToCart(product)}/>
                    </div>
                </div>
            </div>

            <Modal isVisible={showModal} onClose={handleCloseModal}>
                <LoginForm onClose={handleCloseModal}/>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ProductPage;