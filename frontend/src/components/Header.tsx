import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <h1 className="flex justify-between mx-auto container">
        <span className="font-bold text-3xl text-white tracking-tight">
          <Link to="/">MERN Booking App</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="my-bookings"
                className="flex items-center hover:bg-blue-700 px-3 font-bold text-white"
              >
                My Bookings
              </Link>
              <Link
                to="my-hotels"
                className="flex items-center hover:bg-blue-700 px-3 font-bold text-white"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white hover:bg-gray-100 px-3 font-bold text-blue-600"
            >
              Sign In
            </Link>
          )}
        </span>
      </h1>
    </div>
  );
};

export default Header;
