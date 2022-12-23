import React from 'react';
import toast from 'react-hot-toast';
import { IToast, toastTypes } from './types';
import './toast.css';

import checkSign from './icons/checkSign.png'
import crossSign from './icons/crossSign.png'
import warnSign from './icons/warn.png'
import infoSign from './icons/info.png'

const image: { [type in toastTypes]: string } = {
    [toastTypes.success]: checkSign,
    [toastTypes.error]: crossSign,
    [toastTypes.info]: infoSign,
    [toastTypes.warning]: warnSign,
}
const background: { [type in toastTypes]: string } = {
    [toastTypes.success]: 'bg-success ',
    [toastTypes.error]: 'bg-danger',
    [toastTypes.info]: 'bg-info',
    [toastTypes.warning]: 'bg-warning',
}

const Toast: React.FC<IToast> = ({ type, title, description }) => {
    console.log('title', type, title,description)
    return (
        <>
            {toast.custom((t: any) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} ${background[type]} toast-div `}>
                    <div className="p-2 p-sm-3">
                        <div className="d-flex">
                            <img
                                className="toast-img"
                                src={image[type]} style={{ height: '50px', width: '50px' }}
                                alt="" />
                            <div className="ml-3">
                                <p className="mb-0 toast-name text-light">{title}</p>
                                <p className="mt-1 toast-discription text-light">{description}</p>
                            </div>
                        </div>
                        <div className="cross">
                            <i className="far fa-times pointer text-light" onClick={() => toast.dismiss(t.id)}></i>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
};

export default Toast;
export { toastTypes } from './types'






