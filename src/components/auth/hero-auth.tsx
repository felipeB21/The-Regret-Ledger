export default function HeroAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 w-full h-full">
      {children}
      <div>
        <h2>test</h2>
      </div>
    </div>
  );
}
