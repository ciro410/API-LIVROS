const express = require('express');

const app = express()
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "A Odisséia de Jonas",
        autor: "Thomas Crawling",
        ano: 2001,
        numPaginas: 197
    },
    {
        id: 2,
        titulo: "Jonas e a sociedade escondida",
        autor: "Claire Crawling",
        ano: 2004,
        numPaginas: 158
    }
];

let ultimoid = livros.length;
let mensagem = ""
let metodo = ""

function consultarId(id) {
    const idConsultado = livros.find(livro => livro.id === id);
    if (metodo === "get") {
        if (id > ultimoid) {
            mensagem = { "mensagem": "Não existe livro para o ID informado." }

        } else if (!idConsultado) {
            mensagem = { "mensagem": "O valor do parâmetro ID da URL não é um número válido." }
        } else {
            mensagem = idConsultado
        }

    } else if (metodo === "put" || metodo === "patch") {
        if (id > ultimoid) {
            mensagem = { "mensagem": "Não existe livro a ser substituído para o ID informado." }
        } else if (!idConsultado) {
            mensagem = { "mensagem": "O valor do parâmetro ID da URL não é um número válido." }
        } else {
            mensagem = { "mensagem": "Livro alterado." }
        }
    }else if (metodo === "delete"){
        if (id > ultimoid) {
            mensagem = { "mensagem": "Não existe livro a ser removido no ID informado." }
        }else if (!idConsultado) {
            mensagem = { "mensagem": "O valor do parâmetro ID da URL não é um número válido." }
        }else{
            mensagem = {"mensagem": "Livro removido."}
        }
        
    }


    return idConsultado

}


app.get("/livros", (req, res) => {
    res.json(livros)

})

app.get("/livros/:id", (req, res) => {
    metodo = "get"
    let id = Number(req.params.id)
    consultarId(id)
    res.json(mensagem)

})

app.post("/livros", (req, res) => {
    ultimoid++;

    const novolivro = {
        id: ultimoid,
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano,
        numPaginas: req.body.numPaginas
    }

    livros.push(novolivro)
    res.json(novolivro)


})

app.put("/livros/:id", (req, res) => {
    metodo = "put"
    let id = Number(req.params.id)
    const idConsultado = consultarId(id)
    if (!idConsultado) {
        res.json(mensagem)
    } else {
        idConsultado.titulo = req.body.titulo
        idConsultado.autor = req.body.autor
        idConsultado.ano = req.body.ano
        idConsultado.numPaginas = req.body.numPaginas
        res.json(mensagem)

    }

})

app.patch("/livros/:id", (req, res) => {
    metodo = "put"
    let id = Number(req.params.id)
    const idConsultado = consultarId(id)
    if (!idConsultado) {
        res.json(mensagem)
    } else {
        if(req.body.titulo!== undefined){
            idConsultado.titulo = req.body.titulo
        }
        if(req.body.autor!== undefined){
            idConsultado.autor = req.body.autor
        }
        if(req.body.ano!== undefined){
            idConsultado.ano = req.body.ano
        }
        if(req.body.numPaginas!== undefined){
            idConsultado.numPaginas = req.body.numPaginas
        }
    
        res.json(mensagem)

    }

})

app.delete("/livros/:id",(req,res)=>{
    metodo = "delete";
    let id = Number(req.params.id)
    const idConsultado = consultarId(id)
    const indice = livros.indexOf(idConsultado)
    livros.splice(idConsultado,1)
    res.json(mensagem)

})





app.listen(8000)


