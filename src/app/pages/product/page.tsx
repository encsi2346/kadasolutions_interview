import React from 'react';
import DetailsButton from "@/app/components/DetailsButton";
import Navbar from "@/app/components/Navbar";
import AddButton from "@/app/components/AddButton";

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

    return (
        <div>
            <Navbar />
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
                    <p className="rounded-full bg-[#6100FF] text-white font-[600] text-[14px] leading-[18.9px] py-1 px-4">{coreProduct.discountPercentage}%</p>
                    <div className="flex align-center">
                        <p className="text-[64px] font-[600] leading-[86.4px]">{coreProduct.price} $</p>
                        <AddButton text={'Add to cart'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;