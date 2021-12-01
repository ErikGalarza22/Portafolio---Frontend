import axios from 'axios'

export const getAllPerfil=()=>{
    return  axios.get(`http://localhost:5000/api/perfil/listar`)
    .then(perfiles=>{
        console.log(perfiles)
        return perfiles
    })

}

export const getFotoById=(id)=>{
    return axios.get(`http://localhost:5000/api/perfil/foto/${id}`)
    .then(foto=>{
        console.log(foto)
        return foto
    })
}

export const deletePerfil=(id)=>{
    return axios.delete(`http://localhost:5000/api/perfil/eliminar/${id}`)
}

export const postPerfil = (perfil)=>{
    return axios.post(`http://localhost:5000/api/perfil/crear`,perfil)
}