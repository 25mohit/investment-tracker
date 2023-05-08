import './App.css'
import './Style.css'
import './Responsive.css'
import { useSelector } from 'react-redux'
import Main from './components/Pages/Main/Main'
import Home from './components/Pages/Home/Home'

function App() {

  const loginRes = useSelector(state => state.user.loginRes)
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const token = localStorage.getItem('token')
  
  return (
    <div className="App">
      { loginRes.status || (isLoggedIn && token) ? <Home />
      : <Main />}
    </div>
  )
}

export default App
