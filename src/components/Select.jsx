import React, {useId} from 'react'

function Select({
    options, //options hmesha array hi aayega
    label,
    className="", //usually we use this to add classes
    ...props

}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-2 pl-1' htmlFor={id}></label>}     
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      >
        {options? options.map(option=>(
            <option key={option} value={option}>{option}</option>
        )):null}
      </select> 
    </div>
  )
}

export default React.forwardRef(Select) //this is also a way to use forwardRef