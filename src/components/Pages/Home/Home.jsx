import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllInvestment } from '../../../Redux/Investment/InvAction'
import { logoutActivity } from '../../../Redux/User/UserAction'
import Notification from '../../Common/Notification/Notification'
import Table from '../../Common/Table/Table'
import InvAdd from '../../InvAdd/InvAdd'
import Settings from '../../Settings/Settings'

const Home = () => {
  const [toogleOpt, setToogleOpt] = useState({
    addNew: false,
    settings: false
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllInvestment())
  },[])

  const investmentList = useSelector(state => state.investment.investList)?.data

  const columnData = [
    {value: 'no', name: 'No.'},
    {value: 'no', name: 'Invoice'},
    {value: 'no', name: 'Inv Type'},
    {value: 'no', name: 'Asset Name'},
    {value: 'no', name: 'Asset Price'},
    {value: 'no', name: 'Investment Date'},
    {value: 'no', name: 'Quantity'},
    {value: 'no', name: 'Action'},
    {value: 'no', name: 'Finale Price'}
  ]
  const logoutHandler = () => {
    dispatch(logoutActivity())
    localStorage.clear('token','')
    localStorage.clear('isLoggedIn',false)
    setTimeout(() => {
        window.location.reload()
    },300)
  }
  let loginRes = useSelector(state => state.user.loginRes)
  
  let userName = localStorage.getItem('user_name')
  let invests = localStorage.getItem('invest')

  return (
    <div className='home_main'>
      
      {(loginRes.status) && <Notification status={loginRes} message={loginRes?.message}/>}
      { toogleOpt.addNew && <InvAdd onClose={setToogleOpt}/> }
      { toogleOpt.settings && <Settings onClose={setToogleOpt}/> }
      <div className="navbar">
          <ul>
            {/* <li>Home</li> */}
            <li onClick={() => setToogleOpt({addNew:true})}>Add New Investment</li>
            <li onClick={() => setToogleOpt({settings:true})}>Settings</li>
            <li>Statistic</li>
            <li style={{color: 'orange'}}><b>Invested : ₹ {Math.round(invests)}</b></li>
          </ul>
          <div>
            <p>Welcome, {userName}</p>
            <span className='logout' onClick={logoutHandler}>Logout</span>
          </div>
      </div>
      <div className="container">
          <div className="section">
            <input type="text" placeholder='Search your Investments here' name="" id="" />
            <div className="container-2">
              <div className="filter_bar">
                  <h4>Filter</h4>
                  <ul>
                    <li>Latest Added</li>
                    <li>Oldest Added</li>
                    <li>Lowest Amount</li>
                    <li>Highest Amount</li>
                  </ul>
              </div>
              <Table tableData={investmentList} columnData={columnData}/>
            </div>
          </div>
          {/* <div className="right"></div> */}

      </div>
    </div>
  )
}

export default Home