import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">SynapHack</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {token ? (
            <>
              <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">Admin Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;