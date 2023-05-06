import React, { useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { AiFillPlusCircle } from 'react-icons/ai'
import { addInvestment } from '../../Redux/Investment/invAction'

const InvAdd = ({ onClose }) => {
    const [invest, setInvest] = useState({})
    const [wages, setWages] = useState([
        { wagesType: '', wagesAmount: null }
    ])
    // new

    const dispatch = useDispatch()

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setInvest({...invest, [name]:value})
    }

    const addMoreField = () => {
        setWages([...wages, { wagesType:'', wagesAmount:0}])
    }
    const wagesHandler = (e, i) => {
        let values = [...wages]
        values[i][e.target.name] = e.target.value
        setWages(values)
    }

    const addInvestmentHandler = (e) => {
        e.preventDefault()
        const payload = {
            invAction: invest.invAction,
            invType: invest.invType,
            invAssetName: invest.invAssetName,
            invAssetPrice: Number(invest.invAssetPrice),
            invDate: invest.invDate,
            invQuantity: invest.invQuantity,
            invWages: wages,
            invExtraNote: invest.invExtraNote,
            invAmount: Number(invest.invAmount)
        }
        dispatch(addInvestment(payload))
    }

  return (
    <div className='inv-form' onClick={() => onClose({addNew:false})}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
            <form action="post">
                <select onChange={onChangeHandler} name="invAction" id="" style={{width: '30%'}}>
                    <option value="">Action</option>
                    <option value="Buy">Investing</option>
                    <option value="Sell">Selling</option>
                </select>
                <div className="flex">
                    <label className="upload_invoice" htmlFor='upload_inv'>
                        <AiOutlineCamera />
                        <span>Upload Invoice</span>
                        <input type="file" id='upload_inv' hidden/>
                    </label>
                    <select onChange={onChangeHandler} name="invType" id="">
                        <option value="">Investment Type</option>
                        <option value="Crypto">Crypto</option>
                        <option value="Shares">Share</option>
                        <option value="MF">MF</option>
                    </select>
                </div>
                <input onChange={onChangeHandler} type="text" placeholder='Enter Asset Name' name="invAssetName" id="" />
                <div className="flex">
                    <input onChange={onChangeHandler} type="number" min={0} name="invAssetPrice" placeholder='Asset Price' id="" />
                    <input onChange={onChangeHandler} type="date" name="invDate"  id="" />
                    <input onChange={onChangeHandler} type="number" min={0} name="invQuantity" placeholder='Quantity' id="" />
                </div>
                {
                    wages.map((wg, indx) => 
                    <div className="flex">
                        <input onChange={(e) => wagesHandler(e, indx)} name='wagesType' value={wg.wagesType} type="text" style={{width: '30%'}} placeholder='Wages Type' id="" />
                        <input onChange={(e) => wagesHandler(e, indx)} name='wagesAmount' value={wg.wagesAmount} type="number" min={0} placeholder='Extra Wages Amount' />
                        { indx === 0 && <AiFillPlusCircle id='icon' onClick={addMoreField}/> }
                    </div>
                    )
                }
                <textarea name="invExtraNote" onChange={onChangeHandler} id="" placeholder='Enter Extra Note'></textarea>
                <input onChange={onChangeHandler} type="number" min={0} name="invAmount" placeholder='Investment Amount' id="" />
                <footer>
                    <button onClick={addInvestmentHandler}>Add Investment</button>
                </footer>
            </form>
        </div>
    </div>
  )
}

export default InvAdd