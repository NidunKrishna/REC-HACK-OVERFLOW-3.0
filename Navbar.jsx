import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../../src/Assets/logo.png';
import Avatar from './Avatar/Avatar';
import Button from '../../src/components/Button/Button';
import './Navbar.css';
import SR from '../Assets/SR.png';
const Navbar = ()=>{
var User = null;

    return(
<nav className='main-nav'>
        <div className='navbar' width = "18">
            <Link to = '/' className='nav-item nav-btn'>
                <img src = {logo} alt = 'logo' className='img' />
            </Link>
            <Link to = "/" className='nav-item nav-button'> About </Link>
            <Link to = "/" className='nav-item nav-button'> product </Link>
            <Link to = "/" className='nav-item nav-button'> For Teams </Link>
            <form>
                <input type = "text" placeholder="  Search..."/>
                <img src = {SR} alt = "search" width = "18" className='search-icon'/>           
                 </form>
                 {User === null ? < Link 
                 to='/Auth' className="nav-item nav-links">Log in</Link>:
                <>
               <Avatar className="nav-item nav-links" backgroundColor="cadetblue" px="10px" py="17px" borderRadius="50%" color="white" width="40px"> <Link to = "/User"  style={{color:"white",textDecoration:"none"}}>M</Link></Avatar>
                <button className="nav-item nav-links">Log out</button>
                
                    </> 
                 
                }
        </div>
</nav>
    );
}
export default Navbar;