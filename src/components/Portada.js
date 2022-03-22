import "../css/Portada.css";
import Card from "../components/Card";
import { getAllPerfil } from "../services/perfil";
import React, { useState, useEffect } from "react";
import foto from '../img/fotoDev.jfif';

const Portada = () => {
  const [perfiles, setPerfiles] = useState([]);

  const loadPerfiles = () => {
    getAllPerfil().then(data=>{
        setPerfiles(data.data)
    }).catch(err=>{
        console.err(err.message)
    })
  };

  useEffect(() => {
    loadPerfiles();
  }, []);

  return (
    <>
      <div className="fondo" id="fondo">
        {/* <img className="imgFondo" src={fondosvg} alt="imagen de fondo"/> */}

        <div className="box">
          {perfiles.map((perfil, i) => (
            <div className="contenedor-card" key={i} >
            <img  src={foto} className="card-img-top" alt="dklflkadf" />
              {/* <Card perfil={perfil} /> */}
              <div className="info-dev">
                <p>Desarrollador de software</p>
                <p>Gustavo Andres Morales</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Portada;
