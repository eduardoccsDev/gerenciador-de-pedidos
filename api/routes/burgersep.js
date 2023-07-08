const express = require('express');
const router = express.Router();
module.exports = connection => {
    //Rota para obter dados do banco de dados
    router.get('/', (req, res) => {
        connection.query('SELECT idburger,horaPedido,concluido,nomeCliente,telefoneCliente, carne, pontoCarne, pao, opcionais,molhos,acompanhamento,bebidas,tipoBebida,qtdBebida,corStatus,status  FROM burgers INNER JOIN status ON status = status.nomeStatus INNER JOIN bebidas ON bebidas = bebidas.nomeBebida WHERE status = "Em Produção";', (err, rows) => {
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