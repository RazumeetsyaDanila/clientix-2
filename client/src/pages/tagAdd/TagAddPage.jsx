import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './TagAddPage.module.scss'
import { routes } from '../../consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import backBtnImg from '../../img/previous.png';
import { tag_add } from '../../http/tagsAPI';
import Modal from '../../components/UI/modal/Modal';
import appLogo from '../../img/tech-alien64.png';


const TagAddPage = () => {

    useEffect(() => {
        fetchTagsGroups()
    }, [])

    const { fetchTags, fetchTagsGroups } = useActions()

    const [tagName, setTagName] = useState('')
    const [groupId, setGroupId] = useState(0)
    const [tagValue1, setTagValue1] = useState('')
    const [tagValue2, setTagValue2] = useState('')
    const [tagValue3, setTagValue3] = useState('')

    const [errorModal1, setErrorModal1] = useState(false)
    const [errorModal2, setErrorModal2] = useState(false)
    const [successModal, setSuccessModal] = useState(false)

    const { tags, tagsGroups } = useTypedSelector(state => state.tags)

    const navigate = useNavigate()

    const tagAdd = async () => {
        try {
            if (groupId == 0) {
                setErrorModal1(true)
                return
            }
            if (tagName === '' || tagValue1 === '') {
                setErrorModal2(true)
                return
            }
            await tag_add(tagName, groupId, tagValue1, tagValue2, tagValue3)
            setSuccessModal(true)
            setTimeout(() => setSuccessModal(false), 1000)
            setTagValue1('')
            setTagValue2('')
            setTagName('')
            fetchTags()
            // currentUserRole == 'admin' ? navigate(routes.ADMIN_ROUTE) : navigate(routes.SLAVE_ROUTE)
        } catch (e) {
            console.log(e.response.message)
        }
    }

    const selectGroup = (e) => {
        setGroupId(e.target.value)
    }

    return (
        <div className={s.container}>
            <div className={s.leftNavBarContainer}>
            <h2 className={s.appTitle}><img className={s.logoImg} src={appLogo}></img> CLIENTIX 2.0</h2>

                <NavLink to='/tags' className={s.backBtn}>
                    <img src={backBtnImg} alt="" />
                </NavLink>

            </div>
            <div className={s.workPlaceContainer}>
                <div className={s.headerContainer}>
                    <h3 className={s.pageTitle}>Добавление тега</h3>
                </div>

                <div className={s.addTagContainer}>
                    
                    <input className={s.addTagInput} type="text" placeholder="Наименование тега" value={tagName} onChange={e => setTagName(e.target.value)} />
                    <input className={s.addTagInput} type="text" placeholder="Значение 1" value={tagValue1} onChange={e => setTagValue1(e.target.value)} />
                    <input className={s.addTagInput} type="text" placeholder="Значение 2" value={tagValue2} onChange={e => setTagValue2(e.target.value)} />
                    {/* <input className='authInput' type="text" placeholder="Значение 3" value={tagValue3} onChange={e => setTagValue3(e.target.value)} /> */}
                    <select className={s.addTagSelectGroup} onChange={e => selectGroup(e)} >
                        <option value={0}>Выберите группу</option>
                        {tagsGroups.map(t => <option key={t.GROUP_ID} value={t.GROUP_ID}>{t.GROUP_NAME}</option>)}
                    </select>
                    <button className={s.addTagBtn} onClick={tagAdd} >Добавить</button>
                </div>
            </div>

            {/* ===================================== модальные окна ==================================================== */}
            <Modal visible={errorModal1} setVisible={setErrorModal1}>
                <div className={s.successModalContainer}>
                    <p className={s.successModalTitle}>Выберите группу тегов</p>
                    <button className={s.modalAccessBtn} onClick={() => setErrorModal1(false)}>ОК</button>
                </div>
            </Modal>

            <Modal visible={errorModal2} setVisible={setErrorModal2}>
                <div className={s.successModalContainer}>
                    <p className={s.successModalTitle}>Заполните данные о теге</p>
                    <button className={s.modalAccessBtn} onClick={() => setErrorModal2(false)}>ОК</button>
                </div>
            </Modal>

            <Modal visible={successModal} setVisible={setSuccessModal}>
                <div className={s.successModalContainer}>
                    <p className={s.successModalTitle}>Тег добавлен!</p>
                    {/* <button onClick={() => setSuccessModal(false)}>ОК</button> */}
                </div>
            </Modal>
        </div>
    );
};

export default TagAddPage;