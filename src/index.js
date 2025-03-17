require('dotenv').config();
const express = require('express');
const cors  = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());


console.log('Puerto:', process.env.PORT);

const port = process.env.PORT || 4000;
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
        res.status(500).json({ 
            success: false, 
            error:'Error al buscar boda' });
    }
});


app.post('/api/weddingmusic/wedding', async (req, res) => {
    try {
        const { date, spouse_one_name, spouse_two_name, localitation } = req.body;

        if (!date || !spouse_one_name || !spouse_two_name || !localitation) {
            return res.status(400).json({ 
                success: false, 
                error: "Faltan datos obligatorios" });
        }

        const conn = await getConnection();
        const [result] = await conn.execute(
            `INSERT INTO wedding_music.wedding (date, spouse_one_name, spouse_two_name, localitation) 
            VALUES (?, ?, ?, ?)`, 
            [date, spouse_one_name, spouse_two_name, localitation]
        );

        await conn.end();

        res.json({
            success: true,
            message: "Boda registrada correctamente",
            wedding: { id: result.insertId, date, spouse_one_name, spouse_two_name, localitation }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: "Error al registrar la boda" });
    }
});


app.put('/api/weddingmusic/wedding/:id', async (req, res) => {
    
    try {
        const { wedding_id, date, spouse_one_name, spouse_two_name, localitation } = req.body;

        if (!wedding_id || isNaN(parseInt(wedding_id))) {
            return res.status(400).json({ success: false, error: "ID de boda inválido" });
        }

        const conn = await getConnection();

        const [result] = await conn.execute(
            `UPDATE wedding_music.wedding 
            SET date = ?, spouse_one_name = ?, spouse_two_name = ?, localitation = ?
            WHERE wedding_id = ?`,
            [date, spouse_one_name, spouse_two_name, localitation, wedding_id]
        );

        await conn.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Boda no encontrada" });
        }

        res.json({ 
            success: true, 
            message: "Boda actualizada correctamente", 
            updatedWedding: req.body });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: "Error al actualizar la boda" });
    }
});

app.delete('/api/weddingmusic/wedding/:id', async (req, res) => {
    try {
        const { wedding_id } = req.body;

        if (!wedding_id || isNaN(parseInt(wedding_id))) {
            return res.status(400).json({ success: false, error: "ID de boda inválido" });
        }

        const conn = await getConnection();
        const [result] = await conn.execute(
            `DELETE FROM wedding_music.wedding WHERE wedding_id = ?`,
            [wedding_id]
        );

        await conn.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Boda no encontrada" });
        }

        res.json({ success: true, message: "Boda eliminada correctamente" });

    } catch (error) {
        res.status(500).json({ success: false, error: "Error al eliminar la boda" });
    }
});



app.get('/api/weddingmusic/wedding/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const conn = await getConnection();

        const [result] = await conn.execute(
            `SELECT * FROM wedding_music.wedding WHERE wedding_id = ?`, 
            [id]
        );

        await conn.end();

        if (result.length === 0) {
            return res.status(404).json({ success: false, error: "Boda no encontrada" });
        }

        res.json({ 
            success: true, 
            wedding: result[0] });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: "Error al obtener la boda" });
    }
});
