import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav class="w-full flex flex-row justify-around items-center p-4">
      <Link to="/">Applications</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
};

export default Navbar;
