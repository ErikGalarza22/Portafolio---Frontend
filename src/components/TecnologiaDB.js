import { useState, useEffect } from "react";
import {getTechDB} from "../services/tecnologia";
import "../css/Tecnologia.css";

const TecnologiaDB = () => {
  const [tecnologias, setTecnologia] = useState([]);
 
  const styles={
    maxWidth:"100%"
}

  const loadTecnologias = () => {

    getTechDB()
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
    <>          {tecnologias.map((tf, i) => (
            <div  key={i}>
              <div className="imagen">
              <img style={styles} src={tf.url} title={tf.nombre} alt={tf.nombre} /></div>
            </div>
          ))}

    </>
  );
};

export default TecnologiaDB;
