import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './LoginPage.module.scss'

const LoginPage = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorModal, setErrorModal] = useState(false)
    const [errorText, setErrorText] = useState('')
    const { setUser } = useActions()

    // const auth = async () => {
    //     try {
    //         let data
    //         data = await loginf(login, password)
    //         setUser(data.login, data.role)
    //         console.log(data)
    //         if (data.role === 'admin') navigate(routes.ADMIN_ROUTE)
    //         if (data.role === 'slave') {
    //             if (login === 'slave') loginSound()
    //             navigate(routes.SLAVE_ROUTE)
    //         }
    //     } catch (e) {
    //         setErrorText(e.response.data.message)
    //         setErrorModal(true)
    //         errorSound()
    //         // alert(e.response.data.message)
    //     }
    // }

    // const loginSound = () => {
    //     let audio = new Audio()
    //     audio.src = stickYourFingerInMyAss
    //     audio.autoplay = true
    // }

    // const errorSound = () => {
    //     let audio = new Audio()
    //     audio.src = ohShitIamSorry
    //     audio.autoplay = true
    // }

    return (
        <div className={s.container}>
            <div className={s.formBox}>
                <div className={s.formBox2}>
                    <h2>Авторизация</h2>
                    <div className={s.inputbox}>
                        <input value={login} onChange={e => setLogin(e.target.value)} required />
                        <label for="">Логин</label>
                    </div>
                    <div className={s.inputbox}>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <label for="">Пароль</label>
                    </div>
                    <button>Войти</button>
                </div>
            </div>
            <h3 className={s.appTitle}>CLIENTIX 2.0</h3>
            {/* <div className='mb-3 text-3xl'>Авторизация</div>
            <input className='authInput' type="text" placeholder="login" value={login} onChange={e => setLogin(e.target.value)} />
            <input className='authInput' type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className='authButton' onClick={auth}>Войти</button>

            <Modal visible={errorModal} setVisible={setErrorModal}>
                <div className={s.errorContainer}>
                    <p className='w-[250px] text-center'>{errorText}</p>
                    <button onClick={() => setErrorModal(false)}>OK</button>
                </div>
            </Modal> */}
        </div>
    );
};

export default LoginPage;