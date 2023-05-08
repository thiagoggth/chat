type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`
        py-2 mb-2 px-4 bg-violet-900 hover:bg-violet-950 transition-colors ease-in-out text-white
        rounded ${className || ''}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};
