import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, type, value, onChange, name, required }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>{label}</label><br />
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        style={{ padding: "0.5rem", width: "100%" }}
      />
    </div>
  );
};
