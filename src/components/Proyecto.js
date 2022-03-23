import {getAllProyectos} from '../services/proyecto'
import {useEffect, useState} from 'react'
import portada from '../img/portada.jpg';

const Proyecto = ()=>{
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
     
       <div className="card" style={{width: "18rem"}}>
       <img src={proyecto.url} className="card-img-top" alt="..." />
       <div className="card-body">
    <h5 className="card-title">{proyecto.nombre}</h5>
    <p className="card-text">{proyecto.descripcion}.</p>
  </div>
  {/* <ul className="list-group list-group-flush">
    <li className="list-group-item">An item</li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul> */}
  <div className="card-body" style={{display:"flex", justifyContent:"center", textDecoration:"none"}} >
    <a href={proyecto.enlace} target="_blank" className="card-link" style={{marginRight:"40px"}}>Enlace</a>
    <a href="#" class="btn btn-primary">Ver detalles</a>
  </div>
       </div>
</div>
    ))}

 
        </div>
        </>
     
        

    )
}

export default Proyecto