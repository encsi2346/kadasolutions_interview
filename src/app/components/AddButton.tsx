'use client';
import React from 'react';

interface Props {
    text: string;
}

const AddButton = ({ text }: Props) => {
    return (
        <button className='btn rounded-full bg-black text-white text-center py-2 px-10 my-2 text-[28px] font-[600] leading-[37.8px]'
                onClick={() => console.log('Click')}
        >
            {text}
        </button>
    );
};

export default AddButton;