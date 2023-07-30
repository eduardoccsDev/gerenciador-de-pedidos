const express = require('express');
const router = express.Router();
module.exports = connection => {
    //Rota para obter dados do banco de dados
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM burgers WHERE status = "Solicitado";', (err, rows) => {
            if (err) {
                console.error('Erro ao executar a consulta:', err);
                res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
            } else {
                res.json(rows);
            }
        });
    });

    return router;
};