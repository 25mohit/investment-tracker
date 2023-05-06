import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activityReq } from '../../Redux/User/UserAction'
import Moment from 'moment';

const Activity = () => {
    const dispatch = useDispatch()
    Moment.locale('en')

    useEffect(() => {
        dispatch(activityReq())
    },[])
    const allActivity = useSelector(state => state.user.activity)?.newArr
    
  return (
    <div className='activity_main'>
        <table cellSpacing='0'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Activity</th>
                    <th style={{width: '60%'}}>Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    allActivity?.map((activity, indx) =>
                    <tr key={indx} className={activity?.status === 'Logout' ? 'logout' :'' }>
                        <td>{indx+1}</td>
                        <td>{activity?.status}</td>
                        <td>{Moment(activity?.time).format('LLLL')}</td>
                        <td></td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default Activity