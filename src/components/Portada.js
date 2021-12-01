import "../css/Portada.css";
import Card from "../components/Card";
import { getAllPerfil } from "../services/perfil";
import React, { useState, useEffect } from "react";

const Portada = () => {
  const [perfiles, setPerfiles] = useState([]);
  // const [error, setError] = useState(false);

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
              <Card perfil={perfil} />
            </div>

          ))}

        </div>
      </div>
    </>
  );
};

export default Portada;
