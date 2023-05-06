import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineRollback } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import { globalSettingReq, nestedSettingAdd, nestedSettingReq } from '../../Redux/Settings/SettingsAction'
import Activity from './Activity'

const Settings = ({ onClose }) => {
    const [invType, setInvType] = useState(true)
    const [parentId, setParentId] = useState('')
    const [addSetting, setAddSetting] = useState(false)
    const [setting, setSetting] = useState({})
    const [dataEdit, setDataEdit] = useState({})
    const [toogle, setToogle] = useState({
        global: true,
        activity: false
    })

    const dispatch = useDispatch()

    const mainSetting = useSelector(state => state.settings.mainSetting)?.data
    
    useEffect(() => {
        dispatch(globalSettingReq())
    },[])

    const onBack = () => {
        setInvType(true)
        setAddSetting(false)
        setDataEdit({})
    }
    const settingHandle = (id) => {
        setInvType(false)
        setParentId(id)
        setDataEdit({})
    }

    useEffect(() =>{
        dispatch(nestedSettingReq(parentId))
    },[parentId !== ''])

    const nestedList = useSelector(state => state.settings.nestedSetting)?.data

    const onSettingChange = (e) => {
        const{name, value} = e.target
        setSetting({...setting, [name]:value})
    }

    const onEditClick = (data) => {
        setDataEdit(data)
        setAddSetting(true)
    }
    
    useEffect(() => {
        if(dataEdit && Object.keys(dataEdit).length > 0){
            setSetting({
                invTypeName: dataEdit.invTypeName,
                sequence: dataEdit.sequence,
                invTypeDetail: dataEdit.invTypeDetail
            })
        } else {
            setSetting({})
        }
    },[dataEdit])

    const addNewSetting = (e) => {
        e.preventDefault()
        const payload = {
            id: parentId,
            data: {
                invTypeName: setting.invTypeName,
                sequence: Number(setting.sequence),
                invTypeDetail: setting.invTypeDetail,
            }
        }
        dispatch(nestedSettingAdd(payload))
        setAddSetting(false)
    }

  return (
    <div className='settings_main' onClick={() => onClose({settings: false})}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
            <div className="side_bar">
                <ul>
                    <li onClick={() => setToogle({global: true})}>Global Setting</li>
                    <li onClick={() => setToogle({global: true})}>Quick Setting</li>
                    <li onClick={() => setToogle({global: true})}>asd</li>
                    <li onClick={() => setToogle({global: true})}>asd</li>
                    <li onClick={() => setToogle({activity: true})}>Activity</li>
                </ul>
            </div>
            <div className="main">
                { toogle.global && <div className="setting_table">
                    { invType ? mainSetting?.map((setting, indx) => <div key={indx}  className="row" onClick={() =>settingHandle(setting?.uuid)}>
                            <span style={{color: "white"}}>{setting?.settingName}</span>
                        </div>) :
                        <div className='nested'>
                            <div className="top">
                                    <AiOutlineRollback id='back_icon' onClick={onBack}/>
                                    
                                {(nestedList !== undefined && !addSetting ) && <span>Total {nestedList?.length} Types Currently</span>}
                                <div>
                                    {!addSetting && <button style={{margin: '0'}} onClick={() => setAddSetting(true)}>Add</button> }
                                </div>
                            </div>
                            { !addSetting ? <div className="lists">
                                {
                                    nestedList !== undefined && nestedList?.map((setting, indx) => 
                                    <span key={indx}><span>{setting?.invTypeName}</span><span>{setting?.invTypeDetail}</span>
                                        <span  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem'}}>Seq. {setting?.sequence}
                                        <span style={{color: 'white', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '1.2rem'}}>
                                            <BiEdit onClick={() => onEditClick(setting)}/><MdDeleteOutline /></span></span>
                                    </span>)
                                }
                            </div> :
                            <div className='set_add_frm'>
                                <form action="post">
                                    <input onChange={onSettingChange} value={setting.invTypeName} name='invTypeName' type="text" placeholder='Investment Type Name'  />
                                    <input onChange={onSettingChange} value={setting.invTypeDetail} name='invTypeDetail' type="text" placeholder='Investment Type Detail'  />
                                    <input onChange={onSettingChange} value={setting.sequence} name='sequence' type="number" style={{width: '40%'}} placeholder='Investment Sequence'  />
                                    <footer>
                                        <button onClick={addNewSetting}>Add</button>
                                    </footer>
                                </form>
                            </div>}
                        </div>}
                </div> }
                { toogle.activity && <Activity /> }
            </div>
        </div>
    </div>
  )
}

export default Settings