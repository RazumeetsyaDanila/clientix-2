import React from 'react';
import s from './LoginModal.module.scss'

const LoginModal = ({children, visible, setVisible}) => {
    const rootClasses = [s.modal]
    if(visible) rootClasses.push(s.active)

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={s.modalContent} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default LoginModal;