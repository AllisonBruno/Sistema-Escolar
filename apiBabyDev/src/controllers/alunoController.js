const alunoService = require('../services/alunoService');

module.exports = {
    readyAlunos : async(req, res)=>{
        let json = {error :'', result:[]};

        let alunos = await alunoService.searchAlunos();

        for(let i in alunos){
            json.result.push({
                idAluno: alunos[i].idAluno,
                nome: alunos[i].nome,
                sobrenome: alunos[i].sobrenome,
                telefone: alunos[i].telefone,
                email: alunos[i].email,
                fk_curso: alunos[i].fk_curso,
            });
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.json(json);
    },

    readyAlunosByCurso : async (req, res)=>{
        let json = {error :'', result:[]};

        let codigo = req.params.codigo;
        let alunos = await alunoService.getAlunosByCurso(codigo);

        for(let i in alunos){
            json.result.push({
                idAluno: alunos[i].idAluno,
                nome: alunos[i].nome,
                sobrenome: alunos[i].sobrenome,
                telefone: alunos[i].telefone,
                email: alunos[i].email,
                fk_curso: alunos[i].fk_curso,
            });
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.json(json);
    },

    createAluno: async (req, res) => {
        let json = {error :'', result:{}};

        let nome = req.body.nome;
        let sobrenome = req.body.sobrenome;
        let telefone = req.body.telefone;
        let email = req.body.email;
        let idCurso = req.body.idCurso;

        codigo = req.params.codigo;

        let vagas = await alunoService.returnVagas(idCurso);

        json.result = {
            vagas
        };

        let qtdVagas = json.result.vagas[0].quantidade;
        if(qtdVagas == 0){
            json.error = 'Curso não possui vagas';
        }else{
        
        if(nome && sobrenome && telefone && email && idCurso ){
            let aluno = await alunoService.createAluno( nome, sobrenome, telefone, email, idCurso);
            json.result = {
                codigo: aluno,
                nome,
                sobrenome,
                telefone,
                email,
                idCurso,
            }
            await alunoService.delVagas(idCurso);
        }else{
            json.error = 'incomplete Fields';
        }} 
        
        res.json(json);
    
    },


    updateAluno: async (req, res) => {
        let json = {error :'', result:{}};

        let codigo = req.params.codigo;
        let nome = req.body.nome;
        let sobrenome = req.body.sobrenome;
        let telefone = req.body.telefone
        let email = req.body.email;
        let idCurso = req.body.idCurso;

        if(codigo && nome && sobrenome && telefone && email){
            await alunoService.updateAluno( codigo, nome, sobrenome, telefone, email);
            json.result = {
              
                codigo,
                nome,
                sobrenome,
                telefone,
                email
            };
        }else{
            json.error = 'Incomplete Fields'
        }
        res.json(json);
    },
    
    deleteAluno: async (req, res)=>{
        let json = {error: '', result:{}};
        
        codigo = req.params.codigo;

        let curso = await alunoService.getIdCurso(codigo);

        json.result = {
            curso
        };

        let id = json.result.curso[0].fk_curso;

        await alunoService.deleteAluno(codigo);
        await alunoService.addVaga(id);
        
        
        res.json(json);
       }
};
   