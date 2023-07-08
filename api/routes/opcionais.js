const express = require('express');
const router = express.Router();
module.exports = connection => {
  //Rota para obter dados do banco de dados
  router.get('/', (req, res) => {
    connection.query('SELECT * FROM opcionais ORDER BY nomeOpcional ASC', (err, rows) => {
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
    const newItem = req.body; // Obtém os dados enviados no corpo da requisição

    // Inserção dos dados no banco de dados
    connection.query('INSERT INTO opcionais SET ?', newItem, (err, result) => {
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
    const carneId = req.params.id;

    const query = 'DELETE FROM opcionais WHERE idopcional = ?';

    connection.query(query, [carneId], (error, results) => {
      if (error) {
        console.error('Erro ao excluir o pedido:', error);
        return res.status(500).send('Erro ao excluir o molho');
      }

      if (results.affectedRows === 0) {
        return res.status(404).send('Pedido não encontrado');
      }

      res.status(200).send('Pedido excluído com sucesso');
    });
  });
  return router;
};