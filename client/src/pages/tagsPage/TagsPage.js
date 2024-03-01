import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './TagsPage.module.scss'
import { routes } from '../../consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import clearImg from '../../img/clear-img.png';
import CopiedText from '../../components/UI/copiedText/CopiedText';
import Modal from '../../components/UI/modal/Modal';
import { delete_tag, update_tag } from '../../http/tagsAPI';
import editBtn from "../../img/editing_min.png"
import appLogo from '../../img/tech-alien64.png';


const TagsPage = () => {
    const { unsetUser, fetchTags, fetchTagsGroups } = useActions()
    const { tags, tagsGroups, loading, error } = useTypedSelector(state => state.tags)
    const [currentTags, setCurrentTags] = useState(tags)
    const currentUserRole = useTypedSelector(state => state.user.role)
    const [currentTagsGroup, setCurrentTagsGroup] = useState(0)
    const [textFilter, setTextFilter] = useState('')

    const [editTagModal, setEditTagModal] = useState(false)
    const [editTagSuccessModal, setEditTagSuccessModal] = useState(false)

    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
    const [editTagId, setEditTagId] = useState(0)
    const [editTagName, setEditTagName] = useState('')
    const [editTagValue1, setEditTagValue1] = useState('')
    const [editTagValue2, setEditTagValue2] = useState('')
    const [editTagValue3, setEditTagValue3] = useState('')

    const nameField = React.useRef(document.createElement("input"))

    const currentTime = new Date().getHours();

    const logOut = () => {
        unsetUser()
    }

    useEffect(() => {
        fetchTags()
        fetchTagsGroups()
    }, [])

    useLayoutEffect(() => {
        setCurrentTags(tags)
    }, [tags])

    useEffect(() => {
        if (currentTagsGroup != 0) {
            setCurrentTags(tags.filter(t => t.GROUP_ID == currentTagsGroup))
        } else setCurrentTags(tags)
    }, [currentTagsGroup])

    const filterTags = (e) => {
        setCurrentTagsGroup(e.target.value)
    }

    const clearSearch = () => {
        nameField.current.focus()
        setTextFilter('')
    }

    const startEditTag = (id, name, value1, value2) => {
        setEditTagModal(true)
        setEditTagId(id)
        setEditTagName(name)
        setEditTagValue1(value1)
        setEditTagValue2(value2)
    }

    const applyEdit = () => {
        update_tag( editTagId, editTagName, editTagValue1, editTagValue2, editTagValue3)
        setTimeout(() => refresh(), 100) // при изменении тега, не успевает обновиться информация о внесенных изменениях, поэтому откладываем обновление данных на 0,1 секунду (приношу извинения за костыль, другого решения пока не нашел)
        setEditTagModal(false)
        setEditTagSuccessModal(true)
    }

    const refresh = () => {
        fetchTags()
        setCurrentTags(tags)
    }

    const startDeleteTag = (name) => {        
        setEditTagModal(false)
        setDeleteConfirmModal(true)        
    }

    const deleteTag = () => {
        delete_tag(editTagId)
        setTimeout(() => refresh(), 100) // при изменении тега, не успевает обновиться информация о внесенных изменениях, поэтому откладываем обновление данных на 0,1 секунду (приношу извинения за костыль, другого решения пока не нашел)
        setDeleteConfirmModal(false)
    }


    return (
        <div className={s.container}>
            <div className={s.leftNavBarContainer}>
                <h2 className={s.appTitle}> <img className={s.logoImg} src={appLogo}></img>CLIENTIX 2.0</h2>

                <div className={s.pageListContainer}>
                    <NavLink to='/tech' className={s.navLinkToTech}>Клиенты</NavLink>
                    <NavLink to='/tags' className={s.navLinkToTags}>Теги</NavLink>
                </div>

                <NavLink to='/login' className={s.exitBtn} onClick={logOut}>Выйти из учетной записи</NavLink>
            </div>
            <div className={s.workPlaceContainer}>
                <div className={s.headerContainer}>
                    {/* <h3 className={s.pageTitle}>Теги</h3> */}
                    <div className={s.headerPanel}>

                        <input placeholder='Поиск тега по наименованию...' ref={nameField} className={s.tagSearchInput} type="text" value={textFilter} onChange={e => setTextFilter(e.target.value)} />

                        <img src={clearImg} alt="" className={s.clearSearchBtn} onClick={clearSearch} />

                        <select className={s.groupSelect} onChange={e => filterTags(e)} >
                            <option value={0}>Все</option>
                            {tagsGroups.map(t => <option key={t.GROUP_ID} value={t.GROUP_ID}>{t.GROUP_NAME}</option>)}
                        </select>

                        <NavLink to='/tag_add' className={s.tagAddBtn}>Добавить тег</NavLink>

                    </div>
                </div>


                {/* ================================ таблица с тегами ======================================= */}
                {
                    // крутилка загрузки
                    // loading ? <div className={s.loadingSpin}></div> :
                        <div className={s.tableContainer}>
                            <table className={s.table}>
                                <thead className={s.thead}>
                                    <tr className={s.tr}>
                                        <th className={s.thName}>Наименование</th>
                                        <th className={s.thValue1}>Значение 1</th>
                                        <th className={s.thValue2}>Значение 2</th>
                                        {/* <th className='w-[280px]'>Значение 3</th> */}
                                    </tr>
                                </thead>
                                <tbody className={s.tbody}>
                                    {currentTags
                                        .filter(t => t.TAG_NAME.toLowerCase().includes(textFilter.toLowerCase()))
                                        .map(t => <tr key={t.TAG_NAME}>
                                            <td className={s.td} data-th="Наименование"><div className={s.tdNameFlex}>{t.TAG_NAME} <img src={editBtn} className={s.editImg} onClick={() => startEditTag(t.TAG_ID, t.TAG_NAME, t.TAG_VALUE1, t.TAG_VALUE2)} /></div></td>
                                            <td className={s.tdValue1} data-th="Значение 1"><CopiedText text={t.TAG_VALUE1} /></td>
                                            <td className={s.tdValue2} data-th="Значение 2"><CopiedText text={t.TAG_VALUE2} /></td>
                                            {/* <td data-th="Значение 3">{t.tag_value3}</td> */}
                                        </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                }
                {/* ================================================================================================= */}

                <Modal visible={editTagModal} setVisible={setEditTagModal}>
                    <div className={s.editTagContainer}>
                        <p className={s.editTagTitle}>Редактирование</p>
                        <input className={s.editTagInput} type="text" placeholder="Наименование тега" value={editTagName} onChange={e => setEditTagName(e.target.value)} />
                        <input className={s.editTagInput} type="text" placeholder="Значение 1" value={editTagValue1} onChange={e => setEditTagValue1(e.target.value)} />
                        <input className={s.editTagInput} type="text" placeholder="Значение 2" value={editTagValue2} onChange={e => setEditTagValue2(e.target.value)} />
                        <button className={s.editTagApplyBtn} onClick={applyEdit}>Применить изменения</button>
                        <button className={s.editTagDeleteBtn} onClick={() => startDeleteTag(editTagName)}>Удалить</button>
                    </div>
                </Modal>

                <Modal visible={deleteConfirmModal} setVisible={setDeleteConfirmModal}>
                <div className={s.editTagContainer}>
                    <p className={s.editTagTitle}>Удалить?</p>
                    <div className={s.deletetagYesNo}>
                        <button className={s.deletetagYes} onClick={deleteTag}>Да</button>
                        <button className={s.deletetagNo} onClick={() => setDeleteConfirmModal(false)}>Нет</button>
                    </div>
                </div>
            </Modal>
            </div>
        </div>
    );
};

export default TagsPage;