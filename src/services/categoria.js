import axios from 'axios'

export const getAllCategorias=()=>{
    return  axios.get(`http://localhost:5000/api/categoria/listar`)
    .then(categoria=>{
        console.log(categoria)
        return categoria
    })
}