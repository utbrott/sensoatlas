interface AppShellProps {
  children: React.ReactNode;
}
export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className='flex'>
      {/* Navbar */}
      {children}
    </div>
  );
};
