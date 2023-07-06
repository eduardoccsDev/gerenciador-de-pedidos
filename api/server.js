const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 8800;
const cors = require('cors');


app.use(cors());

app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
//pepa os molhos
app.get('/molhos', (req, res) => {
  connection.query('SELECT * FROM molhos', (err, rows) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
    } else {
      res.json(rows);
    }
  });
});
//pega os acompanhamentos
app.get('/acompanhamentos', (req, res) => {
  connection.query('SELECT * FROM acompanhamentos', (err, rows) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
    } else {
      res.json(rows);
    }
  });
});
//pega as bebidas
app.get('/bebidas', (req, res) => {
  connection.query('SELECT * FROM bebidas ORDER BY tipoBebida DESC', (err, rows) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
    } else {
      res.json(rows);
    }
  });
});
//envia o pedido
app.post('/burgers', (req, res) => {
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
//pega os pedidos
app.get('/burgers', (req, res) => {
  connection.query('SELECT idburger,nomeCliente,telefoneCliente, carne, pontoCarne, pao, opcionais,molhos,acompanhamento,bebidas,tipoBebida,qtdBebida,corStatus,status  FROM burgers INNER JOIN status ON status = status.nomeStatus INNER JOIN bebidas ON bebidas = bebidas.nomeBebida;', (err, rows) => {
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
