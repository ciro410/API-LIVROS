const { livros } = require('../dados/dados')
let ultimoid = livros.length;
let mensagem = ""
let metodo = ""
let status = 200;

function consultarId(id) {
    const livroConsultado = livros.find(livro => livro.id === id);
    if (metodo === "GET") {
        if (!livroConsultado) {
            status = 404;
            return { erro: "Não existe livro para o ID informado." }

        } else {
            status = 200;
            return livroConsultado
        }
    }    
    
    return livroConsultado

}

function validarLivros(livros) {
    if (typeof livros.titulo !== "string") {
        return { erro: "Titulo Inválido" }
    }
    if (livros.titulo === "") {
        return { erro: "Preencha o campo título" }
    }
    if (typeof livros.autor !== "string") {
        return { erro: "Autor Inválido" }
    }
    if (livros.autor === "") {
        return { erro: "Preencha o campo autor" }
    }
    if (typeof livros.ano !== "number") {
        return { erro: "Ano Inválido" }
    }
    if (livros.ano === "") {
        return { erro: "Preencha o campo ano" }
    }
    if (typeof livros.numPaginas !== "number") {
        return { erro: "Numero de Paginas Inválido" }
    }
    if (livros.numPaginas === "") {
        return { erro: "Preencha o Número de Páginas" }
    }
}

function consultarLivros(req, res) {
    res.status(status)
    res.json(livros)

}

function consultarLivrosPeloId(req, res) {
    metodo = req.method
    let id = Number(req.params.id)
    const livroConsultado = consultarId(id)
    res.status(status)
    res.json(livroConsultado)

}

function adicionarLivros(req, res) {
    ultimoid++;

    const erro = validarLivros(req.body)
    if (erro) {
        res.status(400)
        res.json(erro)
    }
    const novolivro = {
        id: ultimoid,
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano,
        numPaginas: req.body.numPaginas
    }

    livros.push(novolivro)
    res.json(novolivro)


}

function substituirLivro(req, res) {
    let id = Number(req.params.id)
    const livroConsultado = consultarId(id)
    const erro = validarLivros(req.body)
    if (erro) {
        res.status(404)
        res.json(erro);
    } else {
        if (livroConsultado) {
            livroConsultado.titulo = req.body.titulo
            livroConsultado.autor = req.body.autor
            livroConsultado.ano = req.body.ano
            livroConsultado.numPaginas = req.body.numPaginas
            res.status(200)
            res.json({ mensagen: "Livro foi substituído com sucesso" })

        } else {

            const novolivro = {
                id: Number(req.params.id),
                titulo: req.body.titulo,
                autor: req.body.autor,
                ano: req.body.ano,
                numPaginas: req.body.numPaginas
            }

            livros.push(novolivro)
            res.status(200)
            res.json({ mensagen: `Livro com o id informado não consta no sistema, porem foi adicionado com sucesso` })
        }
    }

}

function atualizarLivro(req, res) {
    let id = Number(req.params.id)
    const livroConsultado = consultarId(id)

    if (!livroConsultado) {
        res.status(400)
        res.json({erro: "Não existe livro com esse id para ser atualizado"})
    } else {
        const erro = validarLivros({
            titulo: req.body.titulo ?? livroConsultado.titulo,
            autor: req.body.autor ?? livroConsultado.autor,
            ano: req.body.ano ?? livroConsultado.ano,
            numPaginas: req.body.numPaginas ?? livroConsultado.numPaginas
        })
        if (erro) {
            res.status(404)
            res.json(erro);
        } else {
            if (req.body.titulo !== undefined) {
                livroConsultado.titulo = req.body.titulo
            }
            if (req.body.autor !== undefined) {
                livroConsultado.autor = req.body.autor
            }
            if (req.body.ano !== undefined) {
                livroConsultado.ano = req.body.ano
            }
            if (req.body.numPaginas !== undefined) {
                livroConsultado.numPaginas = req.body.numPaginas
            }
            res.status(200)
            res.json({mensagem: "Livro atualizado com sucesso"})
    
        }
           
        }

        
}

function deletarLivro(req, res) {
    let id = Number(req.params.id)
    const livroConsultado = consultarId(id)
    if(livroConsultado){
        const indice = livros.indexOf(livroConsultado)
        livros.splice(livroConsultado,1)
        res.status(200)
        res.json({mensagem:"Livro excluído com sucesso"})
    }else{
        res.status(400)
        res.json({erro:"Impossível excluir um livro que não existe"})
    }

}

module.exports = {
    consultarId,
    consultarLivros,
    consultarLivrosPeloId,
    adicionarLivros,
    substituirLivro,
    atualizarLivro,
    deletarLivro
}