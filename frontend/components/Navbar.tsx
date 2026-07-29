import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="navbar">
        <Link href="/" className="brand">
          AUTO<span>TRACK</span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/vehicles">My Vehicles</Link>
          <Link href="/vehicles/new" className="nav-button">
            Add Vehicle
          </Link>
        </nav>
      </div>
    </header>
  );
}