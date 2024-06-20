import Link from 'next/link';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/signup">Signup</Link></li>
        <li><Link href="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
