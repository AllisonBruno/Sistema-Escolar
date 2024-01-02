const database = require('../database');
const cursoService = require('./cursoService');

module.exports = {
    searchAlunos: () => {
        return new Promise((accepted, rejected) => {
            database.query('SELECT * FROM aluno', (error, results) => {
                if (error) { rejected(error); return }
                accepted(results);
            });
        });
    },
    getAlunosByCurso: (codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(`SELECT * FROM aluno WHERE fk_curso = ${codigo}`, (error, results) => {
                if (error) { rejected(error); return }
                accepted(results);
            });
        });
    },
    createAluno: (nome, sobrenome, telefone, email, idCurso) => {
        return new Promise((accepeted, rejected) => {
            database.query(`INSERT INTO aluno(nome, sobrenome, telefone, email, fk_curso) VALUES('${nome}','${sobrenome}','${telefone}','${email}',${idCurso})`,
                (error, results) => {
                    if (error) {
                        rejected(error);
                        return;
                    }
                    accepeted(results);

                });

        });
    },
    updateAluno: (codigo, nome, sobrenome, telefone, email) => {
        return new Promise((accepeted, rejected) => {
            database.query(
                `UPDATE aluno SET nome= '${nome}',sobrenome= '${sobrenome}', telefone= '${telefone}',
                 email= '${email}' WHERE idAluno = ${codigo}`, (error, result) => {
                if (error) {
                    rejected(error);
                    return;
                }
                accepeted(result);
            }
            )

        });
    },

    deleteAluno: (codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `DELETE FROM aluno WHERE idAluno = ${codigo}`, (error, result) => {
                    if (error) {
                        rejected(error);
                        return;
                    }
                    accepted(result);

                });

        });

    },
    getIdCurso: (codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `SELECT fk_curso FROM aluno WHERE idAluno = ${codigo}`, (error, result) => {
                    if (error) {
                        rejected(error);
                        return;
                    }
                    accepted(result);

                }
            );
        });

    },
    delVagas: (codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(`UPDATE curso SET quantidade = quantidade - 1 WHERE idCurso = ${codigo}`, (error, results) => {
                if (error) { rejected(error); return };
                accepted(results);
            });
        });


    },
    addVaga: (codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(`UPDATE curso SET quantidade = quantidade + 1 WHERE idCurso = ${codigo}`, (error, results) => {
                if (error) { rejected(error); return };
                accepted(results);
            });
        });
    },
    returnVagas: (codigo) => {
        return new Promise((accepted, rejected) => {
            database.query(`SELECT quantidade FROM  curso WHERE idCurso = ${codigo}`,
                (error, results) => {
                    if (error) {
                        rejected(error);
                        return;
                    }
                    accepted(results);
                }
            )
        });


    }


};