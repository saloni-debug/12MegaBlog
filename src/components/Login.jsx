import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth'
import { UseDispatch } from 'react-redux'
import { useForm } from 'react-hook-form' // yaha se react hook form shuru hua h

function Login() {
  const navigate = useNavigate()
  const dispatch = UseDispatch()
  //check react-hook-form in https://react-hook-form.com/
  const { register, handleSubmit } = useForm() // as it is from website
  const [error, setError] = useState(null)

  const login = async (data) => {
    setError(null)
    try {
      const session = await authService.login(data.email, data.password)
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
      <div className='w-full max-w-lg mx-auto bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className='mb-2 justify-center'>
          <span className='inline-block w-full max-w-[100px]'></span>
          <Logo width='100%' />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}
          className="mt-8"
        > {/*  handle submit ek method h jaha pr hum apna login function call krenge */}
          <div className="space-y-5">
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
              {...register('password', { required: true, minLength: 6 })} //register aise hi use hota h from documentation
            />
            <Button
              type="submit"
              className="w-full h-10"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
