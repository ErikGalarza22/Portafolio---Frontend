import '../css/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRProject, faThemeco, faTeamspeak, faIntercom} from "@fortawesome/free-brands-svg-icons"

const Dashboard = () =>{

   
    return(
        <>
        <div className="contenedor-dashboard">
        <div style={{ backgroundColor:'#34495E'}}className="box uno">
        <FontAwesomeIcon icon={faIntercom} color="white" size='2x'/>
            <div className="boton"><a href="/ver-categorias">Categorías</a></div>
            </div>
            <div  style={{ backgroundColor:'#E74C3C'}} className="box dos">
            <FontAwesomeIcon icon={faThemeco} color="white" size='2x'/>
            <div className="boton"><a href="/ver-proyectos">Proyectos</a></div>
            </div>
            <div style={{ backgroundColor:' #F1C40F'}} className="box tres">
            <FontAwesomeIcon icon={faRProject} color="white" size='2x'/>
            <div className="boton"><a href="/ver-tecnologias">Tecnologías</a></div>
            </div>
            <div style={{ backgroundColor:'#73C6B6'}} className="box cuatro">
            <FontAwesomeIcon icon={faTeamspeak} color="white" size='2x'/>
            <div className="boton"><a href="/ver-perfiles">Perfiles</a></div>
            </div>
        </div>
        </>
    )
}

export default Dashboard