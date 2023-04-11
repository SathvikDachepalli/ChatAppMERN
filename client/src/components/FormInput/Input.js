import React, { useState } from "react";
import PropTypes from 'prop-types'
const Input = ({
    label="Name",
    name="name",
    type="text",
    className="",
    isRequired=false,
    placeholder="",
}) => {
  return (
    <div className="flex flex-col items-center pt-4 w-[50%]">
        <div className='flex flex-col'>
        <label className="text-xl text-dark font-bold " htmlFor={name}>{label}</label>
        <input
            className={`w-[400px] h-[45px] rounded-lg border-2 border-dark focus:outline-none focus:border-primary text-lg px-2.5 bg-gray-300 ${className}`}
            type={type}
            name={name}
            id={name}
            required={isRequired}
            placeholder={placeholder}
        />
        </div>
    </div>
  )
}

export default Input