import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout().then(()=>dispatch(logout())).catch((error)=>console.log(error))
    }
  return (
    <div>
      <button className='text-white bg-red-500 px-3 py-1 rounded-md' onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default LogoutBtn
