const express = require("express");
const { dbConnection } = require("./database/config");
var cors = require('cors')
require("dotenv").config();

//crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//cors
app.use(cors())

//directorio publico
// middleware: funcion que se ejecuta en el momento en que alguien hace una peticion a mi servidor. funcion que se ejecuta siempre que pase por algun lugar
app.use(express.static("public"));

//lectura y parseo del body
app.use(express.json()); //las peticiones que vengan en formato json() las voy a procesar ahi y extraer su contenido

//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));


//escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
