interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  // register?: UseFormRegister<any>;
}

// valor: true | null | undefined = false

export const Input = ({ label, name, error, ...rest }: InputProps) => {
  const textErrorClass = error ? 'text-red-400 ' : 'text-gray-400 ';
  const borderErrorClass = error ? 'border-red-400' : 'border-gray-700';
  // const registeredProps = register && register(name);

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={`${textErrorClass}text-sm pb-2`}>
        {label}
      </label>
      <input
        className={`
          w-full p-2 rounded bg-zinc-800 text-slate-300 placeholder:text-gray-600
          focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:outline-none border
           ${borderErrorClass} focus-visible:border-violet-900
        `}
        // {...registeredProps}
        {...rest}
      />
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
};
