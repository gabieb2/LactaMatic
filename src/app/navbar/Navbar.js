import Link from "next/link";

const Navbar = () => {
  return <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2 rounded">
    <span className="text-white text-lg font-bold mr-4">
      Home
    </span>
    <div className="flex flex-1" />
    <Link href="/" className="text-white text-lg mr-4">
      Inicio
    </Link>
    <Link href="/calculator" className="text-white text-lg mr-4">
      Calculadora
    </Link>
    <Link href="/help" className="text-white text-lg mr-4">
      Ayuda
    </Link>
  </nav>;
};

export default Navbar;