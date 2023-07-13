const express = require('express');
const router = express.Router();
module.exports = connection => {
    //Rota para obter dados do banco de dados
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM combos ORDER BY nomeCombo ASC', (err, rows) => {
            if (err) {
                console.error('Erro ao executar a consulta (carnes):', err);
                res.status(500).json({ error: 'Erro ao obter os dados do banco de dados (carnes)' });
            } else {
                res.json(rows);
            }
        });
    });
    //Rota para enviar carne
    router.post('/', (req, res) => {
        const newItem = req.body; // Obtém os dados enviados no corpo da requisição

        // Inserção dos dados no banco de dados
        connection.query('INSERT INTO combos SET ?', newItem, (err, result) => {
            if (err) {
                console.error('Erro ao inserir os dados da carne:', err);
                res.status(500).json({ error: 'Erro ao inserir os dados da carne no banco de dados' });
            } else {
                // Dados inseridos com sucesso
                res.json({ message: 'Dados da carne inseridos com sucesso' });
            }
        });
    });
    //Rota para exlcuir carne
    router.delete('/:id', (req, res) => {
        const carneId = req.params.id;

        const query = 'DELETE FROM combos WHERE idcombo = ?';

        connection.query(query, [carneId], (error, results) => {
            if (error) {
                console.error('Erro ao excluir a carne:', error);
                return res.status(500).send('Erro ao excluir a carne');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('Carne não encontrada');
            }

            res.status(200).send('Carne excluída com sucesso');
        });
    });
    return router;
};