require('dotenv').config();
const express = require('express');
const cors  = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());


console.log('Puerto:', process.env.PORT);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server funcionando en el puerto ${port}`);
});

async function getConnection() {
    const connectionData = {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    };

    const connection = await mysql.createConnection(connectionData);
    await connection.connect();
    return connection;
}

// EndPoints
app.get('/api/weddingmusic/wedding', async (req, res) => {
    
    const search = req.query.search ?
        `%${req.query.search}%` :
        '%';
   
    let sql = 'SELECT * FROM wedding_music.wedding WHERE 1=1'; 

    const params = [];

    if (req.query.date) {
        sql += ' AND date = ?';
        params.push(req.query.date);
    }

    if (req.query.spouse_one_name) {
        sql += ' AND spouse_one_name LIKE ?';
        params.push(search);
    }

    if (req.query.spouse_two_name) {
        sql += ' AND spouse_two_name LIKE ?';
        params.push(search);
    }

    const conn = await getConnection();

    try {
        const [result] = await conn.query(sql, params);

        await conn.end();
        res.json(result);

    } catch (error) {

        await conn.end();
        res.status(500).json({ success: false, error:'Boda no encontrada' });
    }
});


app.post('/api/weddingmusic/wedding', async (req, res) => {
    
    if (!req.body.date || !req.body.spouse_one_name || !req.body.spouse_two_name || !req.body.localitation) {
        return res.status(400).json({ 
            success: false,
            error: 'Faltan datos obligatorios' 
        });
    }

    const conn = await getConnection();
    
    const [result] = await conn.execute(`
        INSERT INTO wedding_music.wedding
            (date, spouse_one_name, spouse_two_name, localitation)
        VALUES (?, ?, ?, ?)`,
        [req.body.date, req.body.spouse_one_name, req.body.spouse_two_name, req.body.localitation]);

    await conn.end();

    res.json({
        success: true,  
        wedding_id: result.insertId,
        message: 'Boda registrada correctamente',
        weddingObj: {
            ...req.body,
            wedding_id: result.insertId,
        }
    });
});

app.put('/api/weddingmusic/wedding', async (req, res) => {
    
    const wedding = req.body;

    if( !wedding.wedding_id || isNaN(parseInt(wedding.wedding_id)) ) {
    return res.status(400).json({
      success: false,
      error: 'El Id no es un número'
    });
  }

    const conn = await getConnection();

    const [result] = await conn.execute(
    `
    UPDATE wedding_music.wedding
      SET date = ?, spouse_one_name = ?, spouse_two_name = ?, localitation = ?
      WHERE wedding_id = ?`,
    [ wedding.date, wedding.spouse_one_name, wedding.spouse_two_name, wedding.localitation ] 
    
  );

  // Cierro la conexión

  await conn.end();

  // Respodo

  res.json({
    success: true,
    updatedWedding: {
      ...req.body
    }
});
});

app.delete('/api/weddingmusic/wedding', async (req, res) => {
    res.send({ message: 'Endpoint sin usar' });
});
