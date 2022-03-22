import React ,{useState, useEffect}from 'react';
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getAllTecnologias, postTecnologia,deleteTecnologia, updateTecnologia } from '../../services/tecnologia';
import '../../css/Tecnologia.css'


const ListadoTecnologias = () => {

    const [tecnologias, setTecnologias] = useState([]) 
     /* variables para los modales   */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  /* variables para los campos del formulario y los estados de la pagina */
  const [values, setValues] = useState({
    nombre: "",
    tipo: "",
    foto: "",
    loading: false,
    error: "",
    idTec:0,
    formData: "",
    formData2: "",
    url:"",
    idTecno:0,
    // createdVideogame: '',
    // redirectToProfile: false,
  });

  const {
    nombre,
    foto,
    tipo,
    loading,
    error,
    idTec,
    idTecno,
    url,
    formData,
    formData2,
  } = values;


    const getTecnologias = ()=>{
        getAllTecnologias().then(data=>{
            setTecnologias(data.data);
        }).catch(err=>{
            console.log(err.message)
        })
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

 

  const eliminarTecnologia= (tecnologia)=>{
    Swal.fire({
        title: "Eliminar tecnología ",
        text: "¿Está seguro de eliminar tecnología "+tecnologia.nombre+"?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
      if(resultado.value){
        deleteTecnologia(tecnologia._id);
        Swal.fire({text:'Tecnología eliminada', icon:'success', timer:3000});
        getTecnologias();
      }else{
        Swal.fire({text:'La categoría no fue eliminada', icon:'info', timer:2000})
      }
        } 
    );
  }

    //se envia la forma y se inicializa nuevamente el estado de las variables



    const clickSubmit = (event) => {
      event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        postTecnologia(formData).then( data => {
            setValues({
              ...values,
              nombre: '',
              foto:'',
              url:'',
              tipo: '',
              loading: false,
            });
            Swal.fire({
              title: "Agregar tecnología",
              text: "Tecnología agregada con exito!",
              icon: "success",
              timer: 3000,
              // confirmButtonText: 'Aceptar'
            });
            //recargamos los cambios
           
            //escondemos el modal de ingreso de proyecto
            setShow(false);
            getTecnologias();
          }).catch(error=>{
            setValues({loading:false});
            Swal.fire({
              title:'Error al agregar la tecnología',
              text:'La tecnología no pudo ser agregada',
              icon:'info',
              timer:2000
            });
            console.log(error.message);
          });
        // getTecnologias();
      };

      const clickSubmitEdit = (idTecno) => (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        console.log(formData2.get('nombre'));
        updateTecnologia(formData2,idTecno).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
        
            setValues({
              ...values,
              nombre: "",
              foto: "",
              tipo: "",
              loading: false,
            });
            Swal.fire({
              title: "Editar tecnología",
              text: "Tecnología editada con exito!",
              icon: "success",
              timer: 3000,
            });
            
            //escondemos el modal de edicion de tecnologia
            setShow2(false);
            // window.location.reload(false);
            getTecnologias();
          }
        });
      };

      const showLoading = () =>
      loading && (
        <div className='alert alert-success'>
          <h2>Loading ...</h2>
        </div>
      )

      const cargarDatos=(tec)=>{
        console.log(tec);
          setValues({...values, nombre:tec.nombre, tipo: tec.tipo, idTec:tec._id, url:tec.url});
        handleShow2();
      }

    useEffect(()=>{
        setValues({ ...values, formData: new FormData() ,formData2: new FormData() });
        getTecnologias();
    },[])

    return (  
    <>
    {showLoading()}
     <div className="contenedor-superior text-center">
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
         
            {tecnologias.length>0 ? tecnologias.map((tec, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    alt="img-tecnologia"
                    style={{ maxWidth: "100px" }}
                     src={tec.url}
                  />
                </td>
                <td>{tec.nombre}</td>
                <td>{tec.tipo===1?"frontend":
                     tec.tipo===2?"backend":"base de datos"}</td>
                <td>
                  <a onClick={()=>cargarDatos(tec)} className="btn btn-warning mx-1">Editar</a>
                  <a onClick={()=>eliminarTecnologia(tec)}  className="btn btn-danger">Eliminar</a>
                </td>
              </tr>
            )) : (<p id="info-table-tecnologias">No hay registros</p>)}
          </tbody>
        </table>
      </div>

 {/* MODAL PARA CREAR LA TECNOLOGIA */}
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
              required
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
              required
            />
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
            <label className="text-muted">Categoría</label>
            <select
              onChange={handleChangeEdit("tipo")}
              className="form-control" 
              value={tipo}
              required
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
              value={nombre}
              onChange={handleChangeEdit("nombre")}
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
        <Button variant="primary" onClick={(handleClose2, clickSubmitEdit(idTec))}>
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
 
export default ListadoTecnologias;
