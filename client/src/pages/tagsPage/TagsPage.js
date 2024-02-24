import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import s from './TagsPage.module.scss'
import { routes } from '../../consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import clearImg from '../../img/clear-img.png';
import CopiedText from '../../components/UI/copiedText/CopiedText';


const TagsPage = () => {
    const { unsetUser, fetchTags, fetchTagsGroups } = useActions()
    const { tags, tagsGroups, loading, error } = useTypedSelector(state => state.tags)
    const [currentTags, setCurrentTags] = useState(tags)
    const currentUserRole = useTypedSelector(state => state.user.role)
    const [currentTagsGroup, setCurrentTagsGroup] = useState(0)
    const [textFilter, setTextFilter] = useState('')

    const nameField = React.useRef(document.createElement("input"))

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


    // if (!loading) return <h1 className={s.loadingSpin}>Идет загрузка...</h1>

    return (
        <div className={s.container}>
            <div className={s.leftNavBarContainer}>
                <h2 className={s.appTitle}>CLIENTIX 2.0</h2>

                <div className={s.pageListContainer}>
                    <NavLink to='/tech' className={s.navLinkToTech}>Клиенты</NavLink>
                    <NavLink to='/tags' className={s.navLinkToTags}>Теги</NavLink>
                </div>

                <NavLink to='/login' className={s.exitBtn} onClick={logOut}>Выйти из учетной записи</NavLink>
            </div>
            <div className={s.workPlaceContainer}>
                <div className={s.headerContainer}>
                    <h3 className={s.pageTitle}>Теги</h3>
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
                    loading ? <div className={s.loadingSpin}></div> :
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
                                            <td className={s.td} data-th="Наименование">{t.TAG_NAME}</td>
                                            <td className={s.tdValue1} data-th="Значение 1"><CopiedText text={t.TAG_VALUE1}/></td>
                                            <td className={s.tdValue2} data-th="Значение 2"><CopiedText text={t.TAG_VALUE2}/></td>
                                            {/* <td data-th="Значение 3">{t.tag_value3}</td> */}
                                        </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                }
                {/* ================================================================================================= */}
            </div>
        </div>
    );
};

export default TagsPage;