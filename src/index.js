//Importar bibliotecas

const express = require('express');
const cors  = require('cors');
const mysql = require('musql2/promise');

//Inicializar y configurar Express

const app = express();

app.use(cors());
app.use(express.json());

//Arrancar servidor
const port = 4000;
 app.listen(port, {} => {
    console.log(`Server funcionando en el puerto ${port}`);
 });

//EndPoints

app.get('/', (req, res) => {
    res.send())


//Conexión a la base de datos MySQL