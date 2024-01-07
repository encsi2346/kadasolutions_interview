import React from 'react';
import { FaStar } from "react-icons/fa";

interface Props {
    rating: number,
}

const RatingComponent = ({ rating }: Props) => {
    const totalStars = 5;

    return (
        <div className="flex items-center space-x-2">
            {[...Array(totalStars)].map((_, index) => (
                <FaStar
                    key={index}
                    className={`text-[26px] ${index < Math.round(rating) ? 'text-[#6100FF]' : 'text-[#D9D9D9]'}`}
                />
            ))}
        </div>
    );
};

export default RatingComponent;