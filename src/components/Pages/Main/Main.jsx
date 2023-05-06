import React, { useState } from 'react'
import Login from '../../Login/Login'
import Hero from '../../Hero/Hero'
import Register from '../../Register/Register'
import bgImage from '../../../assets/Images/bgImage.jpg'
import Notification from '../../Common/Notification/Notification'
import { useSelector } from 'react-redux'

const Main = () => {
  const [toogle, setToogle] = useState(false)

  let loginRes = useSelector(state => state.user.loginRes)

  return (
    <div className='main_body' >
      {(!loginRes.status && loginRes.status !== undefined) && <Notification status={loginRes} message={loginRes?.message}/>}
      <div className="main_container">
        <div className="left">
          <Hero />

        </div>
        <div className="right">
          { !toogle ? <Register toogle={setToogle}/> : <Login toogle={setToogle}/> }

        </div>
      </div>
    </div>
  )
}

export default Main