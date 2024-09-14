import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center gap-4 tracking-wide font-mono mt-3 mb-10">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white text-xl bg-blue-600 px-2 rounded-md -transition-transform duration-300"
            : "text-blue-500 text-lg"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-white text-xl bg-blue-600 px-2 rounded-md -transition-transform duration-300"
            : "text-blue-500 text-lg"
        }
      >
        About
      </NavLink>
      <NavLink
        to="/posts"
        className={({ isActive }) =>
          isActive
            ? "text-white text-xl bg-blue-600 px-2 rounded-md -transition-transform duration-300"
            : "text-blue-500 text-lg"
        }
      >
        Posts
      </NavLink>
    </nav>
  );
};

export default Navbar;
