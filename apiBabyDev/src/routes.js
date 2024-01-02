const express = require('express');
const Router = express.Router();

const alunoController = require('./controllers/alunoController');
const cors = require('cors');

Router.options('*', cors());
const cursoController = require('./controllers/cursoController');



Router.get('/alunos', alunoController.readyAlunos);
Router.get('/alunos/:codigo', alunoController.readyAlunosByCurso);
Router.get('/cursos', cursoController.getAlunosCursos);
Router.get('/cursos/:codigo',cursoController.getCursoById);
Router.post('/aluno', alunoController.createAluno);
Router.put('/aluno/:codigo',alunoController.updateAluno);
Router.delete('/aluno/:codigo',alunoController.deleteAluno);



module.exports = Router; 