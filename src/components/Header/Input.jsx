import React, { useId } from 'react'

const Input = React.forwardRef((function Input({
    label,
    type="text",
    className="",
    ...props

}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-2 pl-1' htmlFor={id}>{label}</label>}
            <Input 
                type={type}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})) 


export default Input
