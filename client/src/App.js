//se importa los paquetes (react, axios y la hoja de estilos css)
import './App.css';
import { useState } from 'react';
import Axios from 'axios';


//se crea un nombre de estado para cada variable diferente asignandoles valores vacios
//para luego almacenar valores correspondientes
function App() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState(0);
  const [lugarn, setLugarN] = useState("");
  const [fechan, setFechaN] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [mensaje, setMensaje] = useState(""); // Agrega estado para el mensaje


  //en esta funcion add si algun campo está sin completar dará el mensaje predefinido, sino, continuará la acción.
  const add = () => {
    if (!nombre || !apellido || !correo || !telefono || !edad || !lugarn || !fechan || !identificacion) {
      setMensaje("Por favor, complete todos los campos");
      return;
    }

    //se usa la biblioteca axios para escuchar la ruta definida y usando el método .post envia la solicitud a la funcion de devolucion siguiente
    Axios.post('http://localhost:5000/create', {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      telefono: telefono,
      edad: edad,
      lugarn: lugarn,
      fechan: fechan,
      identificacion: identificacion
      //actualiaza las variables de estado luego de que se realiza la solicitud correctamente 
    }).then(response => {
      setMensaje("Datos enviados correctamente");
      setNombre("");
      setApellido("");
      setCorreo("");
      setTelefono("");
      setEdad("");
      setLugarN("");
      setFechaN("");
      setIdentificacion("");
      //si no se realiza correactamente se mostrará el mensaje de error en pantalla y consola
    }).catch(error => {
      setMensaje("Hubo un error al enviar los datos. Por favor, inténtelo de nuevo más tarde.");
      console.error('Error:', error);
    });
  };
  

  //se define varios elementos de entrada dandoles un valor, tipo y evento. Así como tambien un boton de envio del formulario.
  return (
    <div className="App">
      <div className="datos">
        <label>Nombre: <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} /></label><br />
        <label>Apellido: <input type="text" value={apellido} onChange={(event) => setApellido(event.target.value)} /></label><br />
        <label>Correo: <input type="text" value={correo} onChange={(event) => setCorreo(event.target.value)} /></label><br />
        <label>Teléfono: <input type="number" value={telefono} onChange={(event) => setTelefono(event.target.value)} /></label><br />
        <label>Edad: <input type="number" value={edad} onChange={(event) => setEdad(event.target.value)} /></label><br />
        <label>Lugar de Nacimiento: <input type="text" value={lugarn} onChange={(event) => setLugarN(event.target.value)} /></label><br />
        <label>Fecha de Nacimiento: <input type="text" value={fechan} onChange={(event) => setFechaN(event.target.value)} /></label><br />
        <label>Identificación: <input type="text" value={identificacion} onChange={(event) => setIdentificacion(event.target.value)} /></label><br />
        <button className="button" onClick={add}>Enviar</button>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );
}

export default App;
