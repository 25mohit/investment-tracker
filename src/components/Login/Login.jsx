import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserReq } from '../../Redux/User/UserAction'

const Login = ({ toogle }) => {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()


  const onChangeHander = (e) => {
    const { name, value } = e.target
    setLogin({...login, [name]:value})
  }

  console.log("login", login);
  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(loginUserReq(login))
  }
  return (
    <div className='user_form'>
      <nav>
        <h2>Login</h2>
      </nav>
      <form action="post">
        <input onChange={onChangeHander} name='email' type="text" placeholder='Enter your email'/>
        <input onChange={onChangeHander} name='password' type="password" placeholder='Enter your password'/>
        <footer>
          <button onClick={loginHandler}>Login</button>
          <span><b onClick={() => toogle(false)}>Register</b></span>
        </footer>
      </form>
    </div>
  )
}

export default Login