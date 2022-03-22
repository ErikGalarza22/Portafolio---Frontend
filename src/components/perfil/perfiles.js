import React, {useEffect, useState } from 'react';
import {getAllPerfil, postPerfil, deletePerfil} from '../../services/perfil'
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ListadoPerfiles = () => {

    const [perfiles, setPerfiles] = useState([]);
    const [perfilSeleccionado, setPerfilSeleccionado]=useState({
        nombre2:'',
        correo2:'',
        foto2:'',
        telefono2:'',
    especialidad2:'',
    descripcion2:'',
    })
    
  /* variables para los modales   */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 /* variables para el modal de editar   */
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

/* variables para los campos del formulario y los estados de la pagina */
  const [values, setValues] = useState({
    nombre: "",
    correo: "",
    foto: "",
    telefono: "",
    especialidad:"",
    descripcion:"",
    loading: false,
    error: "",
    formData: "",
    // createdVideogame: '',
    // redirectToProfile: false,
  });

  const {nombre2,correo2,foto2,telefono2,especialidad2,descripcion2} = perfilSeleccionado;

  const {
    nombre,
    correo,
    foto,
    telefono,
    especialidad,
    descripcion,
    loading,
    error,
    // createdVideogame,
    // redirectToProfile,
    formData,
  } = values;

  const getPerfiles = () =>{
      getAllPerfil().then(data=>{
          setPerfiles(data.data);
      }).catch(err=>{
          console.log(err.message)
      })
  }
 // lector de campos input de modal agregar perfil
 const handleChange = (name) => (event) => {
    const value = name === "foto" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

    //se envia la forma y se inicializa nuevamente el estado de las variables
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        postPerfil(formData).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              nombre: "",
              correo: "",
              foto: "",
              telefono: "",
              especialidad:"",
              descripcion: "",
              loading: false,
              // createdVideogame: data.name
            });
            //generamos un modal de notificaciones
            Swal.fire({
              title: "Agregar Perfil",
              text: "Perfil agregado con exito!",
              icon: "success",
              timer: 3000,
              // confirmButtonText: 'Aceptar'
            });
            //recargamos los cambios
         getPerfiles();
            //escondemos el modal de ingreso de proyecto
            setShow(false);
          }
        });
      };

      const onDelete = (idPerfil, nombre) =>{
        Swal
        .fire({
            title: "Eliminar perfil ",
            text: `¿Está seguro de eliminar el perfil de ${nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
               deletePerfil(idPerfil);
              Swal.fire({text:'Perfil eliminado', icon:'success', timer:3000})
              getPerfiles();
            } 
        });
      }

      const onEdit = (perfil) =>{
          console.log('este es el perfil')
          console.log(perfil)
        setPerfilSeleccionado({...perfilSeleccionado,
            nombre2:perfil.nombre,
            correo2:perfil.correo,
            foto2:perfil.foto,
            telefono2:perfil.telefono,
            especialidad2:perfil.especialidad,
            descripcion2:perfil.descripcion
        });
        console.log('Esta en funcion onEdit')
        console.log(perfilSeleccionado)
      }

      const editarPerfil = ()=>{
          console.log('perfil editado')
      }

    useEffect(()=>{
setValues({...values, formData:new FormData()});
getPerfiles();
    },[])

    return ( 
        <>
          <div className="contenedor-superior">
        <a className="btn btn-success my-2 mx-2" onClick={handleShow}>
          Agregar perfil
        </a>
      </div>
      <div className="contenedor-form">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Especialidad</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Descripción</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {perfiles.map((per, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <img
                    alt="img-proyecto"
                    style={{ maxWidth: "100px" }}
                    src={`http://localhost:5000/api/perfil/foto/${per._id}`}
                  />
                </td>
                <td>{per.nombre}</td>
                <td>{per.correo}</td>
                <td>{per.especialidad}</td>
                <td>{per.telefono}</td>
                <td>{per.descripcion}</td>
                <td>
                  <a className="btn btn-warning mx-1" onClick={()=>onEdit(per), handleShow2}>Editar</a>
                  <a className="btn btn-danger" onClick={()=>onDelete(per._id, per.nombre) }>Eliminar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Hola{perfilSeleccionado.nombre2}</h2>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              onChange={handleChange("nombre")}
              type="text"
              placeholder="Ingrese el nombre"
            />
          </div>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              className="form-control"
              onChange={handleChange("correo")}
              type="text"
              placeholder="Ingrese el correo"
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              className="form-control"
              onChange={handleChange("telefono")}
              type="text"
              placeholder="Ingrese el telefono"
            />
          </div>
          <div className="form-group">
            <label>Especialidad</label>
            <input
              className="form-control"
              onChange={handleChange("especialidad")}
              type="text"
              placeholder="Ingrese una especialidad"
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              className="form-control"
              onChange={handleChange("descripcion")}
              type="text"
              placeholder="Ingrese la descripción del proyecto"
            />
          </div>
          <label>Foto</label>
          <div className="form-group my-2">
            <input
              onChange={handleChange("foto")}
              type="file"
              name="foto"
              accept="image/*"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={(handleClose, clickSubmit)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              onChange={handleChange("nombre")}
              type="text"
              value={perfilSeleccionado.nombre}
              placeholder="Ingrese el nombre"
            />
          </div>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              className="form-control"
              onChange={handleChange("correo")}
              type="text"
              value={perfilSeleccionado.correo}
              placeholder="Ingrese el correo"
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              className="form-control"
              onChange={handleChange("telefono")}
              type="text"
              value={perfilSeleccionado.telefono}
              placeholder="Ingrese el telefono"
            />
          </div>
          <div className="form-group">
            <label>Especialidad</label>
            <input
              className="form-control"
              onChange={handleChange("especialidad")}
              type="text"
              value={perfilSeleccionado.especialidad}
              placeholder="Ingrese una especialidad"
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              className="form-control"
              onChange={handleChange("descripcion")}
              type="text"
              value={perfilSeleccionado.descripcion}
              placeholder="Ingrese la descripción del proyecto"
            />
          </div>
          <label>Foto</label>
          <div className="form-group my-2">
            <input
              onChange={handleChange("foto")}
              type="file"
              name="foto"
              accept="image/*"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={(handleClose2, editarPerfil)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

        </>
     );
}
 
export default ListadoPerfiles;
