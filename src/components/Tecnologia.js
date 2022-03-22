import { useState, useEffect } from "react";
import { getAllTecnologias} from "../services/tecnologia";
import TecnologiaFront from '../components/TecnologiaFront';
import TecnologiaBack from '../components/TecnologiaBack';
import TecnologiaDB from '../components/TecnologiaDB';
import Etiqueta from '../components/Etiqueta'
import "../css/Tecnologia.css";

const Tecnologia = () => {
  const [tecnologias, setTecnologia] = useState([]);

  const loadTecnologias = () => {
    getAllTecnologias()
      .then((tecnologias) => {
        console.log(tecnologias);
        setTecnologia(tecnologias.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    loadTecnologias();
  }, []);

  return (
    <>
      <div className="container-fluid fondoTecnologias">
        <div className="contenedor-tecnologias">

          <div className="seccion" id="front">
          <Etiqueta palabra="Frontend" />
          <TecnologiaFront/>
          </div>
         
   <div className="seccion" id="back">
          <Etiqueta palabra="Backend" />
          <TecnologiaBack/>
         </div>
         
         <div className="seccion" id="db">
          <Etiqueta palabra="Database" />
          <TecnologiaDB/>
       </div>

      </div>
      </div>
    </>
  );
};

export default Tecnologia;
