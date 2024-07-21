function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="absolute inset-0 top-[15%] m-auto md:w-[70%] h-[70vh] bg-white shadow-sm shadow-gray-200 rounded-md overflow-auto">
      {children}
    </main>
  );
}

export default Container;
