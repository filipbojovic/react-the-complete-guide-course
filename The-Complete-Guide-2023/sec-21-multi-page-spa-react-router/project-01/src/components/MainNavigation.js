// import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        {/* isActive is automatically provided and tells us whether its page is currently being visited */}
                        <NavLink
                            to=""
                            className={({ isActive }) => isActive ? classes.active : undefined}
                            end // this tells that the link will be considered as ACTIVE only if the current path ends with 'to' which is '/' in this case
                        // style={({ isActive }) => ({
                        //     textAlign: isActive ? 'center' : 'left'
                        // })}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="products"
                            className={(isActive) => isActive ? classes.active : undefined}>
                            Products
                            {/* here we don't need to add the 'end' property because there are no other routes which ends with /products. */}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;