import axios from 'axios'


export const getAllProyectos=()=>{
    return  axios.get(`http://localhost:5000/api/proyecto/listar`)
    .then(proyectos=>{
        console.log(proyectos)
        return proyectos
    })
}

export const postProyecto = (proyecto)=>{
return axios.post(`http://localhost:5000/api/proyecto/crear`, proyecto)
}