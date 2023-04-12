import React, { useState } from "react";
import PropTypes from 'prop-types'
const Input = ({
    label="",
    name="",
    type="text",
    className="",
    InputClassName="",
    isRequired=false,
    placeholder="",
}) => {
  return (
    <div className={`flex flex-col items-center pt-4 ${className}`}>
        <div className="text-left">
        <label className="text-xl text-dark font-bold " htmlFor={name}>{label}</label>
        <input
            className={`w-[400px] h-[45px] rounded-lg border-2 border-dark focus:outline-none focus:border-primary text-lg px-2.5 bg-gray-300 ${InputClassName}`}
            type={type}
            name={name}
            id={name}
            required={isRequired}
            placeholder={placeholder}
            autoComplete="off"
            
        />
        </div>
    </div>
  )
}

export default Input