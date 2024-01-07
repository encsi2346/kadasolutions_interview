import React from 'react';
import ProductPage from "@/app/components/ProductPage";

type Props = {
    params: {
        id: string,
    },
}

const ProductProfile = async ({ params }: Props) => {
    const response = await fetch('https://dummyjson.com/products/'+params.id);
    const result = await response.json();

    if (!result) return (
        <div>
            <p>Something went wrong!</p>
        </div>
    )

    return (
        <ProductPage product={result} />
    );
};

export default ProductProfile;