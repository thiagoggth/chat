import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  label: string;
  name: string;
  error?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

// valor: true | null | undefined = false

export const Input = ({ label, name, type, placeholder, error, onChange }: InputProps) => {
  const textErrorClass = error ? 'text-red-400 ' : '';
  const borderErrorClass = error ? 'border-red-400 ' : '';

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className={`${textErrorClass}text-sm`}>
        {label}
      </label>
      <input
        onChange={onChange}
        className={`p-2 rounded focus-visible:outline-none border-gray-400 border ${borderErrorClass} focus-visible:border-violet-900`}
        placeholder={placeholder}
        name={name}
        type={type}
      />
      <span className={!error ? 'hidden' : 'text-sm text-red-400'}>{error}</span>
    </div>
  );
};
