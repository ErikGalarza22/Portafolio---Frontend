import { getAllProyectos, postProyecto } from "../../services/proyecto"
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getAllCategorias } from "../../services/categoria";
import { useEffect, useState } from "react";

const ListadoProyectos = () => {
  const [proyectos, setProyecto] = useState([]);

  /* variables para los modales   */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
/* variables para los campos del formulario y los estados de la pagina */
  const [values, setValues] = useState({
    nombre: "",
    descripcion: "",
    enlace: "",
    categoria: "",
    foto: "",
    categorias: [],
    loading: false,
    error: "",
    formData: "",
    // createdVideogame: '',
    // redirectToProfile: false,
  });

  const {
    nombre,
    descripcion,
    enlace,
    categoria,
    foto,
    categorias,
    loading,
    error,
    // createdVideogame,
    // redirectToProfile,
    formData,
  } = values;

  const loadProyectos = () => {
    getAllProyectos()
      .then((proyectos) => {
        setProyecto(proyectos.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const loadCategorias = () => {
    getAllCategorias().then((data) => {
      if (data.error) {
        console.log("error al cargar la data de categorias");
        setValues({ ...values, error: data.error });
      } else {
        console.log("cargando categorias ");
        console.log(data);
        setValues({
          ...values,
          categorias: data.data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    loadCategorias();
    loadProyectos();
  }, []);

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
    postProyecto(formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          nombre: "",
          descripcion: "",
          foto: "",
          enlace: "",
          loading: false,
          // createdVideogame: data.name
        });
        //generamos un modal de notificaciones
        Swal.fire({
          title: "Agregar proyecto",
          text: "Proyecto agregado con exito!",
          icon: "success",
          timer: 3000,
          // confirmButtonText: 'Aceptar'
        });
        //recargamos los cambios
        loadProyectos();
        //escondemos el modal de ingreso de proyecto
        setShow(false);
      }
    });
  };

  return (
    <>
      <div className="contenedor-superior">
        <a className="btn btn-success my-2 mx-2" onClick={handleShow}>
          Agregar proyecto
        </a>
      </div>
      <div className="contenedor-form">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Enlace</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((pro, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <img
                    alt="img-proyecto"
                    style={{ maxWidth: "100px" }}
                    src={`http://localhost:5000/api/proyecto/foto/${pro._id}`}
                  />
                </td>
                <td>{pro.nombre}</td>
                <td>{pro.descripcion}</td>
                <td><a style={{textDecoration:'none'}} href={pro.enlace}>{pro.enlace}</a></td>
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
          <Modal.Title>Agregar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="text-muted">Categoría</label>
            <select
              onChange={handleChange("categoria")}
              type="text"
              className="form-control"
            >
              <option>Seleccione una categoría</option>
              {categorias.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              onChange={handleChange("nombre")}
              type="text"
              placeholder="Ingrese el nombre del proyecto"
            />
          </div>
          <div className="form-group">
            <label>Enlace</label>
            <input
              className="form-control"
              onChange={handleChange("enlace")}
              type="text"
              placeholder="Ingrese el enlace del proyecto"
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
    </>
  );
};

export default ListadoProyectos;
