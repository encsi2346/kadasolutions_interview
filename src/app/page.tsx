'use client';
import ProductCard from "@/app/components/ProductCard";
import React, {useEffect, useState} from 'react';
import {Product} from "../../common.types";
import {toast, ToastContainer} from "react-toastify";

const AllProductPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const productsData = await response.json();
                setProducts(productsData.products);
            } catch (error) {
                toast.error('Oops, something went wrong!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

  return (
    <main className='grid justify-center'>
        <p className='text-[48px] font-[600] leading-[64.8px] text-[#323232] text-center m-6'>See Products</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 p-1 m-20 w-[1300px]">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                products.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        discountPercentage={product.discountPercentage}
                        thumbnail={product.thumbnail}
                    />
                    )
                )
            )}
        </div>
        <ToastContainer />
    </main>
  )
}

export default AllProductPage;