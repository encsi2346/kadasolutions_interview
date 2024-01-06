'use client';
import React from 'react';

interface Props {
    text: string;
}

const DetailsButton = ({ text }: Props) => {
    return (
        <div>
            <button className='btn rounded-full bg-black text-white py-0 my-2 w-[281.86px]' onClick={() => console.log('Click')}>{text}</button>
        </div>
    );
};

export default DetailsButton;