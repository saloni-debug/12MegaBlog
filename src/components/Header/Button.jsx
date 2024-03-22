import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props

    // children is just fancy name for text
}) {
  return (
    <div>
      <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} {...props}`}>
        {children} 
      </button>
    </div>
  )
}

export default Button
