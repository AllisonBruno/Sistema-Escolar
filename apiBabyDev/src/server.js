require('dotenv').config({path:'variaveis.env'});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
server.use(bodyParser.urlencoded({extended: false})); 
server.use(bodyParser.json());
const routes = require('./routes');



const alunoController = require('./controllers/alunoController');
const cursoController = require('./controllers/cursoController');

server.use('/apibabydev', routes);
server.use(cors());

server.listen(process.env.PORT, ()=>{
    console.log(`Listening on port http://localhost:${process.env.PORT}`); 
});