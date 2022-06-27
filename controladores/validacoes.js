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