//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose(); //retorna o objeto, e busca a função verbose

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db; //exporta o db

//utilizar o objeto de banco de dados, para nossas operações
// db.serialize(() => {
//     //com comandos sql eu vou:

//     //1 criar uma tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `);


//     //2 inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `

    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
    //     "Papersider",
    //     "Guilherme Gembala, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis e Papelão"
    // ]

    // function afterInsertData(err){
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("Cadastrado com sucesso");
    //     console.log(this); //referencia a resposta do run
    // }

    //o afterInsertData é passada por referência, retorna depois de executar tudo
     //db.run(query, values, afterInsertData); //usa callback no insert (quando voltar a resposta, executa o callback, não para aplicação para isso)


    
//     //3 consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("Aqui estão os seus registros: ");
    //     console.log(rows);
    // });


//     //4 Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("Registro deletado com sucesso!");
    // });
    
// });

