const express = require('express');
const { travadeSenha } = require('./middleware/travadesenha');
const { roteador } = require('./rotas/rotas');
const app = express()

app.use(express.json());
app.use(travadeSenha)
app.use(roteador)
app.listen(8000)


