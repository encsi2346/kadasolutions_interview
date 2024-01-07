'use client';
import React from 'react';

interface Props {
    text: string;
    onClick?: () => void;
}

const AddButton = ({ text, onClick }: Props) => {
    return (
        <button className='rounded-full bg-black text-white text-center py-3 px-12 my-2 text-[28px] font-[600] leading-[37.8px]'
                onClick={() => {
                    if(onClick) {
                        onClick();
                    }
                }}
        >
            {text}
        </button>
    );
};

export default AddButton;