import React from 'react';
import DetailsButton from "@/app/components/DetailsButton";

interface Props {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
}

const ProductCard = ({ id, title, description, price, discountPercentage, thumbnail }: Props) => {
    return (
        <div className="card card-compact w-[305px] bg-white border border-solid border-[#DBDBDB] rounded-[6.46px] m-5">
            <figure className="relative px-2 mt-2">
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-[6.46px] w-[282.21px] h-[149.18px]"/>
                <div className="absolute top-2 right-5 rounded-full bg-[#6100FF] text-white font-[600] text-[14px] leading-[18.9px] py-1 px-4 z-10">{discountPercentage}%</div>
            </figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <p className="text-[20px] font-[600] leading-[27px]">{title}</p>
                    <p className="text-[24px] font-[600] leading-[32.4px] pl-20 mr-0 pr-0">{price} $</p>
                </div>
                <p className="text-[14px] font-[500] leading-[18.9px] w-[218px]">{description}</p>
                <div className="card-actions justify-center">
                    <DetailsButton text={'See details'} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;