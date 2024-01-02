const url = "http://localhost:3000/apibabydev"

function getAlunos(){
    axios.get(`${url}/alunos`)
    .then(
        response => {
            const data = response.data.result 

            let html = ''
             
            for(let i = 0; i < data.length; i++){
                html += `<tr>
                <th scope="row">${data[i].idAluno}</th>
                <td>${data[i].nome}</td>
                <td>${data[i].sobrenome}</td>
                <td>${data[i].telefone}</td>
                <td>@${data[i].email}</td>
                <td><button type="button" class="btn btn-success" onclick="redirect('${data[i].idAluno}', '${data[i].nome}', '${data[i].sobrenome}','${data[i].telefone}','${data[i].email}')">Editar</button></td>
                <td><button type="button" class="btn btn-danger" onclick="deleteAluno(${data[i].idAluno})">Excluir</button></td>
              </tr>`
            }

            document.getElementById("table-body").innerHTML = html

            console.log(data)
        })
        .catch(error => console.log(error))
    
}

function deleteAluno(codigo){
    axios.delete(`${url}/aluno/${codigo}`)
    .then(
        alert("Aluno excluido com sucesso"),
        getAlunos()
    )
    .catch(error => console.log(error))
}

function getCursos(){
    axios.get(`${url}/cursos`)
    .then(response =>{
        const cursos  = response.data.result 

        let html = '<option disabled selected> Selecione uma opção </option>'

        for(let i = 0; i < cursos.length; i++){
            html += `<option value = "${cursos[i].idCurso}">${cursos[i].nome}</option>
            `
        }
        
        document.getElementById("curso-select").innerHTML = html
        console.log(cursos);
    }
    )
    .catch(error => console.log(error));
}

function getCursosBySelected(){
    let select = document.getElementById("curso-select");
    let option = select.options[select.selectedIndex].value;

    axios.get(`${url}/alunos/${option}`)
    .then(response => {
        const data = response.data.result 

        let html = ''
         
        for(let i = 0; i < data.length; i++){
            html += `<tr>  
            <th scope="row">${data[i].idAluno}</th>
            <td>${data[i].nome}</td>
            <td>${data[i].sobrenome}</td>
            <td>${data[i].telefone}</td>
            <td>@${data[i].email}</td>
            <td><button type="button" class="btn btn-success" onclick="redirect('${data[i].idAluno}', '${data[i].nome}', '${data[i].sobrenome}','${data[i].telefone}','${data[i].email}')">Editar</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteAluno(${data[i].idAluno})">Excluir</button></td>
          </tr>`
        }

        document.getElementById("table-body").innerHTML = html
    })
         
    
    .catch(error => console.log(error));
}

function createAluno(){
    
    let nome = document.getElementById("nome").value;
    let sobrenome = document.getElementById("sobrenome").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;

    let select = document.getElementById("curso-select");
    let opcao = select.options[select.selectedIndex].value;

    const data = {
        "nome": nome,
        "sobrenome": sobrenome,
        "telefone": telefone,
        "email": email,
        "idCurso": opcao
    }
    axios.post(`${url}/aluno`, data)
    .then(response => {
        console.log(response.data.result)
    })
    .catch(error => console.log(error))
    alert("teste")
}

function redirect(codigo, nome, sobrenome, telefone, email){
    window.location.href = `http://localhost/babydev/atualizar.html?codigo=${codigo}&nome=${nome}&sobrenome=${sobrenome}&telefone=${telefone}&email=${email}`
}

function loadFields() {
    const urlParams = new URLSearchParams(window.location.search);
    
    document.getElementById("id").value = urlParams.get("codigo"); //CAPTURAR O VALOR QUE ESTÁ ARMAZENADO NO PARAMETRO 'CÓDIGO' DA URL
    document.getElementById("nome").value = urlParams.get("nome"); //CAPTURAR O VALOR QUE ESTÁ ARMAZENADO NO PARAMETRO 'NOME' DA URL
    document.getElementById("sobrenome").value = urlParams.get("sobrenome"); //CAPTURAR O VALOR QUE ESTÁ ARMAZENADO NO PARAMETRO 'SOBRENOME' DA URL   
    document.getElementById("email").value = urlParams.get("email"); //CAPTURAR O VALOR QUE ESTÁ ARMAZENADO NO PARAMETRO 'EMAIL' DA URL      
    document.getElementById("telefone").value = urlParams.get("telefone"); //CAPTURAR O VALOR QUE ESTÁ ARMAZENADO NO PARAMETRO 'TELEFONE' DA URL 
}

function updateAluno(){
    let codigo = document.getElementById("id").value;
    let nome = document.getElementById("nome").value;
    let sobrenome = document.getElementById("sobrenome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;

    const data ={
        "nome" : nome,
        "sobrenome" : sobrenome,
        "telefone" : telefone,
        "email": email
    }
    axios.put(`${url}/aluno/${codigo}`, data)
}