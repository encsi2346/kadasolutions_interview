'use client';
import React, {useEffect, useState} from 'react';

const Page = () => {
    return (
        <div>
            <button className="btn" onClick={() => {
                if (document) {
                    (document.getElementById('my_modal_5') as HTMLFormElement).showModal();
                }
            }}>
                Open modal
            </button>

                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Login</h3>
                        <p className="py-4">For add to cart must be logged in!</p>
                        <form className="card-body" method="dialog">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="modal-action form-control mt-6">
                                <button className="btn">Close</button>
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </dialog>
        </div>
    );
};

export default Page;