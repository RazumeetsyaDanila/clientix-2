import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './LoginPage.module.scss'
import { loginf } from '../../http/userAPI';
import { routes } from '../../consts';
import appLogo from '../../img/tech-alien64.png';
import LoginModal from '../../components/UI/loginModal/LoginModal'
import Hello from '../../components/UI/hello/Hello'

const LoginPage = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorModal, setErrorModal] = useState(false)
    const [helloVisible, setHelloVisible] = useState(false)
    const [errorText, setErrorText] = useState('')
    const { setUser } = useActions()

    const auth = async () => {
        try {
            let data
            data = await loginf(login, password)
            setUser(data.login, data.role)
            if (data.role === 'admin') navigate(routes.ADMIN_ROUTE)
            if (data.role === 'tech'){
                setHelloVisible(true)
                setTimeout(() => {navigate(routes.TECH_ROUTE)}, 1500)
            }
        } catch (e) {
            setErrorText(e.response.data.message)
            setErrorModal(true)
            // errorSound()
        }
    }

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
            <h3 className={s.appTitle}> <img className={s.logoImg} src={appLogo}></img> CLIENTIX 2.0</h3>

            <div className={s.formBox}>
                <div className={s.formBox2}>
                    <h2 className={s.authTitle}>Авторизация</h2>
                    <div className={s.inputbox}>
                        <input value={login} onChange={e => setLogin(e.target.value)} required />
                        <label>Логин</label>
                    </div>
                    <div className={s.inputbox}>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <label>Пароль</label>
                    </div>
                    <button onClick={auth}>Войти</button>
                </div>
            </div>            
            
            <LoginModal visible={errorModal} setVisible={setErrorModal}>
                <div className={s.errorContainer}>
                    <p className={s.modalErrorText}>{errorText}</p>
                    <button onClick={() => setErrorModal(false)}>OK</button>
                </div>
            </LoginModal>

            <Hello visible={helloVisible} login={login}/>
        </div>
    );
};

export default LoginPage;