import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import Navbar from '../components/Navbar';
import '../css/Header.css'
// import { faLongArrowAltDown, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';


const Header = ()=>{
    return (
        <div>
        <div className="container-fluid  social-networks  py-2 ">
            <div className="iconos">
                <a href="https://www.instagram.com/elpresimr" > <FontAwesomeIcon icon={faInstagram} color="white" size='2x' /></a>
       &nbsp;&nbsp;
       <a href="https://www.facebook.com/AndresMR10"> <FontAwesomeIcon icon={faFacebook} color="white"  size='2x'  /></a>
       
        &nbsp;&nbsp;
        <a href="tel:+593988703045"><FontAwesomeIcon icon={faWhatsapp} color="white"  size='2x' /></a>
        
            </div>

        </div>
        <Navbar/>
        </div>
    )
}

export default Header;