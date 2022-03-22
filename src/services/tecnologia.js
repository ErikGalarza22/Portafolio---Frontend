import axios from "axios";

export const getAllTecnologias = () => {
  return axios
    .get(`http://localhost:5000/api/tecnologia/listar`)
    .then((tecnologia) => {
      console.log(tecnologia);
      return tecnologia;
    });
};

export const getTechFront = () => {
  return axios
    .get(`http://localhost:5000/api/tecnologia/tecnologias-frontend`)
    .then((tecnologia) => {
      console.log(tecnologia);
      return tecnologia;
    });
};
export const getTechBack = () => {
  return axios
    .get(`http://localhost:5000/api/tecnologia/tecnologias-backend`)
    .then((tecnologia) => {
      console.log(tecnologia);
      return tecnologia;
    });
};
export const getTechDB = () => {
  return axios
    .get(`http://localhost:5000/api/tecnologia/tecnologias-database`)
    .then((tecnologia) => {
      console.log(tecnologia);
      return tecnologia;
    });
};

export const postTecnologia = (tecnologia) => {
  return axios.post(`http://localhost:5000/api/tecnologia/crear`, tecnologia);
};

export const deleteTecnologia = (id) =>{
  return axios.delete(`http://localhost:5000/api/tecnologia/eliminar/`+id);
}

export const updateTecnologia = (tecnologia,idTec)=>{
  return axios.put(`http://localhost:5000/api/tecnologia/editar/${idTec}`,tecnologia);  
}
