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
  const textErrorClass = error ? 'text-red-400 ' : 'text-gray-400 ';
  const borderErrorClass = error ? 'border-red-400' : 'border-gray-700';
  const className = `
    p-2 rounded bg-zinc-800 text-slate-300 placeholder:text-gray-600 focus-visible:ring-1
    focus-visible:ring-violet-900 focus-visible:outline-none border ${borderErrorClass}
    focus-visible:border-violet-900
  `;

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className={`${textErrorClass}text-sm pb-2`}>
        {label}
      </label>
      <input
        onChange={onChange}
        className={className.replace(/(\r\n|\n|\r)/gm, '')}
        placeholder={placeholder}
        name={name}
        type={type}
      />
      <span className={!error ? 'hidden' : 'text-sm text-red-400'}>{error}</span>
    </div>
  );
};
