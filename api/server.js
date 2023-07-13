const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8800;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
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


// Importar as rotas modularizadas
const carnesRoutes = require('./routes/carnes')(connection);
const paesRoutes = require('./routes/paes')(connection);
const opcionaisRoutes = require('./routes/opcionais')(connection);
const molhosRoutes = require('./routes/molhos')(connection);
const burgersRoutes = require('./routes/burgers')(connection);
const pontocarneRoutes = require('./routes/pontocarne')(connection);
const acompanhamentosRoutes = require('./routes/acompanhamentos')(connection);
const bebidasRoutes = require('./routes/bebidas')(connection);
const statusRoutes = require('./routes/status')(connection);
const burgerssRoutes = require('./routes/burgerss')(connection);
const burgersepRoutes = require('./routes/burgersep')(connection);
const burgerscRoutes = require('./routes/burgersc')(connection);
const combosRoutes = require('./routes/combos')(connection);

// Usar as rotas modularizadas
app.use('/carnes', carnesRoutes);
app.use('/paes', paesRoutes);
app.use('/opcionais', opcionaisRoutes);
app.use('/molhos', molhosRoutes);
app.use('/burgers', burgersRoutes);
app.use('/pontocarne', pontocarneRoutes);
app.use('/acompanhamentos', acompanhamentosRoutes);
app.use('/bebidas', bebidasRoutes);
app.use('/status', statusRoutes);
app.use('/burgerss', burgerssRoutes);
app.use('/burgersep', burgersepRoutes);
app.use('/burgersc', burgerscRoutes);
app.use('/combos', combosRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
