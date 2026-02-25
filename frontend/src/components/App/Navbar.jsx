import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/env";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  console.log(user)
  return (
    <div className="bg-stone-800 sticky top-0 border-b border-b-stone-600 text-white py-2 px-4 flex justify-between">
      <div id="leftSide" className="">
        <Link to="/" className="font-bold text-2xl text-yellow-400">Textory</Link>
      </div>

      <div id="rightSide" className="flex">
        {/* if authenticated then show authenticated menus else public user menu */}
        {isAuthenticated ? <AuthenticatedNavMenu user={user} /> : <PublicNavMenu />}
      </div>
    </div>
  );
}

function AuthenticatedNavMenu({user}) {
  return (
    <div className="flex">
      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/userDashboard">My Posts</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/userEdit">
            <img src={`${BACKEND_URL}/media/profile/${user?.userId}`} className="w-8 h-8 rounded-full" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
function PublicNavMenu() {
  return (
    <div className="flex">
      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link className="underline text-orange-400" to="/login">Login</Link>
        </li>
        <li>or</li>
        <li>
          <Link className="underline text-orange-400" to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}
