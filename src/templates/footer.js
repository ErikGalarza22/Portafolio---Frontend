import '../css/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"

const Footer = () =>{


    return(
        <>
        <div className="contenedor">
            <div className="contenedor-redes">
                <div className="titulo"><p className="texto">Redes Sociales</p></div>
                <ul>
                    <li className="red-social"><a href="https://www.instagram.com/elpresimr" > <FontAwesomeIcon icon={faInstagram} color="white" size='2x' /></a></li>
                    <li className="red-social"><a href="https://www.facebook.com/AndresMR10"> <FontAwesomeIcon icon={faFacebook} color="white"  size='2x'  /></a></li>
                    <li className="red-social"> <a href="tel:+593988703045"><FontAwesomeIcon icon={faWhatsapp} color="white"  size='2x' /></a></li>
                </ul>
            </div>
            <div className="contenedor-redes">
                <div className="titulo"><p className="texto">Redes Sociales</p></div>
                <ul>
                    <li className="red-social"><a href="https://www.instagram.com/elpresimr" > <FontAwesomeIcon icon={faInstagram} color="white" size='2x' /></a></li>
                    <li className="red-social"><a href="https://www.facebook.com/AndresMR10"> <FontAwesomeIcon icon={faFacebook} color="white"  size='2x'  /></a></li>
                    <li className="red-social"> <a href="tel:+593988703045"><FontAwesomeIcon icon={faWhatsapp} color="white"  size='2x' /></a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Footer