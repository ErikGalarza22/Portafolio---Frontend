
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Inicio from './pages/Inicio'
import Proyectos from './pages/Proyectos'
import Header from './templates/header';
import Dashboard from './pages/Dashboard'
import ListadoProyectos from './components/proyecto/proyectos';
import ListadoTecnologias from './components/tecnologia/tecnologias';
import ListadoCategorias from './components/categoria/categorias';
import ListadoPerfiles from './components/perfil/perfiles';

function App(props){
  return (
    <>
    <Header/>
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Inicio}  />
      <Route path="/proyectos" exact component={Proyectos} />
      <Route path="/dashboard" exact component={Dashboard}/>
      <Route path="/ver-proyectos" exact component = {ListadoProyectos}/>
      <Route path="/ver-tecnologias" exact component = {ListadoTecnologias} />
      <Route path="/ver-categorias" exact component = {ListadoCategorias} />
      
      <Route path="/ver-perfiles" exact component = {ListadoPerfiles}/>
     
    </Switch>
    </BrowserRouter>
    {/* <Inicio nombre='Andres' apellido={props.apellido}/> */}
    </>
  );
}

export default App;
