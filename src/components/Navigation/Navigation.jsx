import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
const buildLinkStyle = ({ isActive }) => clsx(css.link, isActive && css.active);
const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={buildLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/movies" className={buildLinkStyle}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
