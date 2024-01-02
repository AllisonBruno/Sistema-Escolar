const cursoService = require('../services/cursoService');

module.exports = {
    
    getAlunosCursos : async(req, res)=>{
        let json = {error :'', result:[]};

        let cursos = await cursoService.searchCursos();

        for(let i in cursos){
            json.result.push({
                idCurso: cursos[i].idCurso,
                nome: cursos[i].nome
                //quantidade: cursos[i].quantidade
            
            });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.json(json);
},
getCursoById : async (req, res)=>{
    let json = {error :'', result:[]};

    let codigo = req.params.codigo;
    let cursos = await cursoService.getCursoById(codigo);

    for(let i in cursos){
        json.result.push({
            idCurso: cursos[i].idCurso,
            nome: cursos[i].nome,
            quantidade: cursos[i].quantidade
        });
    }
    res.json(json);
},

};