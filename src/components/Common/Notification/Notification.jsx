import React, { useState } from 'react'
import { useEffect } from 'react'

const Notification = ({ message, status }) => {
    
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(false)
    },[status])

    const hideHandler = () => {
        setActive(true)
        status = {}
    }
    console.log("status", status);
  return (
    <div className={`notification_main ${active ? 'unmount' : ''}`} id={status.status ? 'success': 'error'} onClick={hideHandler}>
        <span>{message}</span>
    </div>
  )
}

export default Notification