//Importar bibliotecas

const express = require('express');
const cors  = require('cors');
const mysql = require('musql2/promise');
require('dotenv').confg();

//Inicializar y configurar Express

const app = express();

app.use(cors());
app.use(express.json());

//Arrancar servidor
const port = process.env['PORT'];
 app.listen(port, {} => {
    console.log(`Server funcionando en el puerto ${port}`)
 });


// Funciones

async function getConnection() {

    const connectionData = {
        host: process.env.['MYSQL_HOST'],
        port: process.env.['MYSQL_PORT'],
        user: process.env.['MYSQL_USER'],
        password: process.env.['MYSQL_PASSWORD'],
        database: process.env.['MYSQL_DATABASE']
    }

    const connection = await mysql.createConnection(connectionData);

    await connection.connect();

    return connection;
    }

//EndPoints

app.get('/api/weddingmusic/wedding', async (req, res) => {
    //SELECT
    
    // Preparar la sentencia SQL

    const search = !req.query.search ? 
        '%' :
        '%' + req.query.search + '%';

    //Conexión a la base de datos MySQL

    const conn = await getConnection();

    //Lanzamos sentencia SQL

    const [result] = conn.query(`
        SELECT * 
        FROM wedding_music.wedding;`);

    //WHERE spouse_one_name LIKE ?`, [search]

    //Cerramos la conexión
    await conn.end();

    //Respondo

    res.send(result)

});

app.post('/api/weddingmusic/wedding', async (req, res) => {
    //INSERT

    // Preparar la sentencia SQL

    //Conexión a la base de datos MySQL

    const conn = await getConnection();

    //Lanzamos el resultado

    //Respondo

    res.send('{},{}')

});

app.put('/api/weddingmusic/wedding', async (req, res) => {
    //UPDATE

    // Preparar la sentencia SQL

    //Conexión a la base de datos MySQL

    const conn = await getConnection();

    //Lanzamos el resultado

    //Respondo

    res.send('{},{}')

});

app.delete('/api/weddingmusic/wedding', async (req, res) => {
    //DELETE

    // Preparar la sentencia SQL

    //Conexión a la base de datos MySQL

    const conn = await getConnection();

    //Lanzamos el resultado

    //Respondo

    res.send('{},{}')

});


//Conexión a la base de datos MySQL

app.get('/api/weddingmusic/wedding', async (req, res) => {
    //SELECT

    // Preparar la sentencia SQL

    //Conexión a la base de datos MySQL

    const conn = await getConnection();

    //Lanzamos el resultado

    //Respondo

    res.send('{},{}')

});