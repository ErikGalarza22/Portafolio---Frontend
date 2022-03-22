// import {getFotoById} from '../services/perfil'

// import {useEffect, useState} from 'react'
import '../css/Card.css'

const Card = ({perfil})=>{

    return(
        <>
      <div className="card" style={{width:'18rem'}}>
          {/* <h5>{perfil.foto.data}</h5> */}
  <img src={`http://localhost:5000/api/perfil/foto/${perfil._id}`} className="card-img-top" alt="dklflkadf" />
  <div className="card-body">
      <h4 className="card-title">{perfil.especialidad}</h4>
    <h5 className="card-title">{perfil.nombre}</h5>
    <p className="card-text">{perfil.descripcion}</p>
    <p className="lead">{perfil.correo}</p>
    {/* <a href="!#" className="btn btn-primary">Ver detalles</a> */}
  </div>
</div>
        </>
    )    
}


export default Card