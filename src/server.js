const express = require("express"); //chama o método do express
const server = express(); //executa a função que variavel recebeu antes

//pegar o banco de dados
const db = require("./database/db");

//configurar pasta publica
server.use(express.static("public"));


//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

//configurar caminhos da minha aplicação

//utlizando template engine
const nunjucks = require ("nunjucks");
nunjucks.configure("src/views",  {
    express: server,
    noCache: true  
});



//página inicial (configurar rotas)
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
    // return res.render("index.html", { title: "Um título" });
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa url, pega os dados enviado no form da pagina
    //console.log(req.query);

    // return res.render("create-point.html", { saved: true });
       return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do formulário
    //console.log(req.body);

    //inserir dados no banco de dados
    //     //2 inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items        
    ]

    function afterInsertData(err){
        if(err) {
            console.log(err);
            return res.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso");
        console.log(this); //referencia a resposta do run

        return res.render("create-point.html", { saved: true });
    }

    //o afterInsertData é passada por referência, retorna depois de executar tudo
     db.run(query, values, afterInsertData); //usa callback no insert (quando voltar a resposta, executa o callback, não para aplicação para isso)
});

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 });
    }

    
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${ search }%'`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        const total = rows.length;

        // console.log("Aqui estão os seus registros: ");
        // console.log(rows);

        //mostrar a página html com os dados do banco de dados
        //places é nome que vai ser passado no html
        return res.render("search-results.html", { places: rows, total: total });
    });

});




//ligar o servidor e passar a porta
server.listen(3000);

