
// import Header from '../templates/header.js'
import Portada from '../components/Portada'
import Tecnologia from '../components/Tecnologia'
import Proyecto from '../components/Proyecto'
import Titular from '../components/Titular'
import Footer from '../templates/footer'

const Inicio = (props)=>{
    return (
        <div>
 <Portada/>
 <Titular palabra="Tecnologías"/>
 <Tecnologia/>
 <Titular palabra="Proyectos"/>
 <Proyecto/>
 <Footer/>
        </div>
    )
}

export default Inicio