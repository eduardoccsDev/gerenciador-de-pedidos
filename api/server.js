const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8800;
const cors = require('cors');


app.use(cors());

app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

// Configurar a conexão com o banco de dados SQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gerenciamentodepedidos'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

// Definir as rotas para lidar com as solicitações do cliente

// Rota para obter dados do banco de dados
app.get('/carnes', (req, res) => {
  connection.query('SELECT * FROM carnes', (err, rows) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
    } else {
      res.json(rows);
    }
  });
});
//pega o ponto da carne
app.get('/pontocarne', (req, res) => {
  connection.query('SELECT * FROM pontocarne', (err, rows) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
    } else {
      res.json(rows);
    }
  });
});
//pega os paes
app.get('/paes', (req, res) => {
  connection.query('SELECT * FROM paes', (err, rows) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
    } else {
      res.json(rows);
    }
  });
});
//pega os opcionais
app.get('/opcionais', (req, res) => {
  connection.query('SELECT * FROM opcionais', (err, rows) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
    } else {
      res.json(rows);
    }
  });
});
// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
