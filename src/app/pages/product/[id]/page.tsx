import React from 'react';
import ProductPage from "@/app/components/ProductPage";
import {toast, ToastContainer} from "react-toastify";

interface Props {
    params: {
        id: string,
    },
}

const ProductProfile = async ({ params }: Props) => {
    const response = await fetch('https://dummyjson.com/products/' + params.id);
    const result = await response.json();

    if (!result) {
        toast.error('Oops, something went wrong!', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    return (
        <div className='flex grid-cols-2 m-20 align-center justify-center h-screen'>
            {result ? (
                <ProductPage product={result} />
            ) : (
                <div className='flex grid-cols-2 m-20 align-center justify-center gap-10'>
                    <div className='w-[620px] h-[481px]'>
                        <div className="mx-2 mt-2 rounded-[6.46px] bg-gray-300 w-[520px] h-[381px] animate-pulse"/>
                    </div>
                    <div className='space-y-3 w-[350px]'>
                        <div className="flex justify-between mt-10 mb-10 gap-10">
                            <p className="w-8/12 bg-gray-300 h-8 rounded-full animate-pulse"/>
                            <p className="w-6/12 bg-gray-300 h-8 rounded-full animate-pulse"/>
                        </div>
                        <div className='space-y-5 w-[350px]'>
                            <p className="w-10/12 bg-gray-300 h-4 rounded-full animate-pulse"/>
                            <p className="w-10/12 bg-gray-300 h-4 rounded-full animate-pulse"/>
                            <p className="w-10/12 bg-gray-300 h-4 rounded-full animate-pulse"/>
                            <p className="w-10/12 bg-gray-300 h-4 rounded-full animate-pulse"/>
                            <p className="w-10/12 bg-gray-300 h-4 rounded-full animate-pulse"/>
                        </div>
                        <div className="flex justify-between mt-10">
                            <button className="btn rounded-full bg-gray-300 py-0 my-2 w-[240px] animate-pulse"/>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default ProductProfile;