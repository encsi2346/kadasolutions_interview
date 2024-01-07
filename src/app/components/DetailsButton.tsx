'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    text: string;
    id: number;
}

const DetailsButton = ({ text, id }: Props) => {
    const router = useRouter();

    return (
        <button className='btn rounded-full bg-black text-white py-0 my-2 w-[281.86px]' onClick={() => router.push(`/pages/product/${id}`)}>
            {text}
        </button>
    );
};

export default DetailsButton;