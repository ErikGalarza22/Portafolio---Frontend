import React ,{useState, useEffect}from 'react';
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getAllCategorias, postCategoria, updateCategoria, deleteCategoria} from '../../services/categoria';
import '../../css/Tecnologia.css'


const ListadoCategorias = () => {

    const [categorias, setCategorias] = useState([]) 
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
    loading: false,
    error: "",
    formData: "",
    formData2: "",
    idCat : 0,
  });

  const {
    nombre,
    loading,
    error,
    formData,
    formData2,
    idCat,
  } = values;


    const getCategorias = ()=>{
        getAllCategorias().then(data=>{
            setCategorias(data.data);
        }).catch(err=>{
            console.log(err.message)
        })
    }

    const validationFields=(valores)=>{
      let errores = {};

      if(!valores.nombre){
        errores.nombre="El campo nombre es obligatorio";
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

 

  const eliminarCategoria= (categoriaSeleccionada)=>{
    Swal.fire({
        title: "Eliminar tecnología ",
        text: "¿Está seguro de eliminar categoría "+categoriaSeleccionada.nombre+"?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
      if(resultado.value){
        deleteCategoria(categoriaSeleccionada._id);
        Swal.fire({text:'Categoría eliminada', icon:'success', timer:3000});
        getCategorias();
      }else{
        Swal.fire({text:'La categoría no fue eliminada', icon:'info', timer:2000})
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
          postCategoria(formData).then( data => {
              setValues({
                ...values,
                nombre: '',
                loading: false,
              });
              Swal.fire({
                title: "Agregar categoría",
                text: "Categoría agregada con exito!",
                icon: "success",
                timer: 3000,
              });
             
             
              //escondemos el modal de ingreso de proyecto
              setShow(false);
              getCategorias();
            }).catch(error=>{
              setValues({loading:false});
              Swal.fire({
                title:'Error al agregar la categoría',
                text:'La categoría no pudo ser agregada',
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
        updateCategoria(formData2,idTecno).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
        
            setValues({
              ...values,
              nombre: "",
              loading: false,
            });
            Swal.fire({
              title: "Editar categoría",
              text: "Categoría editada con exito!",
              icon: "success",
              timer: 3000,
            });
            
            //escondemos el modal de edicion de tecnologia
            setShow2(false);
            // window.location.reload(false);
            getCategorias();
          }
        });
      };

      const showLoading = () =>
      loading && (
        <div className='alert alert-success'>
          <h2>Loading ...</h2>
        </div>
      )

      const cargarDatos=(cat)=>{
        console.log(cat);
          setValues({...values, nombre:cat.nombre,  idCat:cat._id});
        handleShow2();
      }

    useEffect(()=>{
        setValues({ ...values, formData: new FormData() ,formData2: new FormData() });
        getCategorias();
    },[])

    return (  
    <>
    {showLoading()}
     <div className="contenedor-superior text-center">
        <a className="btn btn-success my-2 mx-2"
         onClick={handleShow}
         >
          Agregar Categoría
        </a>
      </div>
      <div className="contenedor-form">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
         
            {categorias.length>0 ? categorias.map((cat, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{cat.nombre}</td>
                <td>
                  <a onClick={()=>cargarDatos(cat)} className="btn btn-warning mx-1">Editar</a>
                  <a onClick={()=>eliminarCategoria(cat)}  className="btn btn-danger">Eliminar</a>
                </td>
              </tr>
            )) : (<p id="info-table-tecnologias">No hay registros</p>)}
          </tbody>
        </table>
      </div>

 {/* MODAL PARA CREAR LA CATEGORÍA */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={(handleClose2, clickSubmitEdit(idCat))}>
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
 
export default ListadoCategorias;
