function travadeSenha (req,res,next){
    if(req.method !== "GET"){
        if(req.query.senha === '123456'){
            next()
        }else{
            res.status(400)
            res.json({erro: "Senha incorreta, tente novamente"})
        }

    }else{
        next()
    }
}

module.exports={
    travadeSenha
}