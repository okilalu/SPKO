/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function CustomInput({
  id,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      rows="4"
      required
    />
  );
}
