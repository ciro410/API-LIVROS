const express = require('express')

const roteador = express();

const {
    consultarLivrosPeloId, 
    consultarLivros,
    adicionarLivros,
    substituirLivro,
    atualizarLivro,
    deletarLivro,
} = require('../controladores/controladores')

roteador.get("/livros",consultarLivros)

roteador.get("/livros/:id",consultarLivrosPeloId)

roteador.post("/livros",adicionarLivros)

roteador.put("/livros/:id",substituirLivro )

roteador.patch("/livros/:id",atualizarLivro)

roteador.delete("/livros/:id", deletarLivro)


module.exports = {roteador}
