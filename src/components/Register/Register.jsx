import { useState } from 'react'

const Register = ({ toogle }) => {
    const [user, setUser] = useState({
        name:'',
        email:"",
        password:'',
        mobile:'',
        rePassword:'',
        dob:''
    })
    const [errors, setErrors] = useState({})

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }

    const registerUserHandler = (e) => {
        e.preventDefault()
        setErrors(() => {
            const err = {}
            if(!user.name){
                err.name = 'Please Enter your Name *'
            }
            if(!user.email){
                err.email = 'Enter your Email *'
            }
            if(!user.password){
                err.password = 'Create New Password *'
            } 
            if(user.password.length < 7 ){
                err.password = 'Password length should be min 7 *'
            }
            if(!user.rePassword){
                err.rePassword = 'Re-Confirm your Password *'
            }
            if(!user.mobile){
                err.mobile = 'Enter your Mobile No *'
            }
            if(user.mobile.length < 10 ){
                err.mobile = 'Mobile length should be min 10 *'
            }
            if(!user.dob){
                err.dob = 'Select your Date of Birth *'
            }
            if(user.password !== user.rePassword){
                err.rePassword = "Both Password are not Same *"
            }
            return err 
        })
    }
    
  return (
    <div className='user_form'>
        <nav>
            <h2>Register</h2>
        </nav>
        <form action="post">
            <input onChange={onChangeHandler} onInput={() => setErrors({...errors, name: ''})} name='name' type="text" placeholder='Please enter your name'/>
            {errors.name && <span className='form-error'>{errors.name}</span>}
            <input onChange={onChangeHandler} onInput={() => setErrors({...errors, email: ''})} name='email' type="text" placeholder='Please enter your email'/>
            {errors.email && <span className='form-error'>{errors.email}</span>}
            <input onChange={onChangeHandler} onInput={() => setErrors({...errors, password: ''})} name='password' type="password" placeholder='Please enter your password'/>
            {errors.password && <span className='form-error'>{errors.password}</span>}
            <input onChange={onChangeHandler} onInput={() => setErrors({...errors, rePassword: ''})} name='rePassword' type="password" placeholder='Re-confirm Password'/>
            {errors.rePassword && <span className='form-error'>{errors.rePassword}</span>}
            <input onChange={onChangeHandler} onInput={() => setErrors({...errors, mobile: ''})} name='mobile' minLength={10} type="number" placeholder='Please enter your mobile'/>
            {errors.mobile && <span className='form-error'>{errors.mobile}</span>}
            <input onChange={onChangeHandler} onInput={() => setErrors({...errors, dob: ''})} name='dob' type="date"/>
            {errors.dob && <span className='form-error'>{errors.dob}</span>}
            <footer>
                <button onClick={registerUserHandler}>Register</button>
                <span><b onClick={() => toogle(true)}>Login now</b></span>
            </footer>
        </form>
    </div>
  )
}

export default Register