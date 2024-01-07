import React, {useState} from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

interface Props {
    images: string[];
}

const ImageViewer = ({ images }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='max-w-[620px] h-[481px] w-full m-auto relative group'>
            <div style={{backgroundImage: `url(${images[currentIndex]})`}}
                className=' w-[502.4px] h-[481px] rounded-2xl bg-auto  bg-no-repeat bg-center bg-cover duration-500'
            />

            <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] left-[-10%] text-2xl p-2 hover:text-[#323232] text-[#323232]/[.6] cursor-pointer'>
                <BsChevronLeft onClick={prevSlide} size={30} />
            </div>

            <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] right-[10%] text-2xl p-2 hover:text-[#323232] text-[#323232]/[.6] cursor-pointer'>
                <BsChevronRight onClick={nextSlide} size={30} />
            </div>

            <div className='flex align-center justify-center py-5 pr-20'>
                {images.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                    >
                        {slideIndex === currentIndex ? (
                            <RxDotFilled className='text-[#6100FF] text-[27px]'/>
                        ) : (
                            <RxDotFilled className='text-[#323232]/[.6] text-[27px]'/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageViewer;