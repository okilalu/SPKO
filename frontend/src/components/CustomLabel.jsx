/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function CustomLabel({ htmlFor, text }) {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      <p>{text}</p>
    </label>
  );
}
