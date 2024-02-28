import React from 'react';
import s from './Hello.module.scss'


const Hello = ({visible, login}) => {
    const rootClasses = [s.modal]
    if(visible) rootClasses.push(s.active)

    const currentTime = new Date().getHours();

    return (
        <div className={rootClasses.join(' ')}>
            <div className={s.modalContent}>
            {
                        (() => {
                            switch (true) {
                                case currentTime <= 4:
                                    return <h3 className={s.pageTitle}>Доброй ночи, {login}!</h3>
                                case currentTime <= 12:
                                    return <h3 className={s.pageTitle}>Доброе утро, {login}!</h3>
                                case currentTime <= 17:
                                    return <h3 className={s.pageTitle}>Добрый день, {login}!</h3>
                                case currentTime <= 23:
                                    return <h3 className={s.pageTitle}>Добрый вечер, {login}!</h3>
                                default:
                                    return <div></div>
                            }
                        })()
                    }
            </div>
        </div>
    );
};

export default Hello;