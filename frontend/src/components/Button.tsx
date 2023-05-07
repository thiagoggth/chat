interface ButtonProps {
  children: string;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="py-2 mb-2 px-4 bg-violet-900 hover:bg-violet-950 transition-colors ease-in-out text-white rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
