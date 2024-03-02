function Header() {
  return (
    <header className="flex items-center h-fit gap-6 self-center">
      <img
        src="logo512.png"
        alt="React logo"
        className="object-contain h-24 "
      />
      <h1 className="font-bold text-white text-4xl">The React Quiz</h1>
    </header>
  );
}

export default Header;
