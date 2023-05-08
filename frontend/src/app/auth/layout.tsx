export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-zinc-800 p-2 h-screen">{children}</div>
  );
}
