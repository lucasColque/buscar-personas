import React,{useState, useEffect} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

//Las peticiones son asincronas asi que hay que indicarlo
  const peticiones = async() =>{
    await axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      setUsuarios(response.data);
      setTablaUsuarios(response.data);
    })
    .catch(err => console.log(err))
  }
  useEffect(()=>{
    peticiones();
  },[])

  const handleChange = e =>{
    setBusqueda(e.target.value)
    filtrar(e.target.value);
  }
  const filtrar = terminoBusqueda =>{

    let resultadoBusqueda = tablaUsuarios.filter(elemento =>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ||
      elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      }
    })
    setUsuarios(resultadoBusqueda);
  }

  return (
    <div className="App">
      <div className="containerInput">
        <input
        className="form-control inputBuscar" 
        type="text" 
        value={busqueda}
        onChange={handleChange}
        placeholder="Búsqueda por Nombre"
        />
        <button 
        className="btn btn-success"
        >
          Buscar
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Nombre de usuario</th>
              <th>Correo</th>
              <th>Sitio web</th>
              <th>Ciudad</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios && 
              usuarios.map(usuario => 
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.name}</td>
                  <td>{usuario.phone}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.website}</td>
                  <td>{usuario.address.city}</td>
                  <td>{usuario.company.name}</td>
                </tr>)
            }
          </tbody>
        </table>
        {usuarios.length === 0 && <h3 style={{textAlign:"center"}}> El usuario no ha sido encontrado </h3>}
      </div>
    </div>
  );
}

export default App;
