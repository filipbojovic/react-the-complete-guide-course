import logo from '../../assets/investment-calculator-logo.png';
import classes from './Header.module.css';

const Header = () => {
    return (
        // import header related styles from css file
        <header className={classes.header}> 
            <img src={logo} alt="logo" />
            <h1>Investment Calculator</h1>
        </header>
    )
};

export default Header;