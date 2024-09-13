import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center gap-2 my-5">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-bold text-lg underline transition-transform duration-300"
            : "text-blue-600"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-bold text-lg underline  transition-transform duration-300"
            : "text-blue-600"
        }
      >
        About
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-bold text-lg underline  transition-transform duration-300"
            : "text-blue-600"
        }
      >
        Products
      </NavLink>
    </nav>
  );
};

export default Navbar;
