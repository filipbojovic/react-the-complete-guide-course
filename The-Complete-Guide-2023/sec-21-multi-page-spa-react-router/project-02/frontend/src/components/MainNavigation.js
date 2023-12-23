import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* className for NavLink gets an object from which isActive can be expored by destructuring */}
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? classes.active : undefined}
              end // this link is active ONLY if the path ends with '/'
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => isActive ? classes.active : undefined}>Events</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
