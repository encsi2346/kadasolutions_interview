import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper'){
            onClose();
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-100' onClick={handleClose}>
            <div className='w-[500px] flex flex-col'>
                <div className='bg-white p-5 rounded'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;