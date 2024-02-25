import React from 'react';
import s from './Modal.module.scss'
import closeBtn from '../../../img/close-min.png'

const Modal = ({children, visible, setVisible}) => {
    const rootClasses = [s.modal]
    if(visible) rootClasses.push(s.active)

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={s.modalContent} onClick={event => event.stopPropagation()}>
                {children}
            </div>
            <img src={closeBtn} alt="..." className={s.modalCloseBtn}/>
        </div>
    );
};

export default Modal;