interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="flex items-center justify-center px-2 py-4 rounded bg-zinc-900 border border-gray-700 flex-col gap-4">
      {children}
    </div>
  );
};
