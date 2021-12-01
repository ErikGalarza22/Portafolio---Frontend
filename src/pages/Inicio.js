
// import Header from '../templates/header.js'
import Portada from '../components/Portada'
import Tecnologia from '../components/Tecnologia'
import Titular from '../components/Titular'
import Footer from '../templates/footer'

const Inicio = (props)=>{
    return (
        <div>
 <Portada/>
 <Titular palabra="Tecnologías"/>
 <Tecnologia/>
 <Footer/>
        </div>
    )
}

export default Inicio