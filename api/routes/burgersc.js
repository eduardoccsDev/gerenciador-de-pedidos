const express = require('express');
const router = express.Router();
module.exports = connection => {
    //Rota para obter dados do banco de dados
    router.put('/:id', (req, res) => {
        const idBurger = req.params.id;
        const concluido = req.body.concluido;

        const query = 'UPDATE burgers SET concluido = ? WHERE idburger = ?';

        connection.query(query, [concluido, idBurger], (error, results) => {
            if (error) {
                console.error('Erro ao atualizar o status do burger:', error);
                return res.status(500).send('Erro ao atualizar o status do burger');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('Burger não encontrado');
            }

            res.status(200).send('Status do burger atualizado com sucesso');
        });
    });

    return router;
};