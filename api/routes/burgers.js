const express = require('express');
const router = express.Router();
module.exports = connection => {
    //Rota para obter dados do banco de dados
    router.get('/', (req, res) => {
        connection.query('SELECT idburger,nomeCliente,telefoneCliente, carne, pontoCarne, pao, opcionais,molhos,acompanhamento,bebidas,tipoBebida,qtdBebida,corStatus,status  FROM burgers INNER JOIN status ON status = status.nomeStatus INNER JOIN bebidas ON bebidas = bebidas.nomeBebida;', (err, rows) => {
            if (err) {
                console.error('Erro ao executar a consulta:', err);
                res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
            } else {
                res.json(rows);
            }
        });
    });
    //Rota para enviar carne
    router.post('/', (req, res) => {
        const dados = req.body; // Obtém os dados enviados no corpo da requisição

        // Inserção dos dados no banco de dados
        connection.query('INSERT INTO burgers SET ?', dados, (err, result) => {
            if (err) {
                console.error('Erro ao inserir os dados:', err);
                res.status(500).json({ error: 'Erro ao inserir os dados no banco de dados' });
            } else {
                // Dados inseridos com sucesso
                res.json({ message: 'Dados inseridos com sucesso' });
            }
        });
    });
    //Rota para exlcuir carne
    router.delete('/:id', (req, res) => {
        const burgerId = req.params.id;

        const query = 'DELETE FROM burgers WHERE idburger = ?';

        connection.query(query, [burgerId], (error, results) => {
            if (error) {
                console.error('Erro ao excluir o pedido:', error);
                return res.status(500).send('Erro ao excluir o pedido');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('Pedido não encontrado');
            }

            res.status(200).send('Pedido excluído com sucesso');
        });
    });
    //atualiza status
    router.put('/:id', (req, res) => {
        const idBurger = req.params.id;
        const novoStatus = req.body.status;
        const concluido = req.body.concluido;

        const query = 'UPDATE burgers SET status = ?, concluido = ? WHERE idburger = ?';

        connection.query(query, [novoStatus, concluido, idBurger], (error, results) => {
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