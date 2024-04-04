//se importa las bibliotecas 
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//utiliza el paquete mysql para conectar se una base de datos con los atributos determinados 
const db = mysql.createConnection({
    host: '172.30.87.19',
    user: 'poe', 
    password: 'Colombia123**', 
    database: 'usuarios'
});
//el metodo db.connect es utilizado para realizar la coneccion a la base de dato, en caso de un error se toma el argumento err en caso de una conexion vacia o nula
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully');
});
//define una ruta usando express para manejar una peticion para crear una ruta /create 
//usa dos argumentos. Request: para la solicitud entrante y Response: para la respuesta
app.post('/create', (request, response) => {
    const { nombre, apellido, correo, telefono, edad, lugarn, fechan, identificacion } = request.body;

    //si hay algun valor vacio se dará el mensaje determinado, sino, se continuara normalmente.
    if (!nombre || !apellido || !correo || !telefono || !edad || !lugarn || !fechan || !identificacion) {
        return response.status(400).json({ message: "Por favor, complete todos los campos" });
    }
    //crea un query SQL que inserta en la tabla users los valores recibidos por post
    const query = 'INSERT INTO usuarios (nombre, apellido, correo, telefono, edad, lugarn, fechan, identificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, apellido, correo, telefono, edad, lugarn, fechan, identificacion], (err, result) => {
        //si la consulta es exitosa, devuelve un json con un mensaje de confirmacion, sino el mensaje de error
        if (err) {
            console.error('Error inserting into database:', err);
            return response.status(500).json({ message: "Hubo un error al crear el usuario" });
        }
        
        console.log('Usuario creado correctamente');
        return response.status(200).json({ message: "Usuario creado correctamente" });
    });
});
//se escucha el puerto 3001
app.listen(5001, () => {
    console.log(`Server is running on port 5001`);
});
