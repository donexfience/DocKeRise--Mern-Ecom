import React from 'react'
import { Field, ErrorMessage } from 'formik'

const InputWithIcon = ({  name, icon, placeholder, types ,value}) => {
  return (
    <div className="mb-4 mt-5">
      <div className="mt-3 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Field
          className="appearance-none block w-full bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
          name={name}
          type={types}
          placeholder={placeholder}
          autoComplete="username"
        />
      </div>
      <ErrorMessage
        className="text-sm text-red-500"
        name={name}
        component="span"
      />
    </div>
  )
}

export default InputWithIcon
