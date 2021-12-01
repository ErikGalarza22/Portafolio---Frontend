import React ,{useState, useEffect}from 'react';
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getAllTecnologias, postTecnologia } from '../../services/tecnologia';



const ListadoTecnologias = () => {

    const [tecnologias, setTecnologias] = useState([]) 
     /* variables para los modales   */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* variables para los campos del formulario y los estados de la pagina */
  const [values, setValues] = useState({
    nombre: "",
    tipo: "",
    foto: "",
    loading: false,
    error: "",
    formData: "",
    // createdVideogame: '',
    // redirectToProfile: false,
  });

  const {
    nombre,
    foto,
    tipo,
    loading,
    error,
    // createdVideogame,
    // redirectToProfile,
    formData,
  } = values;


    const getTecnologias = ()=>{
        getAllTecnologias().then(data=>{
            console.log('estas son las tecnologias '+data.data)
            setTecnologias(data.data);
        }).catch(err=>{
            console.log(err.message)
        })
    }

     // lector de campos input de modal agregar proyecto
  const handleChange = (name) => (event) => {
    const value = name === "foto" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

    //se envia la forma y se inicializa nuevamente el estado de las variables
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        postTecnologia(formData).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              nombre: "",
              foto: "",
              tipo: "",
              loading: false,
              // createdVideogame: data.name
            });
            //generamos un modal de notificaciones
            Swal.fire({
              title: "Agregar tecnología",
              text: "Tecnología agregada con exito!",
              icon: "success",
              timer: 3000,
              // confirmButtonText: 'Aceptar'
            });
            //recargamos los cambios
            getTecnologias();
            //escondemos el modal de ingreso de proyecto
            setShow(false);
          }
        });
      };

    useEffect(()=>{
        setValues({ ...values, formData: new FormData() });
        getTecnologias();
    },[])

    return (  
    <>
     <div className="contenedor-superior">
        <a className="btn btn-success my-2 mx-2"
         onClick={handleShow}
         >
          Agregar tecnología
        </a>
      </div>
      <div className="contenedor-form">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {tecnologias.map((tec, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <img
                    alt="img-tecnologia"
                    style={{ maxWidth: "100px" }}
                    src={`http://localhost:5000/api/tecnologia/foto/${tec._id}`}
                  />
                </td>
                <td>{tec.nombre}</td>
                <td>{tec.tipo===1?"frontend":
                     tec.tipo===2?"backend":"base de datos"}</td>
                <td>
                  <a className="btn btn-warning mx-1">Editar</a>
                  <a className="btn btn-danger">Eliminar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar tecnología</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="text-muted">Categoría</label>
            <select
              onChange={handleChange("tipo")}
              type="text"
              className="form-control"
            >
              <option>Seleccione un tipo</option>
              <option value="1">Frontend</option>
              <option value="2">Backend</option>
              <option value="3">Base de datos</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              onChange={handleChange("nombre")}
              type="text"
              placeholder="Ingrese el nombre de la tecnología"
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

    </>
    );
}
 
export default ListadoTecnologias;
