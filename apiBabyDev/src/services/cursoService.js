const database = require('../database');
module.exports = {
    searchCursos: () => {
    return new Promise((accepted,rejected) =>{
        database.query('SELECT idCurso, nome FROM curso', (error, results) => {
            if(error){rejected(error); return}
            accepted(results);
        });
    });
},
getCursoById: (codigo) => {
    return new Promise((accepted,rejected) =>{
        database.query(`SELECT * FROM curso WHERE idCurso = ${codigo}` , (error, results) => {
            if(error){rejected(error); return}
            accepted(results); 
        });
    });
}
/*decrementarVaga: (idCurso) => {
    return new Promise((accepted,rejected) =>{
        database.query(`UPDATE curso SET quantidade = quantidade - 1 WHERE idCurso = ${idCurso}`, (error, results) =>{
            if(error){rejected(error);
                 return
                };
            accepted(results);  
        }
     );
    });
}*/

}