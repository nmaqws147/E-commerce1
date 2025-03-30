import logo from "./favicon.png";
import cart from "./cart.png";
import best from "../products/photos/like (1).png";
import home from "../products/photos/Home.png";
import { Link } from "react-router-dom";
export default function Navbar(props){
    return(
        <>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css'/>
        <header>
            <div className="logo-container">
            <img src={logo} alt='logo' className='logo'/>
            <h3 className='website-name'>StyleHaven</h3>
            </div>
            <div className="icons-container">
            <p className="count-best">{props.addToTheBestIconCount}</p>
            <Link to="/thebest"><img src={best} alt="best" className='best-icon'/></Link>
            <p className='count-cart'>{props.addToCartIcon}</p>
            <Link to="/cart"><img src={cart} alt="cart" className='cart-icon'/></Link>
            <Link to="/"><img src={home} alt="home-icon" className="home-icon"/></Link>
            </div>
        </header>

        </>
    );
} 