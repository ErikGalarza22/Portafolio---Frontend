import { useState, useEffect } from "react";
import { getAllTecnologias
  // , getTechFront, getTechBack, getTechDB
 } from "../services/tecnologia";
import Etiqueta from '../components/Etiqueta'
import '../css/Etiqueta.css'
import "../css/Tecnologia.css";

const Tecnologia = () => {
  const [tecnologias, setTecnologia] = useState([]);
  // const [tfs, setTfs] = useState([]);
  // const [tbs, setTbs] = useState([]);
  // const [tbds, setTechDB] = useState([]);
  

  const loadTecnologias = () => {

    // getTechFront().then(tf=>{
    //   console.log(tf.data)
    //   setTfs(tf.data)
    // }).catch(error=>{
    //   console.error(error.message)
    // })

    getAllTecnologias()
      .then((tecnologias) => {
        console.log(tecnologias);
        setTecnologia(tecnologias.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
 

    // getAllTecnologias()
    //   .then((tecnologias) => {
    //     console.log(tecnologias);
    //     setTecnologia(tecnologias.data);
    //   })
    //   .catch((error) => {
    //     console.error(error.message);
    //   });
  };

  useEffect(() => {
    loadTecnologias();
  }, []);

  return (
    <>
      <div className="container-fluid fondoTecnologias">
        <div className="contenedor-tecnologias">

{
tecnologias.length > 0?(
  <div className="contenedor-etiqueta">
<Etiqueta palabra="Frontend, Backend, Database" />
</div>
):(null)
}
          {tecnologias.map((tf, i) => (
            <div className="contenedor-individual" key={i}>
              <div className="imagen"><img alt="img-tecnología" src={`http://localhost:5000/api/tecnologia/foto/${tf._id}`} title={tf.nombre} /></div>
            </div>
          ))}

        
        </div>
      </div>
    </>
  );
};

export default Tecnologia;
