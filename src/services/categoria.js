import axios from 'axios'

export const getAllCategorias=()=>{
    return  axios.get(`http://localhost:5000/api/categoria/listar`)
    .then(categoria=>{
        console.log(categoria)
        return categoria
    })
}

export const postCategoria = (categoria) => {
    return axios.post(`http://localhost:5000/api/categoria/crear`, categoria);
  };

  
export const updateCategoria = (categoria,idCat)=>{
    return axios.put(`http://localhost:5000/api/categoria/editar/${idCat}`,categoria);  
  }

  
export const deleteCategoria = (id) =>{
    return axios.delete(`http://localhost:5000/api/categoria/eliminar/`+id);
  }


