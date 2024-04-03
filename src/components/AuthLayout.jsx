import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication=true}) { // authenticationnagr user nhi bhej rha to true hi hoga
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state=>state.auth.status)

    useEffect(() => {
        // TODO: make it more easy to understand
        // if (authStatus === true) {
        //     navigate('/')
        // }
        // else if (authStatus === false) {
        //     navigate('/login')
        // }

        // let authValue = authStatus ? true : false
        if(authentication && authStatus !== authentication){
            navigate('/login')
        } else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
  return loader ? <h1>Loading...</h1> : <h1>{children}</h1>
}


