import {getAllProyectos} from '../services/proyecto'
import {useEffect, useState} from 'react'

const Proyectos = (props)=>{
const [proyectos, setProyecto] = useState([])



const loadProyectos = ()=>{
    getAllProyectos().then(proyectos=>{
        setProyecto(proyectos.data)
    }).catch(err=>{
        console.error(err.message)
    })
}
    


useEffect(()=>{
loadProyectos();
},[])


    return (
        <>
        <div className="contenedor">

    {proyectos.map((proyecto,i)=>(
       <div className="contenedor-individual" key={i}>
           <div className="texto" style={{color:"white"}}>{proyecto.nombre}</div>
{/* <p>{proyecto.nombre}</p> */}
</div>
    ))}

 
        </div>
        </>
     
        

    )
}

export default Proyectos