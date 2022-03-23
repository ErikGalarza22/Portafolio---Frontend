import React ,{useState, useEffect}from 'react';
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getAllProyectos,postProyecto, updateProyecto, deleteProyecto} from '../../services/proyecto';
import { getAllCategorias} from '../../services/categoria';
import '../../css/Tecnologia.css'


const ListadoProyectos = () => {

    const [proyectos, setProyectos] = useState([]) 
     /* variables para los modales   */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors,setErrors] = useState({}); // almacenara los errores de campos vacios
  const [existError, setExistError] = useState(false);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  /* variables para los campos del formulario y los estados de la pagina */
  const [values, setValues] = useState({
    nombre: "",
    url:"",
    categoria:"",
    enlace:"",
    descripcion:"",
    loading: false,
    error: "",
    formData:  new FormData(),
    formData2: new FormData(),
    idPro : 0,
    categorias:[]
  });

  const {
    nombre,
    enlace,
    url,
    descripcion,
    loading,
    formData,
    formData2,
    idPro,
    categoria,
    categorias,
  } = values;


    const getProyectos = ()=>{
        getAllProyectos().then(data=>{
          setProyectos(data.data);
          console.log("Los proyectos son");
          console.log(data.data);
        }).catch(err=>{
            console.log(err.message)
        })
    }

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
            formData2: new FormData(),
          });
        }
      });
    };

    const validationFields=(valores)=>{
      let errores = {};

      if(!valores.nombre){
        errores.nombre="El campo nombre es obligatorio";
        setExistError(true);
        setErrors(errores);
      } else{
        setExistError(false);
      }

      if(!valores.enlace){
        errores.enlace="El campo enlace es obligatorio";
        setExistError(true);
        setErrors(errores);
      } else{
        setExistError(false);
      }
    }

    const handleBlur = (e)=>{
        validationFields(values);
    }

    const handleChangeEdit = (name) => (event) => {
      const value = name === "foto" ? event.target.files[0] : event.target.value;
      formData2.set(name, value);
      console.log(formData2);
      setValues({ ...values, [name]: value });
    };

     // lector de campos input de modal agregar proyecto
  const handleChange = (name) => (event) => {
    const value = name === "foto" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    console.log(FormData);
    setValues({ ...values, [name]: value });
  };

 

  const eliminarProyecto= (proyectoSeleccionado)=>{
    Swal.fire({
        title: "Eliminar tecnología ",
        text: "¿Está seguro de eliminar el proyecto "+proyectoSeleccionado.nombre+"?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
      if(resultado.value){
        deleteProyecto(proyectoSeleccionado._id);
        Swal.fire({text:'Proyecto eliminado', icon:'success', timer:3000});
        getProyectos();
      }else{
        Swal.fire({text:'El proyecto no fue eliminado', icon:'info', timer:2000})
      }
        } 
    );
  }

    //se envia la forma y se inicializa nuevamente el estado de las variables
    const clickSubmit = (event) => {
        console.log(formData.get('nombre'));
      if(!existError){
        event.preventDefault();
          setValues({ ...values, error: "", loading: true });
          postProyecto(formData).then( data => {
              setValues({
                ...values,
                nombre: '',
                enlace:'',
                descripcion:'',
                url:'',
                categoria:'',
                loading: false,
              });
              Swal.fire({
                title: "Agregar proyecto",
                text: "Proyecto agregado con exito!",
                icon: "success",
                timer: 3000,
              });
             
             
              //escondemos el modal de ingreso de proyecto
              setShow(false);
              getProyectos();
            }).catch(error=>{
              setValues({loading:false});
              Swal.fire({
                title:'Error al agregar el proyecto',
                text:'El proyecto no pudo ser agregado',
                icon:'info',
                timer:2000
              });
              console.log(error.message);
            });
         
          setErrors({});
      }//fin if exist error
      };

      const clickSubmitEdit = (idTecno) => (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        console.log(formData2.get('nombre'));
        updateProyecto(formData2,idTecno).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
        
            setValues({
              ...values,
              nombre: "",
              enlace:"",
              descripcion:"",
              url:"",
              categoria:"",
              loading: false,
            });
            Swal.fire({
              title: "Editar proyecto",
              text: "Proyecto editado con exito!",
              icon: "success",
              timer: 3000,
            });
            
            //escondemos el modal de edicion de tecnologia
            setShow2(false);
            // window.location.reload(false);
            getProyectos();
          }
        });
      };

      const showLoading = () =>
      loading && (
        <div className='alert alert-success'>
          <h2>Loading ...</h2>
        </div>
      )

      const cargarDatos=(pro)=>{
        console.log(pro);
          setValues({...values, nombre:pro.nombre, url:pro.url, enlace:pro.enlace, descripcion:pro.descripcion, categoria:pro.categoria, idPro:pro._id});
        handleShow2();
      }

    useEffect(()=>{
        setValues({ ...values, formData: new FormData() ,formData2: new FormData() });
        getProyectos();
        loadCategorias();
    },[])

    return (  
    <>
    {showLoading()}
     <div className="contenedor-superior text-center">
        <a className="btn btn-success my-2 mx-2"
         onClick={handleShow}
         >
          Agregar Proyecto
        </a>
      </div>
      <div className="contenedor-form">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">Enlace</th>
              <th scope="col">Descripción</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
         
            {proyectos.length>0 ? proyectos.map((pro, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    alt="img-tecnologia"
                    style={{ maxWidth: "100px" }}
                     src={pro.url}
                  />
                </td>
                <td>{pro.nombre}</td>
                <td>{pro.enlace}</td>
                <td>{pro.descripcion}</td>
                <td>
                  <a onClick={()=>cargarDatos(pro)} className="btn btn-warning mx-1">Editar</a>
                  <a onClick={()=>eliminarProyecto(pro)}  className="btn btn-danger">Eliminar</a>
                </td>
              </tr>
            )) : (<p id="info-table-tecnologias">No hay registros</p>)}
          </tbody>
        </table>
      </div>

 {/* MODAL PARA CREAR EL PROYECTO */}
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

          <label>Foto</label>
          <div className="form-group my-2">
            <input
              onChange={handleChange("foto")}
              type="file"
              name="foto"
              accept="image/*"
              required
              onClick={e => (e.target.value = null)}
            />
          </div>


          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              onBlur={handleBlur}
              onChange={handleChange("nombre")}
              type="text"
              placeholder="Ingrese el nombre de la categoría"
              required
            />
          </div>
          {errors.nombre && (<p style={{color:'red', fontWeight:'bold'}}>El nombre es requerido</p>)}

          <div className="form-group">
            <label>Enlace del proyecto</label>
            <input
              className="form-control"
              onBlur={handleBlur}
              onChange={handleChange("enlace")}
              type="text"
              placeholder="Ingrese el enlace del proyecto"
              required
            />
          </div>
          {errors.enlace && (<p style={{color:'red', fontWeight:'bold'}}>El enlace es requerido</p>)}

          <div className="form-group">
            <label>Descripción del proyecto</label>
            <input
              className="form-control"
              onBlur={handleBlur}
              onChange={handleChange("descripcion")}
              type="text"
              placeholder="Ingrese la descripción del proyecto"
              required
            />
          </div>
          {errors.enlace && (<p style={{color:'red', fontWeight:'bold'}}>La descripción es requerida</p>)}



        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={(handleClose, clickSubmit)}>
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
       
        </Modal.Footer>
      </Modal>

      {/* MODAL PARA EDITAR LA TECNOLOGIA */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tecnología</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              value={nombre}
              onChange={handleChangeEdit("nombre")}
              type="text"
              placeholder=""
              required
            />
          </div>

          
          <div className="form-group">
            <label>Enlace</label>
            <input
              className="form-control"
              value={enlace}
              onChange={handleChangeEdit("enlace")}
              type="text"
              placeholder=""
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <input
              className="form-control"
              value={descripcion}
              onChange={handleChangeEdit("descripcion")}
              type="text"
              placeholder=""
              required
            />
          </div>

        

          <label>Foto actual</label>
          <img
                    alt="img-tecnologia"
                    style={{ maxWidth: "100px" }}
                     src={url}
                  />
          <div className="form-group my-2">
            <input
              onChange={handleChangeEdit("foto")}
              type="file"
              name="foto"
              accept="image/*"
              required
            />
          </div>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={(handleClose2, clickSubmitEdit(idPro))}>
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Cerrar
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
    );
}
 
export default ListadoProyectos;
