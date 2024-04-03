import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { UseDispatch } from 'react-redux'
import { useForm } from 'react-hook-form' 


function Signup() {
    const navigate = useNavigate()
    const dispatch = UseDispatch()
    const { register, handleSubmit } = useForm() 
    const [error, setError] = useState(null)

    const signup = async (data) => {
        setError(null)
        try {
          const session = await authService.createAccount(data.email, data.password, data.name)
          if (session) {
            const userData = await authService.getCurrentUser()
            if (userData) { //user logged in h to userdata dispatch kro then navigate kr do automatically root pr
              dispatch(storeLogin(userData))
              navigate('/')
            }
          }
        } catch (error) {
          setError(error.message)
        }
      }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className='w-full max-w-7xl mx-auto bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className='mb-2 justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
                
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign Up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">Already have an account?&nbsp;<Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">Sign Up</Link></p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(signup)}>
                <div className='space-y-5'>
                    <Input 
                        label="Name: "
                        type="text"
                        placeholder="Enter your name"
                        {...register('name', { required: true })}
                    />
                    <Input 
                        label="Email: "
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', { required: true, validate: {
                            matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Please enter a valid email address'
                        } })}
                    />
                    <Input 
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', { required: true, minLength: 6 })}
                    />
                    <Button type="submit" className="w-full h-10">Sign Up</Button>
                </div>
            </form>
        </div> 
    </div>
  )
}

export default Signup
