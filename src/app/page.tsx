'use client';
import ProductCard from "@/app/components/ProductCard";
import React, {useEffect, useState} from 'react';
import {Product} from "../../common.types";
import {toast, ToastContainer} from "react-toastify";

const AllProductPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);

    const fetchMoreData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`https://dummyjson.com/products?page=${page + 1}`);
            if (!response.ok) {
                throw new Error('Network error or invalid response');
            }
            const newData = await response.json();

            setProducts((prevProducts) => [...prevProducts, ...newData.products]);
            setPage(page + 1);
        } catch (error) {
            console.error('Error fetching more data:', error.message);
            toast.error('Oops, something went wrong!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.innerHeight + window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const offset = 200;

            if (scrollTop + offset >= scrollHeight && !isLoading) {
                fetchMoreData();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    useEffect(() => {
        fetchMoreData();
    }, []);

  return (
    <main className='grid justify-center'>
        <p className='text-[48px] font-[600] leading-[64.8px] text-[#323232] text-center mt-10'>See Products</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 p-1 m-10 w-[1300px]">
            {isLoading ? (
                Array(4).fill(0).map((el, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="card card-compact w-[305px] bg-white border border-solid border-[#DBDBDB] rounded-[6.46px] m-5">
                        <div className="mx-2 mt-2 rounded-[6.46px] bg-gray-300 w-[282.21px] h-[149.18px] animate-pulse"/>
                        <div className="card-body m-5">
                            <div className="flex justify-between">
                                <p className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"/>
                            </div>
                            <p className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"/>
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn rounded-full bg-gray-300 py-0 my-2 w-[281.86px] animate-pulse"/>
                        </div>
                    </div>
                ))
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
                ))
            )}
        </div>
        <ToastContainer />
    </main>
  )
}

export default AllProductPage;