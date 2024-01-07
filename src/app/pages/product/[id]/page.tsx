import React from 'react';
import ProductPage from "@/app/components/ProductPage";
import {toast, ToastContainer} from "react-toastify";

type Props = {
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
        <div>
            <ProductPage product={result} />
            <ToastContainer />
        </div>
    );
};

export default ProductProfile;